import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaClock, FaPhone, FaStar, FaLeaf, FaDumbbell, FaSwimmingPool, FaSpa, FaCar } from 'react-icons/fa';
import { MdSelfImprovement } from 'react-icons/md';

const spaTreatments = [
  { name: 'Thư Giãn Toàn Thân', duration: '90 phút', price: '1.800.000₫', icon: '💆' },
  { name: 'Massage Đá Nóng', duration: '75 phút', price: '2.200.000₫', icon: '🪨' },
  { name: 'Chăm Sóc Da Mặt Vàng', duration: '60 phút', price: '2.500.000₫', icon: '✨' },
  { name: 'Ngâm Thảo Dược', duration: '45 phút', price: '1.200.000₫', icon: '🌿' },
  { name: 'Massage Bốn Tay', duration: '90 phút', price: '3.200.000₫', icon: '🙌' },
  { name: 'Gói Cặp Đôi Luxury', duration: '120 phút', price: '5.500.000₫', icon: '💑' },
];

const services = [
  {
    id: 1,
    icon: <FaSpa style={{ fontSize: '2.4rem', color: '#C5A059' }} />,
    name: 'Aurelia Spa & Wellness',
    desc: 'Trung tâm spa 5 tầng với hơn 20 phòng trị liệu, kết hợp phương pháp cổ truyền phương Đông và kỹ thuật hiện đại châu Âu. Không gian tắm hơi, phòng muối Himalaya và hồ ngâm thư giãn.',
    img: '/slide2.jpg',
    tag: 'Spa Đặc Trưng',
    hours: '08:00 – 22:00',
  },
  {
    id: 2,
    icon: <FaSwimmingPool style={{ fontSize: '2.4rem', color: '#C5A059' }} />,
    name: 'Hồ Bơi Vô Cực Tầng 22',
    desc: 'Hồ bơi vô cực ngoài trời dài 30m với tầm nhìn 180° ra sông Sài Gòn và trung tâm thành phố. Khu vực bể nóng, bãi nằm tắm nắng cao cấp và dịch vụ đồ uống tại chỗ.',
    img: '/slide2.jpg',
    tag: 'Tiện Ích Cao Cấp',
    hours: '06:00 – 22:00',
  },
  {
    id: 3,
    icon: <FaDumbbell style={{ fontSize: '2.4rem', color: '#C5A059' }} />,
    name: 'Fitness Center & Studio',
    desc: 'Phòng tập gym cao cấp 300m² trang bị thiết bị Technogym thế hệ mới nhất, studio yoga/pilates, personal trainer chuyên nghiệp và chương trình luyện tập tùy chỉnh theo yêu cầu.',
    img: '/slide1.jpg',
    tag: 'Sức Khỏe',
    hours: '05:00 – 23:00',
  },
  {
    id: 4,
    icon: <FaCar style={{ fontSize: '2.4rem', color: '#C5A059' }} />,
    name: 'Concierge & Đưa Đón',
    desc: 'Đội ngũ concierge đẳng cấp 5 sao sẵn sàng phục vụ 24/7. Dịch vụ đưa đón sân bay, xe limousine hạng sang, đặt vé nhà hát, tour thành phố và mọi yêu cầu cá nhân hóa.',
    img: '/slide5.jpg',
    tag: 'Phục Vụ Cao Cấp',
    hours: '24/7',
  },
];

