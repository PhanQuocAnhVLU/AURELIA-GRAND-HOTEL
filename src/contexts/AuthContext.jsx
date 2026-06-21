import { createContext, useContext, useState, useEffect } from 'react';
import employeesData from '../data/employees.json';
import customersData from '../data/customers.json';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    try {
      const savedUser = localStorage.getItem('hotel_current_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      localStorage.removeItem('hotel_current_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    // Check employees (admin, manager, receptionist, staff)
    const allUsers = [...employeesData, ...customersData];

    // Also check localStorage for newly registered users
    let lsCustomers = [];
    try {
      lsCustomers = JSON.parse(localStorage.getItem('hotel_customers') || '[]');
    } catch (e) {}

    const allWithLS = [...allUsers, ...lsCustomers];
    const emailToMatch = email.trim().toLowerCase();
    const found = allWithLS.find(
      (u) => u.email.trim().toLowerCase() === emailToMatch && u.password === password
    );

    if (found) {
      const userData = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        avatar: found.avatar,
        phone: found.phone,
        tier: found.tier || null,
        department: found.department || null,
        position: found.position || null,
      };
      setUser(userData);
      localStorage.setItem('hotel_current_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    return { success: false, error: 'Email hoặc mật khẩu không đúng' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hotel_current_user');
  };

  const register = (formData) => {
    // Check if email already exists
    const existing = [...employeesData, ...customersData];
    let lsCustomers = [];
    try {
      lsCustomers = JSON.parse(localStorage.getItem('hotel_customers') || '[]');
    } catch (e) {}

    const allExisting = [...existing, ...lsCustomers];
    const emailToRegister = formData.email.trim().toLowerCase();
    if (allExisting.some((u) => u.email.trim().toLowerCase() === emailToRegister)) {
      return { success: false, error: 'Email đã được sử dụng' };
    }

    const newCustomer = {
      id: `C${Date.now()}`,
      name: formData.name,
      email: emailToRegister,
      phone: formData.phone,
      password: formData.password,
      role: 'customer',
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 50) + 1}`,
      dob: formData.dob || '',
      gender: formData.gender || 'Nam',
      nationality: 'Việt Nam',
      idCard: formData.idCard || '',
      address: formData.address || '',
      tier: 'Member',
      totalStays: 0,
      totalSpent: 0,
      joinDate: new Date().toISOString().split('T')[0],
      isVIP: false,
      notes: '',
    };

    lsCustomers.push(newCustomer);
    localStorage.setItem('hotel_customers', JSON.stringify(lsCustomers));

    const userData = {
      id: newCustomer.id,
      name: newCustomer.name,
      email: newCustomer.email,
      role: 'customer',
      avatar: newCustomer.avatar,
      phone: newCustomer.phone,
      tier: 'Member',
    };
    setUser(userData);
    localStorage.setItem('hotel_current_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('hotel_current_user', JSON.stringify(updatedUser));
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (Array.isArray(roles)) return roles.includes(user.role);
    return user.role === roles;
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, logout, register, updateProfile, hasRole }}
    >
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
