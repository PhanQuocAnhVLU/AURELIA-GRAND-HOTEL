import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTag, FaClock, FaCalendarAlt, FaGift, FaPercent, FaStar, FaCrown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const offers = [
  {
    id: 1,
    tag: 'Ưu đãi đặc biệt',
    tagColor: '#C5A059',
    title: 'Gói Tuần Trăng Mật Aurelia',
    subtitle: 'Romance Package',
    discount: '-30%',
    originalPrice: '8.000.000₫',
    salePrice: '5.600.000₫',
    validity: '31/12/2026',
    img: '/room2.jpg',
    desc: 'Kỳ nghỉ tuần trăng mật hoàn hảo tại Aurelia Grand Hotel. Trọn gói bao gồm 2 đêm Suite, bữa sáng đôi tại Le Jardin, trang trí phòng bằng hoa hồng, bồn tắm cánh hoa và 1 buổi massage đôi tại Aurelia Spa.',
    includes: ['2 đêm Executive Suite', 'Bữa sáng đôi mỗi ngày', 'Trang trí phòng hoa hồng', 'Massage đôi 90 phút', 'Rượu vang & chocolate', 'Late checkout 14:00'],
    highlight: true,
  },
  {
    id: 2,
    tag: 'Sớm lên kế hoạch',
    tagColor: '#1E3A5F',
    title: 'Đặt Sớm Giảm Sâu',
    subtitle: 'Early Bird Offer',
    discount: '-25%',
    originalPrice: '4.500.000₫',
    salePrice: '3.375.000₫',
    validity: '30/11/2026',
    img: '/room1.jpg',
    desc: 'Đặt phòng trước ít nhất 30 ngày để nhận ngay mức giá ưu đãi tốt nhất. Áp dụng cho tất cả loại phòng từ Deluxe đến Presidential Suite.',
    includes: ['Giảm 25% giá phòng', 'Bữa sáng miễn phí', 'WiFi cao cấp', 'Đổi ngày miễn phí 1 lần', 'Late checkout 13:00'],
    highlight: false,
  },
  {
    id: 3,
    tag: 'Ưu đãi cuối tuần',
    tagColor: '#7B3F00',
    title: 'Nghỉ Dưỡng Cuối Tuần',
    subtitle: 'Weekend Escape',
    discount: '-20%',
    originalPrice: '3.800.000₫',
    salePrice: '3.040.000₫',
    validity: '31/12/2026',
    img: '/slide3.jpg',
    desc: 'Gói nghỉ dưỡng 2 đêm cuối tuần với nhiều đặc quyền độc đáo: sử dụng hồ bơi vô cực, phòng gym và tặng kèm 1 buổi chăm sóc da mặt tại spa.',
    includes: ['Phòng Deluxe 2 đêm', 'Bữa sáng buffet', 'Hồ bơi & Gym', 'Chăm sóc da mặt 60ph', 'Minibar miễn phí', 'Welcome drink'],
    highlight: false,
  },
  {
    id: 4,
    tag: 'Thành viên VIP',
    tagColor: '#B8860B',
    title: 'Ưu Đãi Thành Viên Vàng',
    subtitle: 'Aurelia Gold Member',
    discount: '-15%',
    originalPrice: null,
    salePrice: 'Suốt năm',
    validity: 'Thường xuyên',
    img: '/slide1.jpg',
    desc: 'Trở thành thành viên Aurelia Gold để nhận ưu đãi 15% mọi dịch vụ quanh năm, tích điểm đổi đêm miễn phí, ưu tiên check-in và nhiều quyền lợi độc quyền khác.',
    includes: ['Giảm 15% mọi dịch vụ', 'Tích điểm đổi đêm', 'Priority check-in', 'Tặng đêm sinh nhật', 'Upgrade phòng miễn phí', 'Concierge riêng'],
    highlight: false,
  },
  {
    id: 5,
    tag: 'Hội nghị & Sự kiện',
    tagColor: '#2E7D32',
    title: 'Gói MICE Doanh Nghiệp',
    subtitle: 'Corporate MICE Package',
    discount: 'Liên hệ',
    originalPrice: null,
    salePrice: 'Từ 50 khách',
    validity: 'Quanh năm',
    img: '/slide5.jpg',
    desc: 'Giải pháp tổ chức hội nghị, hội thảo, tiệc công ty và sự kiện doanh nghiệp chuyên nghiệp. Phòng họp hiện đại từ 20–500 người, đội ngũ event planner tận tâm.',
    includes: ['Phòng họp đầy đủ AV', 'Catering cao cấp', 'Event planner riêng', 'Giá phòng ưu đãi', 'Đưa đón đoàn', 'Gala dinner tùy chỉnh'],
    highlight: false,
  },
  {
    id: 6,
    tag: 'Hè rực rỡ',
    tagColor: '#E65100',
    title: 'Hè Vàng Aurelia 2026',
    subtitle: 'Golden Summer 2026',
    discount: '-35%',
    originalPrice: '6.000.000₫',
    salePrice: '3.900.000₫',
    validity: '31/08/2026',
    img: '/slide2.jpg',
    desc: 'Gói hè đặc biệt cho gia đình với nhiều hoạt động vui chơi cho trẻ em, hồ bơi trẻ em, chương trình kids club và bữa ăn miễn phí cho trẻ dưới 12 tuổi.',
    includes: ['Phòng gia đình 3 đêm', 'Bữa ăn trẻ em miễn phí', 'Kids Club hoạt động', 'Hồ bơi trẻ em', 'Tour thành phố gia đình', 'Welcome gift cho bé'],
    highlight: false,
  },
];