const ServicesPage = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ background: '#0B1120', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* ─── HERO ─── */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(11,17,32,0.5), rgba(11,17,32,0.9)), url('/slide2.jpg')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: '180px 0 100px', textAlign: 'center', color: '#fff',
      }}>
        <Container>
          <p style={{ letterSpacing: '5px', fontSize: '0.8rem', color: '#C5A059', textTransform: 'uppercase', marginBottom: '16px' }}>
            ✦ THƯ THÁI & TÁI SINH ✦
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, marginBottom: '20px', lineHeight: 1.15 }}>
            Dịch Vụ <span style={{ color: '#C5A059' }}>& Spa</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#bbb', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Tái sinh cơ thể và tâm hồn với bộ sưu tập dịch vụ chăm sóc cao cấp được thiết kế 
            riêng để mang lại sự cân bằng hoàn hảo giữa thể chất và tinh thần.
          </p>
        </Container>
      </div>

      {/* ─── SERVICES GRID ─── */}
      <Container style={{ marginTop: '80px' }}>
        <div className="text-center mb-5">
          <p style={{ color: '#C5A059', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Tiện Ích</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '2.8rem', fontWeight: 700 }}>
            Không Gian Thư Giãn Đỉnh Cao
          </h2>
          <div style={{ width: '60px', height: '2px', background: '#C5A059', margin: '16px auto 0' }} />
        </div>

        <Row className="g-4 mb-5">
          {services.map((s) => (
            <Col md={6} key={s.id}>
              <div
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  border: `1px solid ${hovered === s.id ? '#C5A059' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '4px', overflow: 'hidden',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.4s ease',
                  transform: hovered === s.id ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hovered === s.id ? '0 20px 50px rgba(197,160,89,0.12)' : 'none',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={s.img}
                    alt={s.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transform: hovered === s.id ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.6s ease',
                    }}
                    onError={e => { e.target.onerror = null; e.target.src = '/slide1.jpg'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,17,32,0.9) 0%, transparent 60%)' }} />
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: 'rgba(197,160,89,0.2)', border: '1px solid rgba(197,160,89,0.4)',
                    color: '#C5A059', padding: '4px 14px', fontSize: '0.72rem',
                    letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600, borderRadius: '2px',
                  }}>
                    {s.tag}
                  </div>
                  <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                    {s.icon}
                  </div>
                </div>
                {/* Content */}
                <div style={{ padding: '24px 28px 32px' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.6rem', fontWeight: 700, marginBottom: '10px' }}>
                    {s.name}
                  </h3>
                  <p style={{ color: '#999', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '20px' }}>
                    {s.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#C5A059', fontSize: '0.82rem' }}>
                      <FaClock style={{ marginRight: '6px' }} />{s.hours}
                    </span>
                    <button style={{
                      background: hovered === s.id ? 'linear-gradient(135deg, #C5A059, #A07840)' : 'transparent',
                      border: '1px solid rgba(197,160,89,0.4)',
                      color: hovered === s.id ? '#fff' : '#C5A059',
                      padding: '8px 22px', borderRadius: '2px', cursor: 'pointer',
                      fontSize: '0.78rem', letterSpacing: '1.5px', textTransform: 'uppercase',
                      fontWeight: 600, transition: 'all 0.3s',
                    }}>
                      Đặt Ngay
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* ─── SPA TREATMENTS ─── */}
        <div style={{
          marginTop: '70px', padding: '60px 40px',
          background: 'linear-gradient(135deg, rgba(197,160,89,0.07) 0%, rgba(30,58,95,0.15) 100%)',
          border: '1px solid rgba(197,160,89,0.18)', borderRadius: '4px',
        }}>
          <div className="text-center mb-5">
            <p style={{ color: '#C5A059', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase' }}>Aurelia Spa</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '2.5rem', fontWeight: 700 }}>
              Liệu Trình Spa Đặc Trưng
            </h2>
            <div style={{ width: '50px', height: '2px', background: '#C5A059', margin: '14px auto 0' }} />
          </div>

          <Row className="g-3">
            {spaTreatments.map((t, i) => (
              <Col md={4} key={i}>
                <div
                  onMouseEnter={() => setHovered(`spa-${i}`)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    padding: '24px',
                    border: `1px solid ${hovered === `spa-${i}` ? '#C5A059' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '4px',
                    background: hovered === `spa-${i}` ? 'rgba(197,160,89,0.06)' : 'rgba(255,255,255,0.02)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{t.icon}</div>
                  <h5 style={{ color: '#fff', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
                    {t.name}
                  </h5>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#888', fontSize: '0.83rem' }}>
                      <FaClock style={{ marginRight: '5px', color: '#C5A059' }} />{t.duration}
                    </span>
                    <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '0.95rem' }}>{t.price}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <button style={{
              background: 'linear-gradient(135deg, #C5A059, #A07840)',
              border: 'none', color: '#fff', padding: '14px 48px',
              fontWeight: 700, fontSize: '0.88rem', letterSpacing: '2px',
              textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer',
            }}>
              <FaLeaf style={{ marginRight: '8px' }} />
              Đặt Liệu Trình Ngay
            </button>
            <p style={{ color: '#666', fontSize: '0.82rem', marginTop: '14px' }}>
              Gọi trực tiếp: <a href="tel:+84281234567" style={{ color: '#C5A059', textDecoration: 'none' }}>+84 28 1234 5678</a> để được tư vấn
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ServicesPage;
