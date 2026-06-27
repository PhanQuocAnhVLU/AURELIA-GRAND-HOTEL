import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaIdCard, FaBed, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { validateEmail, validatePhone, validatePassword } from '../../utils/validators';

const SOCIAL_BUTTONS = [
  { key: 'google', label: 'Google', icon: <FcGoogle size={19} />, bg: '#fff', color: '#3c4043', border: '#dadce0', hoverBg: '#f8f9fa' },
  { key: 'facebook', label: 'Facebook', icon: <FaFacebookF size={17} color="#fff" />, bg: '#1877f2', color: '#fff', border: '#1877f2', hoverBg: '#166fe5' },
];

const Field = ({ label, icon, type = 'text', name, value, onChange, placeholder, required = false, right }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#444', display: 'block', marginBottom: 5 }}>{label}</label>
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#C5A059', fontSize: 13 }}>{icon}</span>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
        style={{ width: '100%', padding: right ? '9px 36px 9px 35px' : '9px 12px 9px 35px', border: '1.5px solid #e0e0e0', borderRadius: 9, fontSize: '0.875rem', outline: 'none', background: '#fafafa', boxSizing: 'border-box' }}
        onFocus={e => e.target.style.borderColor = '#C5A059'}
        onBlur={e => e.target.style.borderColor = '#e0e0e0'}
      />
      {right && <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}>{right}</span>}
    </div>
  </div>
);

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', idCard: '' });
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const { register, loginSocial } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(formData.email)) return setError('Email không hợp lệ');
    if (!validatePhone(formData.phone)) return setError('Số điện thoại không hợp lệ');
    if (!validatePassword(formData.password)) return setError('Mật khẩu phải có ít nhất 6 ký tự');
    if (formData.password !== formData.confirmPassword) return setError('Mật khẩu xác nhận không khớp');
    setLoading(true);
    try {
      const result = await register(formData, rememberMe);
      if (result.success) navigate('/dashboard');
      else setError(result.error);
    } catch { setError('Đã xảy ra lỗi. Vui lòng thử lại.'); }
    finally { setLoading(false); }
  };

  const handleSocial = async (key) => {
    setError('');
    setSocialLoading(key);
    try {
      const result = await loginSocial(key, true);
      if (result.success) navigate('/dashboard');
      else setError(result.error);
    } catch { setError('Đã xảy ra lỗi khi kết nối.'); }
    finally { setSocialLoading(null); }
  };

  return (
    <div style={{ maxWidth: 520, width: '100%', backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)', borderRadius: 20, boxShadow: '0 24px 60px rgba(0,0,0,0.22)', overflow: 'hidden', margin: '2rem 0' }}>
      <div style={{ height: 4, background: 'linear-gradient(90deg, #C5A059, #e8c87e, #C5A059)' }} />

      <div style={{ padding: '36px 44px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <FaBed style={{ color: '#C5A059', marginBottom: 10 }} size={38} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: '1.45rem', letterSpacing: '1.5px', margin: 0, color: '#1a1a2e' }}>ĐĂNG KÝ THÀNH VIÊN</h2>
          <p style={{ color: '#888', fontSize: '0.8rem', marginTop: 5, marginBottom: 0 }}>Nhận ngay ưu đãi đặc quyền cho khách hàng thân thiết</p>
        </div>

        {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: '0.875rem', color: '#dc2626' }}>{error}</div>}

        {/* Social Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 18 }}>
          {SOCIAL_BUTTONS.map(btn => (
            <button key={btn.key} onClick={() => handleSocial(btn.key)} disabled={!!socialLoading || loading}
              onMouseEnter={() => setHoveredSocial(btn.key)} onMouseLeave={() => setHoveredSocial(null)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '11px 16px',
                backgroundColor: hoveredSocial === btn.key ? btn.hoverBg : btn.bg,
                color: btn.color, border: `1.5px solid ${btn.border}`, borderRadius: 10,
                cursor: socialLoading || loading ? 'not-allowed' : 'pointer',
                fontWeight: 600, fontSize: '0.88rem', transition: 'all 0.18s ease',
                opacity: (socialLoading && socialLoading !== btn.key) || loading ? 0.5 : 1,
                width: '100%',
              }}>
              {socialLoading === btn.key ? <span style={{ display: 'inline-block', width: 18, height: 18, border: `2px solid ${btn.color}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> : btn.icon}
              {socialLoading === btn.key ? 'Đang kết nối...' : `Tiếp tục với ${btn.label}`}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ flex: 1, height: 1, background: '#e8e8e8' }} />
          <span style={{ color: '#aaa', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>hoặc đăng ký bằng email</span>
          <div style={{ flex: 1, height: 1, background: '#e8e8e8' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <Field label="Họ và tên" icon={<FaUser />} name="name" value={formData.name} onChange={handleChange} placeholder="Nguyễn Văn A" required />
          <Field label="Email" icon={<FaEnvelope />} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" required />
          <Field label="Số điện thoại" icon={<FaPhone />} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="0912345678" required />
          <Field label="Mật khẩu" icon={<FaLock />} type={showPw ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Tối thiểu 6 ký tự" required
            right={<button type="button" onClick={() => setShowPw(!showPw)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}>{showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}</button>} />
          <Field label="Xác nhận mật khẩu" icon={<FaLock />} type={showCpw ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Nhập lại mật khẩu" required
            right={<button type="button" onClick={() => setShowCpw(!showCpw)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: 0 }}>{showCpw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}</button>} />
          <Field label="CCCD/CMND (Tùy chọn)" icon={<FaIdCard />} name="idCard" value={formData.idCard} onChange={handleChange} placeholder="Số CCCD/CMND" />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
              style={{ width: 15, height: 15, accentColor: '#C5A059', cursor: 'pointer' }} />
            <label htmlFor="rememberMe" style={{ fontSize: '0.82rem', color: '#555', cursor: 'pointer', margin: 0 }}>Ghi nhớ đăng nhập cho lần sau</label>
          </div>

          <button type="submit" disabled={loading || !!socialLoading}
            style={{ width: '100%', padding: '11px', background: loading || socialLoading ? '#d4b982' : 'linear-gradient(135deg, #C5A059, #e8c87e)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.9rem', letterSpacing: '1.5px', cursor: loading || socialLoading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(197,160,89,0.35)' }}>
            {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ NGAY'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.85rem' }}>
          <span style={{ color: '#888' }}>Đã có tài khoản? </span>
          <Link to="/login" style={{ color: '#C5A059', fontWeight: 700, textDecoration: 'none' }}>Đăng nhập</Link>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default RegisterPage;
