import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Background Image */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.4)), url('https://images.unsplash.com/photo-1542314831-c6a4d14b8fc4?w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0
        }}
      ></div>

      {/* Content Overlay */}
      <Container 
        className="h-100 d-flex flex-column justify-content-center align-items-center text-center position-relative"
        style={{ zIndex: 1, paddingTop: '100px' }}
      >
        <div 
          className="text-white"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            textShadow: '0 4px 15px rgba(0,0,0,0.5)',
            maxWidth: '800px'
          }}
        >
          <h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: '2px', color: '#fff' }}>Trải Nghiệm Đẳng Cấp</h1>
          <h2 className="display-4 mb-4" style={{ color: 'var(--primary-color)', fontStyle: 'italic' }}>5 Sao Giữa Lòng Sài Gòn</h2>
          
          <p className="lead mb-5 px-md-5 fw-light" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.2rem', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
            Khám phá vẻ đẹp sang trọng, dịch vụ hoàn hảo và những phút giây thư giãn tuyệt đối tại Luxury Hotel Boutique Saigon.
          </p>
          
          <Button 
            as={Link} 
            to="/rooms" 
            variant="gold" 
            className="btn-gold px-5 py-3 rounded-0 text-uppercase"
            style={{ fontSize: '1.1rem', letterSpacing: '2px' }}
          >
            Hỗ trợ khách hàng / Đặt chỗ
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
