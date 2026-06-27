import { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithProvider,
  signOut,
  onAuthStateChanged,
} from '../firebase';
import { setPersistence, browserLocalPersistence, browserSessionPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import employeesData from '../data/employees.json';
import customersData from '../data/customers.json';

const AuthContext = createContext(null);

// Map firebase user → app user format
const mapFirebaseUser = (firebaseUser, extraData = {}) => ({
  id: firebaseUser.uid,
  name: firebaseUser.displayName || extraData.name || 'Khách hàng',
  email: firebaseUser.email,
  avatar: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`,
  role: 'customer',
  phone: firebaseUser.phoneNumber || extraData.phone || '',
  tier: extraData.tier || 'Member',
  provider: firebaseUser.providerData?.[0]?.providerId || 'email',
});

// Get or create customer record in localStorage
const syncCustomerToLocal = (firebaseUser, extraData = {}) => {
  let lsCustomers = [];
  try { lsCustomers = JSON.parse(localStorage.getItem('hotel_customers') || '[]'); } catch (e) {}

  const existing = lsCustomers.find(c => c.id === firebaseUser.uid || c.email === firebaseUser.email);
  if (existing) {
    // Update avatar/name if changed
    existing.avatar = firebaseUser.photoURL || existing.avatar;
    existing.name = firebaseUser.displayName || existing.name;
    localStorage.setItem('hotel_customers', JSON.stringify(lsCustomers));
    return existing;
  }

  // Create new record
  const newCustomer = {
    id: firebaseUser.uid,
    name: firebaseUser.displayName || extraData.name || 'Khách hàng',
    email: firebaseUser.email,
    phone: firebaseUser.phoneNumber || extraData.phone || '',
    password: null,
    role: 'customer',
    avatar: firebaseUser.photoURL || `https://i.pravatar.cc/150?u=${firebaseUser.uid}`,
    provider: firebaseUser.providerData?.[0]?.providerId || 'email',
    dob: '',
    gender: 'Khác',
    nationality: 'Việt Nam',
    idCard: '',
    address: '',
    tier: 'Member',
    totalStays: 0,
    totalSpent: 0,
    joinDate: new Date().toISOString().split('T')[0],
    isVIP: false,
    notes: '',
  };
  lsCustomers.push(newCustomer);
  localStorage.setItem('hotel_customers', JSON.stringify(lsCustomers));
  return newCustomer;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state — handles remember me automatically
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const localData = syncCustomerToLocal(firebaseUser);
        setUser(mapFirebaseUser(firebaseUser, localData));
      } else {
        // Also check for staff login (not Firebase)
        try {
          const staffUser = sessionStorage.getItem('hotel_staff_user');
          if (staffUser) setUser(JSON.parse(staffUser));
          else setUser(null);
        } catch { setUser(null); }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ── SOCIAL LOGIN (Google / Facebook) ──────────────────────────────
  const loginSocial = async (providerKey, rememberMe = true) => {
    const providerMap = {
      google: googleProvider,
      facebook: facebookProvider,
    };
    const provider = providerMap[providerKey];
    if (!provider) return { success: false, error: 'Provider không hợp lệ' };

    try {
      const result = await signInWithProvider(provider, rememberMe);
      const localData = syncCustomerToLocal(result.user);
      const userData = mapFirebaseUser(result.user, localData);
      setUser(userData);
      return { success: true, user: userData, isNew: !localData.totalStays };
    } catch (err) {
      console.error('Social login error:', err);
      if (err.code === 'auth/popup-closed-by-user') return { success: false, error: 'Bạn đã đóng cửa sổ đăng nhập.' };
      if (err.code === 'auth/account-exists-with-different-credential') return { success: false, error: 'Email này đã được đăng ký bằng phương thức khác.' };
      return { success: false, error: 'Đăng nhập thất bại. Vui lòng thử lại.' };
    }
  };

  // ── EMAIL/PASSWORD LOGIN (customers) ─────────────────────────────────────
  const loginCustomer = async (email, password, rememberMe = false) => {
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const localData = syncCustomerToLocal(result.user);
      const userData = mapFirebaseUser(result.user, localData);
      setUser(userData);
      if (rememberMe) localStorage.setItem('hotel_remembered_email', email);
      else localStorage.removeItem('hotel_remembered_email');
      return { success: true, user: userData };
    } catch (err) {
      // Fallback: check local JSON data (existing customers in customers.json)
      let lsCustomers = [];
      try { lsCustomers = JSON.parse(localStorage.getItem('hotel_customers') || '[]'); } catch (e) {}
      const allCustomers = [...customersData, ...lsCustomers];
      const emailLower = email.trim().toLowerCase();
      const found = allCustomers.find(u => u.email.trim().toLowerCase() === emailLower && u.password === password);
      if (found) {
        const userData = {
          id: found.id, name: found.name, email: found.email,
          role: 'customer', avatar: found.avatar, phone: found.phone,
          tier: found.tier || 'Member', provider: 'email',
        };
        setUser(userData);
        if (rememberMe) {
          localStorage.setItem('hotel_current_user', JSON.stringify(userData));
          localStorage.setItem('hotel_remembered_email', email);
        } else {
          sessionStorage.setItem('hotel_session_user', JSON.stringify(userData));
        }
        return { success: true, user: userData };
      }
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') return { success: false, error: 'Email hoặc mật khẩu không đúng.' };
      if (err.code === 'auth/too-many-requests') return { success: false, error: 'Quá nhiều lần thử. Vui lòng thử lại sau.' };
      return { success: false, error: 'Đăng nhập thất bại. Vui lòng thử lại.' };
    }
  };

  // ── STAFF LOGIN (local only, not Firebase) ────────────────────────────────
  const loginStaff = (email, password) => {
    const emailToMatch = email.trim().toLowerCase();
    const found = employeesData.find(u => u.email.trim().toLowerCase() === emailToMatch && u.password === password);
    if (found) {
      const userData = {
        id: found.id, name: found.name, email: found.email,
        role: found.role, avatar: found.avatar, phone: found.phone,
        department: found.department || null, position: found.position || null,
        provider: 'staff',
      };
      setUser(userData);
      sessionStorage.setItem('hotel_staff_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: 'Email hoặc mật khẩu không đúng hoặc bạn không có quyền truy cập.' };
  };

  // ── REGISTER (email/password via Firebase) ────────────────────────────────
  const register = async (formData, rememberMe = false) => {
    // Check email not already used in local data
    let lsCustomers = [];
    try { lsCustomers = JSON.parse(localStorage.getItem('hotel_customers') || '[]'); } catch (e) {}
    const allExisting = [...employeesData, ...customersData, ...lsCustomers];
    const emailLower = formData.email.trim().toLowerCase();
    if (allExisting.some(u => u.email.trim().toLowerCase() === emailLower)) {
      return { success: false, error: 'Email đã được sử dụng.' };
    }

    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // Update display name
      await updateProfile(result.user, { displayName: formData.name });
      const localData = syncCustomerToLocal(result.user, { name: formData.name, phone: formData.phone });
      // Save extra fields
      const idx = lsCustomers.findIndex(c => c.id === result.user.uid);
      if (idx !== -1) {
        lsCustomers[idx].phone = formData.phone;
        lsCustomers[idx].idCard = formData.idCard || '';
        localStorage.setItem('hotel_customers', JSON.stringify(lsCustomers));
      }
      const userData = mapFirebaseUser(result.user, { ...localData, phone: formData.phone });
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') return { success: false, error: 'Email đã được sử dụng.' };
      if (err.code === 'auth/weak-password') return { success: false, error: 'Mật khẩu quá yếu (tối thiểu 6 ký tự).' };
      return { success: false, error: 'Đăng ký thất bại. Vui lòng thử lại.' };
    }
  };

  // ── LOGOUT ────────────────────────────────────────────────────────────────
  const logout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('hotel_staff_user');
    sessionStorage.removeItem('hotel_session_user');
    localStorage.removeItem('hotel_current_user');
    setUser(null);
  };

  const updateUserProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    if (localStorage.getItem('hotel_current_user')) localStorage.setItem('hotel_current_user', JSON.stringify(updatedUser));
    else if (sessionStorage.getItem('hotel_staff_user')) sessionStorage.setItem('hotel_staff_user', JSON.stringify(updatedUser));
  };

  const hasRole = (roles) => {
    if (!user) return false;
    return Array.isArray(roles) ? roles.includes(user.role) : user.role === roles;
  };

  return (
    <AuthContext.Provider value={{
      user, isAuthenticated: !!user, loading,
      loginCustomer, loginStaff, loginSocial,
      logout, register, updateProfile: updateUserProfile, hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
