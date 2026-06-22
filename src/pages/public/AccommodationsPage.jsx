import { useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBed, FaExpand, FaUsers, FaEye, FaWifi, FaCoffee, FaTv, FaSnowflake, FaBath, FaConciergeBell } from 'react-icons/fa';

const rooms = [
  {
    id: 1,
    name: 'Deluxe Room',
    nameVi: 'Phòng Deluxe',
    size: '35m²',
    guests: 2,
    view: 'View thành phố',
    price: '2.800.000',
    img: '/room1.jpg',
    badge: 'Phổ biến nhất',
    badgeColor: '#C5A059',
    desc: 'Phòng Deluxe rộng rãi với thiết kế hiện đại, nội thất cao cấp và cửa sổ rộng nhìn ra thành phố sôi động. Lý tưởng cho cặp đôi hoặc khách công tác.',
    amenities: ['WiFi tốc độ cao', 'Minibar', 'Smart TV 55"', 'Điều hòa', 'Bồn tắm', 'Dịch vụ phòng 24/7'],
  },
  {
    id: 2,
    name: 'Premier Room',
    nameVi: 'Phòng Premier',
    size: '45m²',
    guests: 2,
    view: 'View hồ bơi',
    price: '3.600.000',
    img: '/slide3.jpg',
    badge: 'Lựa chọn mới',
    badgeColor: '#1E3A5F',
    desc: 'Phòng Premier sang trọng với không gian sống rộng rãi, ban công riêng nhìn ra hồ bơi và khu vườn nhiệt đới xanh mát, mang lại cảm giác thư thái tuyệt vời.',
    amenities: ['WiFi tốc độ cao', 'Minibar cao cấp', 'Smart TV 65"', 'Điều hòa', 'Bồn tắm sục', 'Đưa đón sân bay'],
  },
  {
    id: 3,
    name: 'Executive Suite',
    nameVi: 'Suite Hành Pháp',
    size: '65m²',
    guests: 3,
    view: 'View panoramic',
    price: '5.500.000',
    img: '/room2.jpg',
    badge: 'Sang trọng',
    badgeColor: '#7B3F00',
    desc: 'Suite Hành Pháp với phòng khách riêng biệt, bàn làm việc cao cấp và tầm nhìn panoramic 180° ôm trọn đường chân trời Sài Gòn. Hoàn hảo cho khách doanh nhân.',
    amenities: ['WiFi tốc độ cao', 'Phòng khách riêng', 'Smart TV 75"', 'Điều hòa', 'Jacuzzi', 'Butler riêng'],
  },
  {
    id: 4,
    name: 'Junior Suite',
    nameVi: 'Junior Suite',
    size: '55m²',
    guests: 2,
    view: 'View sông',
    price: '4.200.000',
    img: '/slide1.jpg',
    badge: 'Mới khai trương',
    badgeColor: '#2E7D32',
    desc: 'Junior Suite hiện đại với phong cách thiết kế đương đại, phòng ngủ rộng rãi và khu vực ngồi thư giãn thoải mái, nhìn ra dòng sông thơ mộng.',
    amenities: ['WiFi tốc độ cao', 'Minibar', 'Smart TV 65"', 'Điều hòa', 'Bồn tắm đứng', 'Dịch vụ phòng 24/7'],
  },
  {
    id: 5,
    name: 'Presidential Suite',
    nameVi: 'Suite Tổng Thống',
    size: '120m²',
    guests: 4,
    view: 'View toàn cảnh',
    price: '12.000.000',
    img: '/room3.jpg',
    badge: 'Đỉnh cao xa hoa',
    badgeColor: '#B8860B',
    desc: 'Đỉnh cao của sự sang trọng — Presidential Suite với 2 phòng ngủ, phòng ăn, phòng khách riêng và sân thượng tư nhân nhìn ra toàn cảnh Quận 1.',
    amenities: ['WiFi tốc độ cao', '2 Phòng ngủ', 'Smart TV 85"', 'Điều hòa', 'Bể sục riêng', 'Butler & Chef riêng'],
  },
  {
    id: 6,
    name: 'Family Room',
    nameVi: 'Phòng Gia Đình',
    size: '70m²',
    guests: 4,
    view: 'View thành phố',
    price: '4.800.000',
    img: '/slide2.jpg',
    badge: 'Thích hợp gia đình',
    badgeColor: '#0277BD',
    desc: 'Phòng Gia Đình rộng rãi với 1 giường đôi lớn và 2 giường đơn, khu vực chơi cho trẻ em và đầy đủ tiện nghi để cả gia đình tận hưởng kỳ nghỉ hoàn hảo.',
    amenities: ['WiFi tốc độ cao', 'Minibar', 'Smart TV 65"', 'Điều hòa', 'Bồn tắm', 'Khu vui chơi trẻ em'],
  },
];

const amenityIcons = {
  'WiFi tốc độ cao': <FaWifi />,
  'Minibar': <FaCoffee />,
  'Minibar cao cấp': <FaCoffee />,
  'Smart TV 55"': <FaTv />,
  'Smart TV 65"': <FaTv />,
  'Smart TV 75"': <FaTv />,
  'Smart TV 85"': <FaTv />,
  'Điều hòa': <FaSnowflake />,
  'Bồn tắm': <FaBath />,
  'Bồn tắm sục': <FaBath />,
  'Bồn tắm đứng': <FaBath />,
  'Jacuzzi': <FaBath />,
  'Bể sục riêng': <FaBath />,
  'Dịch vụ phòng 24/7': <FaConciergeBell />,
  'Butler riêng': <FaConciergeBell />,
  'Butler & Chef riêng': <FaConciergeBell />,
  'Đưa đón sân bay': <FaConciergeBell />,
  'Phòng khách riêng': <FaExpand />,
  '2 Phòng ngủ': <FaBed />,
  'Khu vui chơi trẻ em': <FaUsers />,
};

