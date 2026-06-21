import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const PublicNavbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar 
      expand="lg" 
      fixed="top"
      style={{
        transition: 'all 0.4s ease',
        backgroundColor: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        padding: scrolled ? '10px 0' : '20px 0',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none'
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <div className="text-white" style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '1px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: '700' }}>LUXURY</span>
            <span style={{ fontSize: '1.8rem', fontWeight: '400', color: 'var(--primary-color)' }}>HOTEL</span>
            <div style={{ fontSize: '0.7rem', letterSpacing: '3px', color: '#ccc', textTransform: 'uppercase', marginTop: '-5px' }}>Boutique Saigon</div>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', letterSpacing: '1px' }}>
            <Nav.Link as={Link} to="/rooms" className="text-white mx-3 px-0 position-relative nav-hover-underline">CHỖ Ở</Nav.Link>
            <Nav.Link href="#dining" className="text-white mx-3 px-0 position-relative nav-hover-underline">ẨM THỰC</Nav.Link>
            <Nav.Link as={Link} to="/services" className="text-white mx-3 px-0 position-relative nav-hover-underline">DỊCH VỤ & SPA</Nav.Link>
            <Nav.Link href="#offers" className="text-white mx-3 px-0 position-relative nav-hover-underline">ƯU ĐÃI</Nav.Link>
          </Nav>
          
          <div className="d-flex align-items-center mt-3 mt-lg-0">
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" id="dropdown-user" className="d-flex align-items-center text-decoration-none text-white p-0 me-3">
                  <img 
                    src={user?.avatar || 'https://i.pravatar.cc/150'} 
                    alt="User" 
                    className="rounded-circle me-2 border border-gold" 
                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  />
                  <span className="d-none d-xl-block fw-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.95rem' }}>{user?.name}</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0 mt-3" style={{ backgroundColor: '#1E293B' }}>
                  <Dropdown.Item as={Link} to="/dashboard" className="text-light hover-bg-dark py-2">
                    <FaUserCircle className="me-2 text-gold" /> Bảng điều khiển
                  </Dropdown.Item>
                  <Dropdown.Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                  <Dropdown.Item onClick={logout} className="text-danger hover-bg-dark py-2">
                    <FaSignOutAlt className="me-2" /> Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link to="/login" className="text-white text-decoration-none me-4 fw-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.9rem' }}>ĐĂNG NHẬP</Link>
            )}
            
            <Button 
              as={Link} 
              to="/rooms" 
              variant="gold" 
              className="btn-gold rounded-0 px-4 py-2"
              style={{ letterSpacing: '1px', fontSize: '0.9rem' }}
            >
              ĐẶT CHỖ NGAY
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavbar;
