import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaClock, FaPhone, FaStar, FaLeaf, FaWineGlassAlt, FaUtensils } from 'react-icons/fa';

const venues = [
  {
    id: 1,
    name: 'Le Jardin',
    type: 'Fine Dining',
    tag: 'Nhà Hàng Chính',
    tagColor: '#C5A059',
    img: '/slide4.jpg',
    desc: 'Nhà hàng flagship của Aurelia Grand Hotel, mang đến trải nghiệm ẩm thực Pháp-Việt tinh tế trong không gian được thiết kế bởi đội ngũ kiến trúc sư nội thất hàng đầu Đông Nam Á.',
    hours: '06:30 – 22:30',
    seats: '120 chỗ ngồi',
    highlight: 'Buffet sáng & À la carte tối',
    stars: 5,
    features: ['🥐 Buffet sáng quốc tế', '🍷 Hầm rượu 300+ nhãn', '🎻 Live music tối thứ 6–7', '👨‍🍳 Chef người Pháp'],
  },
  {
    id: 2,
    name: 'Saigon Sky Bar',
    type: 'Rooftop Bar & Lounge',
    tag: 'Tầng Thượng',
    tagColor: '#1E3A5F',
    img: '/slide2.jpg',
    desc: 'Bar trên sân thượng tầng 25 với tầm nhìn 360° ôm trọn đường chân trời Sài Gòn về đêm. Không gian lý tưởng để thưởng thức cocktail thủ công và sushi cao cấp.',
    hours: '17:00 – 02:00',
    seats: '80 chỗ ngồi',
    highlight: 'Cocktail thủ công & Sushi omakase',
    stars: 5,
    features: ['🍹 Cocktail thủ công', '🍣 Sushi omakase', '🌃 View 360° Saigon', '🎷 Live Jazz hàng đêm'],
  },
  {
    id: 3,
    name: 'Lotus Brasserie',
    type: 'All-Day Dining',
    tag: 'Ăn Uống Cả Ngày',
    tagColor: '#2E7D32',
    img: '/slide1.jpg',
    desc: 'Không gian brasserie hiện đại phục vụ cả ngày với thực đơn đa dạng từ món Việt truyền thống đến các món Á-Âu fusion sáng tạo, phù hợp cho bữa sáng, trưa và tối.',
    hours: '06:00 – 23:00',
    seats: '200 chỗ ngồi',
    highlight: 'Fusion Á-Âu & Đặc sản Việt',
    stars: 4,
    features: ['🍜 Đặc sản Việt Nam', '🥘 Fusion Á-Âu', '🌿 Thực đơn chay', '🧁 Bánh ngọt thủ công'],
  },
  {
    id: 4,
    name: 'Cigar & Cognac Lounge',
    type: 'Lounge Cao Cấp',
    tag: 'Lounge Thư Giãn',
    tagColor: '#7B3F00',
    img: '/slide5.jpg',
    desc: 'Không gian lounge sang trọng với ánh sáng ấm áp, được bài trí theo phong cách colonial Anh. Thưởng thức xì gà Cuba chính hiệu cùng Cognac và rượu Whisky thượng hạng.',
    hours: '18:00 – 01:00',
    seats: '40 chỗ ngồi',
    highlight: 'Xì gà Cuba & Rượu mạnh thượng hạng',
    stars: 5,
    features: ['🚬 Xì gà Cuba chính hiệu', '🥃 Whisky & Cognac', '📚 Thư viện rượu', '🎵 Nhạc jazz thư giãn'],
  },
];

