import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaBed, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const SOCIAL_BUTTONS = [
  {
    key: 'google',
    label: 'Google',
    icon: <FcGoogle size={20} />,
    bg: '#fff', color: '#3c4043', border: '#dadce0', hoverBg: '#f8f9fa',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: <FaFacebookF size={18} color="#fff" />,
    bg: '#1877f2', color: '#fff', border: '#1877f2', hoverBg: '#166fe5',
  },
];

const CustomerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const { loginCustomer, loginSocial } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const remembered = localStorage.getItem('hotel_remembered_email');
    if (remembered) { setEmail(remembered); setRememberMe(true); }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await loginCustomer(email, password, rememberMe);
      if (result.success) navigate('/dashboard');
      else setError(result.error);
    } catch {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerKey) => {
    setError('');
    setSocialLoading(providerKey);
    try {
      const result = await loginSocial(providerKey, true);
      if (result.success) navigate('/dashboard');
      else setError(result.error);
    } catch {
      setError('Đã xảy ra lỗi khi kết nối. Vui lòng thử lại.');
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div style={{
      maxWidth: 460, width: '100%',
      backgroundColor: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(16px)',
      borderRadius: 20,
      boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
      overflow: 'hidden',
    }}>
      <div style={{ height: 4, background: 'linear-gradient(90deg, #C5A059, #e8c87e, #C5A059)' }} />

      <div style={{ padding: '40px 44px 44px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <FaBed style={{ color: '#C5A059', marginBottom: 12 }} size={42} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '1.55rem', letterSpacing: '2px', margin: 0, color: '#1a1a2e' }}>
            AURELIA GRAND HOTEL
          </h2>
          <p style={{ color: '#888', fontSize: '0.72rem', letterSpacing: '3px', textTransform: 'uppercase', marginTop: 6, marginBottom: 0 }}>
            Boutique Saigon
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: '0.875rem', color: '#dc2626' }}>
            {error}
          </div>
        )}

        {/* Social Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {SOCIAL_BUTTONS.map((btn) => (
            <button
              key={btn.key}
              onClick={() => handleSocialLogin(btn.key)}
              disabled={!!socialLoading || loading}
              onMouseEnter={() => setHoveredSocial(btn.key)}
              onMouseLeave={() => setHoveredSocial(null)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '11px 16px',
                backgroundColor: hoveredSocial === btn.key ? btn.hoverBg : btn.bg,
                color: btn.color, border: `1.5px solid ${btn.border}`, borderRadius: 10,
                cursor: socialLoading || loading ? 'not-allowed' : 'pointer',
                fontWeight: 600, fontSize: '0.88rem',
                transition: 'all 0.18s ease',
                opacity: (socialLoading && socialLoading !== btn.key) || loading ? 0.5 : 1,
                boxShadow: hoveredSocial === btn.key ? '0 2px 8px rgba(0,0,0,0.12)' : 'none',
                width: '100%',
              }}
            >
              {socialLoading === btn.key
                ? <span style={{ display: 'inline-block', width: 18, height: 18, border: `2px solid ${btn.color}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                : btn.icon}
              {socialLoading === btn.key ? 'Đang kết nối...' : `Tiếp tục với ${btn.label}`}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: '#e8e8e8' }} />
          <span style={{ color: '#aaa', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>hoặc đăng nhập bằng email</span>
          <div style={{ flex: 1, height: 1, background: '#e8e8e8' }} />
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>Email</label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#C5A059', fontSize: 14 }} />
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com" required
                style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1.5px solid #e0e0e0', borderRadius: 10, fontSize: '0.9rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#C5A059'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#444', margin: 0 }}>Mật khẩu</label>
              <a href="#" style={{ fontSize: '0.75rem', color: '#C5A059', textDecoration: 'none' }}>Quên mật khẩu?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#C5A059', fontSize: 14 }} />
              <input
                type={showPassword ? 'text' : 'password'} value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu" required
                style={{ width: '100%', padding: '10px 40px 10px 38px', border: '1.5px solid #e0e0e0', borderRadius: 10, fontSize: '0.9rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#C5A059'}
                onBlur={e => e.target.style.borderColor = '#e0e0e0'}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}>
                {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
              style={{ width: 15, height: 15, accentColor: '#C5A059', cursor: 'pointer' }} />
            <label htmlFor="rememberMe" style={{ fontSize: '0.82rem', color: '#555', cursor: 'pointer', margin: 0 }}>
              Ghi nhớ đăng nhập
            </label>
          </div>

          <button type="submit" disabled={loading || !!socialLoading}
            style={{
              width: '100%', padding: '11px',
              background: loading || socialLoading ? '#d4b982' : 'linear-gradient(135deg, #C5A059, #e8c87e)',
              color: '#fff', border: 'none', borderRadius: 10,
              fontWeight: 700, fontSize: '0.9rem', letterSpacing: '1.5px',
              cursor: loading || socialLoading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(197,160,89,0.35)',
            }}>
            {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 22, fontSize: '0.85rem' }}>
          <span style={{ color: '#888' }}>Chưa có tài khoản? </span>
          <Link to="/register" style={{ color: '#C5A059', fontWeight: 700, textDecoration: 'none' }}>Đăng ký ngay</Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <Link to="/staff/login" style={{ color: '#aaa', fontSize: '0.75rem', textDecoration: 'none' }}>Cổng nhân viên →</Link>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default CustomerLoginPage;
