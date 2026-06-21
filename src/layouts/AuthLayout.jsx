import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const AuthLayout = () => {
  return (
    <div className="auth-layout" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--secondary-color) 100%)'
    }}>
      <Container>
        <div className="d-flex justify-content-center">
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default AuthLayout;