const DiningPage = () => {
  const [hovered, setHovered] = useState(null);
  const [activeVenue, setActiveVenue] = useState(null);

  return (
    <div style={{ background: '#0B1120', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* ─── HERO ─── */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(11,17,32,0.55), rgba(11,17,32,0.88)), url('/slide4.jpg')`,
        backgroundSize: 'cover', backgroundPosition: 'center 40%',
        padding: '180px 0 100px', textAlign: 'center', color: '#fff',
      }}>
        <Container>
          <p style={{ letterSpacing: '5px', fontSize: '0.8rem', color: '#C5A059', textTransform: 'uppercase', marginBottom: '16px' }}>
            ✦ NGHỆ THUẬT ẨM THỰC ✦
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, marginBottom: '20px', lineHeight: 1.15 }}>
            Ẩm Thực <span style={{ color: '#C5A059' }}>Tinh Hoa</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#bbb', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Hành trình khám phá văn hóa ẩm thực qua từng món ăn được chắt lọc từ tinh hoa 
            của 4 không gian ẩm thực độc đáo ngay trong lòng khách sạn.
          </p>
        </Container>
      </div>

      {/* ─── VENUE CARDS ─── */}
      <Container style={{ marginTop: '80px' }}>
        <div className="text-center mb-5">
          <p style={{ color: '#C5A059', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Khám phá</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '2.8rem', fontWeight: 700 }}>
            4 Không Gian Ẩm Thực
          </h2>
          <div style={{ width: '60px', height: '2px', background: '#C5A059', margin: '16px auto 0' }} />
        </div>

        {venues.map((v, idx) => (
          <div
            key={v.id}
            onMouseEnter={() => setHovered(v.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              marginBottom: '40px',
              border: `1px solid ${hovered === v.id ? '#C5A059' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '4px', overflow: 'hidden',
              transition: 'all 0.4s ease',
              boxShadow: hovered === v.id ? '0 16px 50px rgba(197,160,89,0.12)' : 'none',
            }}
          >
            <Row className="g-0" style={{ flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse' }}>
              {/* Image */}
              <Col md={5} style={{ position: 'relative', minHeight: '360px' }}>
                <img
                  src={v.img}
                  alt={v.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0,
                    transform: hovered === v.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.6s ease',
                  }}
                  onError={e => { e.target.onerror = null; e.target.src = '/slide1.jpg'; }}
                />
                <div style={{
                  position: 'absolute', top: '20px', left: '20px',
                  background: v.tagColor, color: '#fff',
                  padding: '5px 16px', fontSize: '0.72rem',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  fontWeight: 700, borderRadius: '2px',
                }}>
                  {v.tag}
                </div>
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '4px' }}>
                  {Array.from({ length: v.stars }).map((_, i) => (
                    <FaStar key={i} style={{ color: '#C5A059', fontSize: '0.9rem' }} />
                  ))}
                </div>
              </Col>

              {/* Content */}
              <Col md={7} style={{ background: 'rgba(255,255,255,0.02)', padding: '48px' }}>
                <p style={{ color: '#C5A059', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {v.type}
                </p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '2.2rem', fontWeight: 700, marginBottom: '16px' }}>
                  {v.name}
                </h3>
                <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: '24px', fontSize: '0.95rem' }}>
                  {v.desc}
                </p>

                {/* Features */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                  {v.features.map((f, i) => (
                    <span key={i} style={{
                      background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.2)',
                      color: '#ddd', fontSize: '0.82rem', padding: '5px 12px', borderRadius: '2px',
                    }}>
                      {f}
                    </span>
                  ))}
                </div>

                {/* Info row */}
                <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px' }}>
                  <div>
                    <p style={{ color: '#666', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Giờ mở cửa</p>
                    <p style={{ color: '#C5A059', fontWeight: 600, marginBottom: 0, fontSize: '0.9rem' }}>
                      <FaClock style={{ marginRight: '6px' }} />{v.hours}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: '#666', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Sức chứa</p>
                    <p style={{ color: '#C5A059', fontWeight: 600, marginBottom: 0, fontSize: '0.9rem' }}>
                      <FaUtensils style={{ marginRight: '6px' }} />{v.seats}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: '#666', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Đặc sắc</p>
                    <p style={{ color: '#C5A059', fontWeight: 600, marginBottom: 0, fontSize: '0.9rem' }}>
                      <FaLeaf style={{ marginRight: '6px' }} />{v.highlight}
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: '28px', display: 'flex', gap: '12px' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #C5A059, #A07840)',
                    border: 'none', color: '#fff', padding: '12px 28px',
                    fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1.5px',
                    textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer',
                  }}>
                    Đặt Bàn
                  </button>
                  <button style={{
                    background: 'transparent', border: '1px solid rgba(197,160,89,0.4)',
                    color: '#C5A059', padding: '12px 28px',
                    fontWeight: 600, fontSize: '0.82rem', letterSpacing: '1.5px',
                    textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer',
                  }}>
                    Xem Menu
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        ))}

        {/* ─── RESERVATION BANNER ─── */}
        <div style={{
          marginTop: '60px',
          background: 'linear-gradient(135deg, rgba(197,160,89,0.15) 0%, rgba(30,58,95,0.3) 100%)',
          border: '1px solid rgba(197,160,89,0.25)',
          borderRadius: '4px', padding: '50px 40px', textAlign: 'center',
        }}>
          <p style={{ color: '#C5A059', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '12px' }}>
            Đặt Bàn
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px' }}>
            Trải Nghiệm Bữa Ăn Khó Quên
          </h2>
          <p style={{ color: '#aaa', marginBottom: '32px', fontSize: '0.95rem' }}>
            Liên hệ đội ngũ của chúng tôi để đặt bàn và nhận tư vấn thực đơn riêng
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="tel:+8428123456789" style={{
              background: 'linear-gradient(135deg, #C5A059, #A07840)',
              color: '#fff', padding: '14px 36px', textDecoration: 'none',
              fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1.5px',
              textTransform: 'uppercase', borderRadius: '2px',
            }}>
              <FaPhone style={{ marginRight: '8px' }} />Gọi Đặt Bàn
            </a>
            <button style={{
              background: 'transparent', border: '1px solid rgba(197,160,89,0.5)',
              color: '#C5A059', padding: '14px 36px',
              fontWeight: 600, fontSize: '0.85rem', letterSpacing: '1.5px',
              textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer',
            }}>
              <FaWineGlassAlt style={{ marginRight: '8px' }} />Đặt Tiệc Riêng
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DiningPage;
