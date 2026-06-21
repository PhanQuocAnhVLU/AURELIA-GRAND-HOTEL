import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert, Card, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaBed, FaUserShield, FaUserTie, FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // Default role tab
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickFill = (testRole) => {
    setRole(testRole);
    switch (testRole) {
      case 'admin':
        setEmail('admin@luxuryhotel.vn');
        setPassword('admin123');
        break;
      case 'manager':
        setEmail('manager@luxuryhotel.vn');
        setPassword('manager123');
        break;
      case 'receptionist':
        setEmail('receptionist@luxuryhotel.vn');
        setPassword('reception123');
        break;
      case 'customer':
        setEmail('nguyenvanan@email.com');
        setPassword('customer123');
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const result = login(email, password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="hotel-card border-0 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
      <Card.Body className="p-4 p-md-5">
        <div className="text-center mb-4">
          <FaBed className="text-gold mb-2" size={40} />
          <h2 className="fw-bold">ĐĂNG NHẬP</h2>
          <p className="text-muted">Hệ thống quản lý khách sạn 5 sao</p>
        </div>

        {/* Role Tabs for Testing */}
        <div className="d-flex justify-content-center mb-4 gap-2 flex-wrap">
          <Button 
            variant={role === 'customer' ? 'gold' : 'outline-secondary'} 
            size="sm" 
            onClick={() => handleQuickFill('customer')}
            className={role === 'customer' ? 'btn-gold' : ''}
          >
            <FaUser className="me-1" /> Khách hàng
          </Button>
          <Button 
            variant={role === 'receptionist' ? 'navy' : 'outline-secondary'} 
            size="sm" 
            onClick={() => handleQuickFill('receptionist')}
            className={role === 'receptionist' ? 'bg-navy border-0' : ''}
          >
            Lễ tân
          </Button>
          <Button 
            variant={role === 'manager' ? 'primary' : 'outline-secondary'} 
            size="sm" 
            onClick={() => handleQuickFill('manager')}
          >
            <FaUserTie className="me-1" /> Quản lý
          </Button>
          <Button 
            variant={role === 'admin' ? 'danger' : 'outline-secondary'} 
            size="sm" 
            onClick={() => handleQuickFill('admin')}
          >
            <FaUserShield className="me-1" /> Admin
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">
                <FaEnvelope className="text-muted" />
              </InputGroup.Text>
              <Form.Control 
                type="email" 
                placeholder="Nhập email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-start-0 ps-0 bg-light"
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label className="d-flex justify-content-between">
              Mật khẩu
              <a href="#" className="text-muted text-decoration-none small">Quên mật khẩu?</a>
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light border-end-0">
                <FaLock className="text-muted" />
              </InputGroup.Text>
              <Form.Control 
                type="password" 
                placeholder="Nhập mật khẩu" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-start-0 ps-0 bg-light"
              />
            </InputGroup>
          </Form.Group>

          <Button 
            variant="gold" 
            type="submit" 
            className="w-100 btn-gold mb-3 py-2"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <span className="text-muted">Chưa có tài khoản? </span>
          <Link to="/register" className="text-gold fw-bold">Đăng ký ngay</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LoginPage;
