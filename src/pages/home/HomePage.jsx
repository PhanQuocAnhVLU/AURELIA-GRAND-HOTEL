import { useState, useEffect, useCallback } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaSearch, FaCalendarAlt, FaUserFriends } from 'react-icons/fa';

const heroImages = [
  '/slide1.jpg',
  '/slide2.jpg',
  '/slide3.jpg',
  '/slide4.jpg',
  '/slide5.jpg',
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroImages.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length);
  }, [currentSlide, goToSlide]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* ====== HERO SLIDER ====== */}
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        {/* Slides */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url('${img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              zIndex: index === currentSlide ? 1 : 0,
            }}
          />
        ))}

        {/* Dark Overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.4) 100%)',
          zIndex: 2,
        }} />

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', width: '50px', height: '50px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(4px)',
            fontSize: '1.1rem',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          style={{
            position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff', width: '50px', height: '50px', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(4px)',
            fontSize: '1.1rem',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>

        {/* Slide Dots */}
        <div style={{
          position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 10, display: 'flex', gap: '10px',
        }}>
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: index === currentSlide ? '28px' : '10px',
                height: '10px',
                borderRadius: index === currentSlide ? '5px' : '50%',
                background: index === currentSlide ? 'var(--primary-color)' : 'rgba(255,255,255,0.5)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ====== BOOKING SEARCH BAR ====== */}
      <div style={{
        background: 'var(--secondary-color)',
        padding: '25px 0',
        borderBottom: '3px solid var(--primary-color)',
      }}>
        <Container>
          <Row className="align-items-end g-3 justify-content-center">
            <Col xs={12} md={3}>
              <Form.Label className="text-white small text-uppercase fw-medium" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                <FaCalendarAlt className="me-2 text-gold" />Nhận phòng
              </Form.Label>
              <Form.Control
                type="date"
                style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', borderRadius: '4px', padding: '10px 14px',
                }}
              />
            </Col>
            <Col xs={12} md={3}>
              <Form.Label className="text-white small text-uppercase fw-medium" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                <FaCalendarAlt className="me-2 text-gold" />Trả phòng
              </Form.Label>
              <Form.Control
                type="date"
                style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', borderRadius: '4px', padding: '10px 14px',
                }}
              />
            </Col>
            <Col xs={12} md={3}>
              <Form.Label className="text-white small text-uppercase fw-medium" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                <FaUserFriends className="me-2 text-gold" />Số khách
              </Form.Label>
              <Form.Select
                style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', borderRadius: '4px', padding: '10px 14px',
                }}
              >
                <option value="1">1 Khách</option>
                <option value="2">2 Khách</option>
                <option value="3">3 Khách</option>
                <option value="4">4 Khách</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={3}>
              <Button
                as={Link}
                to="/rooms"
                variant="gold"
                className="btn-gold w-100 rounded-0 py-2 d-flex align-items-center justify-content-center gap-2"
                style={{ letterSpacing: '1.5px', fontSize: '0.9rem', height: '44px' }}
              >
                <FaSearch /> TÌM PHÒNG
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ====== ABOUT SECTION ====== */}
      <section style={{ padding: '80px 0', background: 'var(--bg-main)' }}>
        <Container>
          <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p className="text-uppercase text-gold mb-2 fw-medium" style={{ letterSpacing: '3px', fontSize: '0.8rem' }}>
              Chào mừng đến với
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.8rem',
              fontWeight: 600,
              color: 'var(--secondary-color)',
              marginBottom: '1.5rem',
            }}>
              LUXURY HOTEL Boutique Saigon
            </h2>
            <div style={{ width: '60px', height: '2px', background: 'var(--primary-color)', margin: '0 auto 2rem' }} />
            <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.9 }}>
              Tọa lạc tại trung tâm Quận 1, Luxury Hotel Boutique Saigon mang đến trải nghiệm lưu trú đẳng cấp
              với sự kết hợp tinh tế giữa phong cách cổ điển châu Âu và sự hiện đại. Mỗi chi tiết đều được
              chăm chút tỉ mỉ, từ nội thất sang trọng đến dịch vụ hoàn hảo, tạo nên không gian nghỉ dưỡng
              lý tưởng cho những vị khách sành điệu nhất.
            </p>
          </div>
        </Container>
      </section>

      {/* ====== ROOMS SHOWCASE ====== */}
      <section style={{ padding: '80px 0', background: '#f7f5f0' }}>
        <Container>
          <div className="text-center mb-5">
            <p className="text-uppercase text-gold mb-2 fw-medium" style={{ letterSpacing: '3px', fontSize: '0.8rem' }}>
              Khám phá
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem',
              fontWeight: 600, color: 'var(--secondary-color)',
            }}>
              Hạng phòng nổi bật
            </h2>
            <div style={{ width: '60px', height: '2px', background: 'var(--primary-color)', margin: '1rem auto 0' }} />
          </div>

          <Row className="g-4">
            {[
              { name: 'Deluxe Room', desc: 'Phòng sang trọng với view thành phố', img: '/room1.jpg' },
              { name: 'Executive Suite', desc: 'Suite cao cấp với phòng khách riêng biệt', img: '/room2.jpg' },
              { name: 'Presidential Suite', desc: 'Suite Tổng thống — đỉnh cao của sự xa hoa', img: '/room3.jpg' },
            ].map((room, idx) => (
              <Col md={4} key={idx}>
                <div
                  style={{
                    position: 'relative', overflow: 'hidden', cursor: 'pointer',
                    height: '420px', borderRadius: '4px',
                  }}
                  onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1.08)'; e.currentTarget.querySelector('.room-overlay').style.opacity = '1'; }}
                  onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; e.currentTarget.querySelector('.room-overlay').style.opacity = '0.7'; }}
                >
                  <img
                    src={room.img}
                    alt={room.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                    onError={e => { e.target.onerror = null; e.target.src = '/slide1.jpg'; }}
                  />
                  <div
                    className="room-overlay"
                    style={{
                      position: 'absolute', bottom: 0, left: 0, width: '100%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                      padding: '40px 25px 25px', opacity: 0.7,
                      transition: 'opacity 0.4s ease',
                    }}
                  >
                    <h5 className="text-white fw-bold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem' }}>
                      {room.name}
                    </h5>
                    <p className="text-white-50 mb-3" style={{ fontSize: '0.9rem' }}>{room.desc}</p>
                    <Link
                      to="/rooms"
                      className="text-gold text-uppercase text-decoration-none fw-medium"
                      style={{ letterSpacing: '2px', fontSize: '0.8rem' }}
                    >
                      Xem chi tiết →
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ====== SERVICES ====== */}
      <section style={{ padding: '80px 0', background: 'var(--secondary-color)', color: '#fff' }}>
        <Container>
          <div className="text-center mb-5">
            <p className="text-uppercase text-gold mb-2 fw-medium" style={{ letterSpacing: '3px', fontSize: '0.8rem' }}>
              Dịch vụ
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 600,
            }}>
              Tiện ích & Trải nghiệm
            </h2>
            <div style={{ width: '60px', height: '2px', background: 'var(--primary-color)', margin: '1rem auto 0' }} />
          </div>

          <Row className="g-4 text-center">
            {[
              { icon: '🍽️', title: 'Nhà hàng', desc: 'Ẩm thực Á - Âu đỉnh cao với Bếp trưởng quốc tế' },
              { icon: '💆', title: 'Spa & Wellness', desc: 'Liệu pháp chăm sóc sức khỏe và sắc đẹp chuyên nghiệp' },
              { icon: '🏊', title: 'Hồ bơi', desc: 'Hồ bơi tầng thượng với tầm nhìn toàn cảnh thành phố' },
              { icon: '🚗', title: 'Đưa đón', desc: 'Dịch vụ xe đưa đón sân bay và tham quan thành phố' },
            ].map((s, idx) => (
              <Col md={3} sm={6} key={idx}>
                <div
                  style={{
                    padding: '40px 20px', borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.3s ease', cursor: 'default',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.background = 'rgba(197,160,89,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{s.icon}</div>
                  <h5 className="fw-bold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem' }}>{s.title}</h5>
                  <p className="text-white-50 mb-0" style={{ fontSize: '0.9rem' }}>{s.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ====== CTA ====== */}
      <section style={{
        padding: '80px 0',
        backgroundImage: `linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.75)), url('/cta-bg.jpg')`,
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
        textAlign: 'center', color: '#fff',
      }}>
        <Container>
          <p className="text-uppercase text-gold mb-3 fw-medium" style={{ letterSpacing: '3px', fontSize: '0.8rem' }}>
            Đặt phòng ngay hôm nay
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: '2.6rem', fontWeight: 600, marginBottom: '1.5rem',
          }}>
            Trải nghiệm kỳ nghỉ trong mơ
          </h2>
          <p className="text-white-50 mb-4" style={{ maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            Liên hệ ngay để nhận ưu đãi đặc biệt dành riêng cho bạn. Chúng tôi luôn sẵn sàng mang đến trải nghiệm tốt nhất.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button
              as={Link}
              to="/rooms"
              variant="gold"
              className="btn-gold rounded-0 px-5 py-3 text-uppercase"
              style={{ letterSpacing: '2px', fontSize: '0.9rem' }}
            >
              Đặt phòng ngay
            </Button>
            <Button
              as={Link}
              to="/services"
              variant="outline-light"
              className="rounded-0 px-5 py-3 text-uppercase"
              style={{ letterSpacing: '2px', fontSize: '0.9rem', borderWidth: '1px' }}
            >
              Khám phá dịch vụ
            </Button>
          </div>
        </Container>
      </section>

      {/* ====== FOOTER ====== */}
      <footer style={{ padding: '50px 0 30px', background: '#0B1120', color: 'rgba(255,255,255,0.6)' }}>
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>LUXURY</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--primary-color)' }}>HOTEL</span>
                <div style={{ fontSize: '0.7rem', letterSpacing: '3px', color: '#888', textTransform: 'uppercase', marginTop: '-3px' }}>Boutique Saigon</div>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.7 }}>
                Tọa lạc tại trung tâm Quận 1, TP.HCM. Nơi hội tụ của sự sang trọng và hiếu khách.
              </p>
            </Col>
            <Col md={4}>
              <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>Liên hệ</h6>
              <p className="mb-1" style={{ fontSize: '0.85rem' }}>📍 123 Nguyễn Huệ, Quận 1, TP.HCM</p>
              <p className="mb-1" style={{ fontSize: '0.85rem' }}>📞 +84 28 1234 5678</p>
              <p className="mb-1" style={{ fontSize: '0.85rem' }}>✉️ info@luxuryhotel.vn</p>
            </Col>
            <Col md={4}>
              <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.85rem' }}>Liên kết nhanh</h6>
              <div className="d-flex flex-column gap-2" style={{ fontSize: '0.85rem' }}>
                <Link to="/rooms" className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.6)' }}>Phòng nghỉ</Link>
                <Link to="/services" className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.6)' }}>Dịch vụ</Link>
                <Link to="/login" className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.6)' }}>Đăng nhập</Link>
              </div>
            </Col>
          </Row>
          <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '2rem 0 1.5rem' }} />
          <p className="text-center mb-0" style={{ fontSize: '0.8rem' }}>
            © 2026 Luxury Hotel Boutique Saigon. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
};

export default HomePage;