const AccommodationsPage = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ background: '#0B1120', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>

      {/* ─── HERO ─── */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(11,17,32,0.6), rgba(11,17,32,0.85)), url('/slide3.jpg')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: '100px 0 80px', textAlign: 'center', color: '#fff',
        marginTop: '-100px', paddingTop: '180px',
      }}>
        <Container>
          <p style={{ letterSpacing: '5px', fontSize: '0.8rem', color: '#C5A059', textTransform: 'uppercase', marginBottom: '16px' }}>
            ✦ AURELIA GRAND HOTEL ✦
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, marginBottom: '20px', lineHeight: 1.15 }}>
            Chỗ Ở <span style={{ color: '#C5A059' }}>Đẳng Cấp</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#bbb', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Từ Phòng Deluxe tinh tế đến Presidential Suite huyền thoại — mỗi không gian là một tác phẩm nghệ thuật sống động.
          </p>
        </Container>
      </div>

      {/* ─── ROOM CARDS ─── */}
      <Container style={{ marginTop: '80px' }}>
        <Row className="g-5">
          {rooms.map((room) => (
            <Col lg={6} key={room.id}>
              <div
                onMouseEnter={() => setHovered(room.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${hovered === room.id ? '#C5A059' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'all 0.4s ease',
                  transform: hovered === room.id ? 'translateY(-6px)' : 'translateY(0)',
                  boxShadow: hovered === room.id ? '0 20px 50px rgba(197,160,89,0.15)' : '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                  <img
                    src={room.img}
                    alt={room.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transform: hovered === room.id ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.6s ease',
                    }}
                    onError={e => { e.target.onerror = null; e.target.src = '/slide1.jpg'; }}
                  />
                  {/* Badge */}
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: room.badgeColor, color: '#fff',
                    padding: '4px 14px', fontSize: '0.72rem',
                    letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600,
                    borderRadius: '2px',
                  }}>
                    {room.badge}
                  </div>
                  {/* Price overlay */}
                  <div style={{
                    position: 'absolute', bottom: '16px', right: '16px',
                    background: 'rgba(11,17,32,0.85)', backdropFilter: 'blur(8px)',
                    padding: '8px 18px', borderRadius: '2px',
                    border: '1px solid rgba(197,160,89,0.4)',
                  }}>
                    <span style={{ color: '#C5A059', fontWeight: 700, fontSize: '1.1rem' }}>
                      {room.price}₫
                    </span>
                    <span style={{ color: '#999', fontSize: '0.75rem', display: 'block', textAlign: 'right' }}>/ đêm</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '28px 28px 32px' }}>
                  {/* Meta */}
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '12px' }}>
                    {[
                      { icon: <FaExpand />, text: room.size },
                      { icon: <FaUsers />, text: `${room.guests} khách` },
                      { icon: <FaEye />, text: room.view },
                    ].map((m, i) => (
                      <span key={i} style={{ color: '#C5A059', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {m.icon} <span style={{ color: '#999' }}>{m.text}</span>
                      </span>
                    ))}
                  </div>

                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.7rem', fontWeight: 700, marginBottom: '8px' }}>
                    {room.nameVi}
                  </h3>
                  <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px' }}>
                    {room.desc}
                  </p>

                  {/* Amenities */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                    {room.amenities.map((a, i) => (
                      <span key={i} style={{
                        background: 'rgba(197,160,89,0.1)',
                        border: '1px solid rgba(197,160,89,0.25)',
                        color: '#C5A059', fontSize: '0.75rem',
                        padding: '4px 10px', borderRadius: '2px',
                        display: 'flex', alignItems: 'center', gap: '5px',
                      }}>
                        {amenityIcons[a] || <FaBed />} {a}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Link
                      to="/bookings"
                      style={{
                        flex: 1, display: 'block', textAlign: 'center',
                        background: 'linear-gradient(135deg, #C5A059, #A07840)',
                        color: '#fff', padding: '12px 0',
                        textDecoration: 'none', fontWeight: 700,
                        fontSize: '0.85rem', letterSpacing: '1.5px',
                        textTransform: 'uppercase', borderRadius: '2px',
                        transition: 'opacity 0.3s',
                      }}
                    >
                      Đặt Phòng Ngay
                    </Link>
                    <button style={{
                      flex: 1, background: 'transparent',
                      border: '1px solid rgba(197,160,89,0.4)',
                      color: '#C5A059', padding: '12px 0',
                      fontWeight: 600, fontSize: '0.85rem',
                      letterSpacing: '1.5px', textTransform: 'uppercase',
                      borderRadius: '2px', cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}>
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* ─── POLICY STRIP ─── */}
        <div style={{
          marginTop: '80px', padding: '40px',
          border: '1px solid rgba(197,160,89,0.2)',
          background: 'rgba(197,160,89,0.04)',
          borderRadius: '4px',
        }}>
          <Row className="text-center g-4">
            {[
              { icon: '🛎️', title: 'Nhận phòng & Trả phòng', desc: 'Nhận phòng từ 14:00 — Trả phòng trước 12:00' },
              { icon: '🐾', title: 'Thú cưng', desc: 'Không cho phép mang thú cưng' },
              { icon: '🚭', title: 'Hút thuốc', desc: 'Khu vực cấm hút thuốc hoàn toàn' },
              { icon: '💳', title: 'Thanh toán', desc: 'Chấp nhận thẻ Visa, Mastercard & VNPay' },
            ].map((p, i) => (
              <Col md={3} key={i}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{p.icon}</div>
                <h6 style={{ color: '#C5A059', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{p.title}</h6>
                <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: 0 }}>{p.desc}</p>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default AccommodationsPage;