const OffersPage = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ background: '#0B1120', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* ─── HERO ─── */}
      <div style={{
        backgroundImage: `linear-gradient(rgba(11,17,32,0.55), rgba(11,17,32,0.9)), url('/slide4.jpg')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: '180px 0 100px', textAlign: 'center', color: '#fff',
      }}>
        <Container>
          <p style={{ letterSpacing: '5px', fontSize: '0.8rem', color: '#C5A059', textTransform: 'uppercase', marginBottom: '16px' }}>
            ✦ ĐẶC QUYỀN DÀNH CHO BẠN ✦
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, marginBottom: '20px', lineHeight: 1.15 }}>
            Ưu Đãi <span style={{ color: '#C5A059' }}>Độc Quyền</span>
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: '#bbb', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Khám phá các gói ưu đãi được thiết kế riêng để mang đến cho bạn trải nghiệm 
            nghỉ dưỡng hoàn hảo với mức giá tốt nhất.
          </p>
        </Container>
      </div>

      {/* ─── FEATURED OFFER ─── */}
      <Container style={{ marginTop: '70px' }}>
        <div className="text-center mb-5">
          <p style={{ color: '#C5A059', letterSpacing: '4px', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <FaCrown style={{ marginRight: '8px' }} />Ưu Đãi Nổi Bật
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '2.8rem', fontWeight: 700 }}>
            Gói Đặc Biệt & Ưu Đãi
          </h2>
          <div style={{ width: '60px', height: '2px', background: '#C5A059', margin: '16px auto 0' }} />
        </div>

        {/* Featured large card */}
        <div style={{
          border: '1px solid rgba(197,160,89,0.4)', borderRadius: '4px',
          overflow: 'hidden', marginBottom: '40px',
          background: 'linear-gradient(135deg, rgba(197,160,89,0.08) 0%, rgba(30,58,95,0.12) 100%)',
          position: 'relative',
        }}>
          <Row className="g-0">
            <Col md={5} style={{ position: 'relative', minHeight: '420px' }}>
              <img
                src={offers[0].img}
                alt={offers[0].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                onError={e => { e.target.onerror = null; e.target.src = '/slide1.jpg'; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(11,17,32,0.4))' }} />
              <div style={{
                position: 'absolute', top: '24px', left: '24px',
                background: '#C5A059', color: '#fff',
                padding: '8px 20px', fontSize: '1.6rem', fontWeight: 900,
                letterSpacing: '1px', borderRadius: '2px',
              }}>
                {offers[0].discount}
              </div>
              <div style={{
                position: 'absolute', bottom: '24px', left: '24px',
                background: 'rgba(11,17,32,0.85)', backdropFilter: 'blur(8px)',
                padding: '10px 20px', borderRadius: '2px',
                border: '1px solid rgba(197,160,89,0.3)',
              }}>
                <div style={{ color: '#888', textDecoration: 'line-through', fontSize: '0.85rem' }}>{offers[0].originalPrice}</div>
                <div style={{ color: '#C5A059', fontWeight: 800, fontSize: '1.3rem' }}>{offers[0].salePrice}</div>
              </div>
            </Col>
            <Col md={7} style={{ padding: '50px 50px 50px 40px' }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(197,160,89,0.15)', border: '1px solid rgba(197,160,89,0.3)',
                color: '#C5A059', padding: '4px 16px', fontSize: '0.72rem',
                letterSpacing: '2px', textTransform: 'uppercase', borderRadius: '2px', marginBottom: '16px',
              }}>
                ⭐ {offers[0].tag}
              </div>
              <p style={{ color: '#C5A059', fontSize: '0.82rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>
                {offers[0].subtitle}
              </p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '2.4rem', fontWeight: 700, marginBottom: '16px' }}>
                {offers[0].title}
              </h2>
              <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: '24px', fontSize: '0.93rem' }}>
                {offers[0].desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {offers[0].includes.map((inc, i) => (
                  <span key={i} style={{
                    background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.25)',
                    color: '#ddd', fontSize: '0.8rem', padding: '5px 12px', borderRadius: '2px',
                  }}>
                    ✓ {inc}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '20px' }}>
                <span style={{ color: '#888', fontSize: '0.82rem' }}>
                  <FaCalendarAlt style={{ color: '#C5A059', marginRight: '6px' }} />
                  Có hiệu lực đến: <strong style={{ color: '#ccc' }}>{offers[0].validity}</strong>
                </span>
                <Link to="/login" style={{
                  background: 'linear-gradient(135deg, #C5A059, #A07840)',
                  color: '#fff', padding: '13px 36px', textDecoration: 'none',
                  fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1.5px',
                  textTransform: 'uppercase', borderRadius: '2px',
                }}>
                  Đặt Ngay
                </Link>
              </div>
            </Col>
          </Row>
        </div>

        {/* ─── OFFER CARDS GRID ─── */}
        <Row className="g-4">
          {offers.slice(1).map((offer) => (
            <Col md={6} lg={4} key={offer.id}>
              <div
                onMouseEnter={() => setHovered(offer.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  border: `1px solid ${hovered === offer.id ? '#C5A059' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '4px', overflow: 'hidden',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.4s ease',
                  transform: hovered === offer.id ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hovered === offer.id ? '0 16px 40px rgba(197,160,89,0.12)' : 'none',
                  height: '100%', display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={offer.img}
                    alt={offer.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transform: hovered === offer.id ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.6s ease',
                    }}
                    onError={e => { e.target.onerror = null; e.target.src = '/slide1.jpg'; }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,17,32,0.8) 0%, transparent 60%)' }} />
                  {/* Discount badge */}
                  <div style={{
                    position: 'absolute', top: '14px', right: '14px',
                    background: offer.tagColor, color: '#fff',
                    padding: '6px 14px', fontSize: '1.1rem', fontWeight: 900,
                    borderRadius: '2px',
                  }}>
                    {offer.discount}
                  </div>
                  <div style={{
                    position: 'absolute', top: '14px', left: '14px',
                    background: 'rgba(11,17,32,0.75)', backdropFilter: 'blur(6px)',
                    border: `1px solid ${offer.tagColor}`,
                    color: '#fff', padding: '3px 10px', fontSize: '0.68rem',
                    letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px',
                  }}>
                    {offer.tag}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ color: '#C5A059', fontSize: '0.75rem', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {offer.subtitle}
                  </p>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px' }}>
                    {offer.title}
                  </h4>
                  <p style={{ color: '#999', fontSize: '0.83rem', lineHeight: 1.7, marginBottom: '16px', flex: 1 }}>
                    {offer.desc.substring(0, 120)}...
                  </p>

                  {/* Includes */}
                  <div style={{ marginBottom: '18px' }}>
                    {offer.includes.slice(0, 3).map((inc, i) => (
                      <div key={i} style={{ color: '#aaa', fontSize: '0.78rem', marginBottom: '4px' }}>
                        <span style={{ color: '#C5A059', marginRight: '6px' }}>✓</span>{inc}
                      </div>
                    ))}
                    {offer.includes.length > 3 && (
                      <div style={{ color: '#C5A059', fontSize: '0.75rem', marginTop: '4px' }}>
                        +{offer.includes.length - 3} ưu đãi khác...
                      </div>
                    )}
                  </div>

                  {/* Price & CTA */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      {offer.originalPrice && (
                        <div style={{ color: '#666', textDecoration: 'line-through', fontSize: '0.8rem' }}>{offer.originalPrice}</div>
                      )}
                      <div style={{ color: '#C5A059', fontWeight: 700, fontSize: '1rem' }}>{offer.salePrice}</div>
                    </div>
                    <Link to="/login" style={{
                      background: hovered === offer.id ? 'linear-gradient(135deg, #C5A059, #A07840)' : 'transparent',
                      border: '1px solid rgba(197,160,89,0.4)',
                      color: hovered === offer.id ? '#fff' : '#C5A059',
                      padding: '8px 20px', textDecoration: 'none',
                      fontWeight: 600, fontSize: '0.78rem', letterSpacing: '1.5px',
                      textTransform: 'uppercase', borderRadius: '2px',
                      transition: 'all 0.3s',
                    }}>
                      Chi Tiết
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* ─── NEWSLETTER ─── */}
        <div style={{
          marginTop: '70px', padding: '50px 40px',
          background: 'linear-gradient(135deg, rgba(197,160,89,0.1) 0%, rgba(30,58,95,0.2) 100%)',
          border: '1px solid rgba(197,160,89,0.2)', borderRadius: '4px', textAlign: 'center',
        }}>
          <FaGift style={{ color: '#C5A059', fontSize: '2.5rem', marginBottom: '16px' }} />
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '2rem', fontWeight: 700, marginBottom: '10px' }}>
            Nhận Ưu Đãi Độc Quyền Qua Email
          </h3>
          <p style={{ color: '#999', marginBottom: '30px', fontSize: '0.9rem' }}>
            Đăng ký để nhận thông báo sớm nhất về các gói khuyến mãi đặc biệt và ưu đãi thành viên.
          </p>
          <div style={{ display: 'flex', maxWidth: '500px', margin: '0 auto', gap: '0' }}>
            <input
              type="email"
              placeholder="Nhập địa chỉ email của bạn..."
              style={{
                flex: 1, padding: '14px 20px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(197,160,89,0.3)',
                borderRight: 'none',
                color: '#fff', fontSize: '0.9rem',
                borderRadius: '2px 0 0 2px', outline: 'none',
              }}
            />
            <button 
              onClick={() => alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi những ưu đãi mới nhất qua email.')}
              style={{
              background: 'linear-gradient(135deg, #C5A059, #A07840)',
              border: 'none', color: '#fff',
              padding: '14px 28px', fontWeight: 700,
              fontSize: '0.82rem', letterSpacing: '1.5px',
              textTransform: 'uppercase', cursor: 'pointer',
              borderRadius: '0 2px 2px 0',
            }}>
              Đăng Ký
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OffersPage;
