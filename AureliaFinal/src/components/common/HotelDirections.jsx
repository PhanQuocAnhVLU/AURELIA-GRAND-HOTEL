import { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaLocationArrow, FaCar, FaMotorcycle, FaWalking, FaTimes, FaDirections } from 'react-icons/fa';
import { SiGooglemaps, SiWaze } from 'react-icons/si';

// Tọa độ khách sạn Aurelia Grand Hotel - Tây Sơn, Tân Phú
const HOTEL = {
  lat: 10.7717,
  lng: 106.6281,
  name: 'Aurelia Grand Hotel',
  address: 'Đường Tây Sơn, Quận Tân Phú, TP. Hồ Chí Minh',
};

const toRad = (v) => (v * Math.PI) / 180;
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function HotelDirections() {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const userMarker = useRef(null);
  const polyline = useRef(null);

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [userPos, setUserPos] = useState(null);
  const [distance, setDistance] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Load Leaflet CSS + JS động
  useEffect(() => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, []);

  // Khởi tạo bản đồ sau khi mount
  useEffect(() => {
    let L;
    let cancelled = false;

    const initMap = async () => {
      if (!mapRef.current || leafletMap.current) return;

      // Load Leaflet
      if (!window.L) {
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          s.onload = res;
          s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      if (cancelled) return;
      L = window.L;

      const map = L.map(mapRef.current, {
        center: [HOTEL.lat, HOTEL.lng],
        zoom: 15,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Marker khách sạn
      const hotelIcon = L.divIcon({
        html: `<div style="
          background:#C5A059;width:36px;height:36px;border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);border:3px solid #fff;
          box-shadow:0 3px 12px rgba(0,0,0,0.4);
          display:flex;align-items:center;justify-content:center;
        "><span style="transform:rotate(45deg);font-size:16px;">🏨</span></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        className: '',
      });

      L.marker([HOTEL.lat, HOTEL.lng], { icon: hotelIcon })
        .addTo(map)
        .bindPopup(`<b style="color:#C5A059">${HOTEL.name}</b><br/><span style="font-size:0.8rem">${HOTEL.address}</span>`)
        .openPopup();

      leafletMap.current = map;
    };

    initMap();
    return () => { cancelled = true; };
  }, []);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Trình duyệt không hỗ trợ định vị.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setUserPos({ lat, lng });

        const dist = haversine(lat, lng, HOTEL.lat, HOTEL.lng);
        setDistance(dist);
        setStatus('success');

        const L = window.L;
        if (!L || !leafletMap.current) return;

        // Xoá marker/polyline cũ
        if (userMarker.current) userMarker.current.remove();
        if (polyline.current) polyline.current.remove();

        // Marker vị trí user
        const userIcon = L.divIcon({
          html: `<div style="
            background:#2563eb;width:14px;height:14px;border-radius:50%;
            border:3px solid #fff;box-shadow:0 0 0 4px rgba(37,99,235,0.3);
          "></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
          className: '',
        });

        userMarker.current = L.marker([lat, lng], { icon: userIcon })
          .addTo(leafletMap.current)
          .bindPopup('<b>Vị trí của bạn</b>');

        // Vẽ đường nối
        polyline.current = L.polyline(
          [[lat, lng], [HOTEL.lat, HOTEL.lng]],
          { color: '#C5A059', weight: 3, dashArray: '8 6', opacity: 0.85 }
        ).addTo(leafletMap.current);

        // Zoom vừa cả 2 điểm
        leafletMap.current.fitBounds(
          [[lat, lng], [HOTEL.lat, HOTEL.lng]],
          { padding: [60, 60] }
        );
      },
      (err) => {
        const msgs = {
          1: 'Bạn đã từ chối quyền truy cập vị trí. Vui lòng cho phép trong cài đặt trình duyệt.',
          2: 'Không thể xác định vị trí. Vui lòng thử lại.',
          3: 'Quá thời gian chờ. Vui lòng thử lại.',
        };
        setErrorMsg(msgs[err.code] || 'Lỗi không xác định.');
        setStatus('error');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const openGoogleMaps = () => {
    const dest = `${HOTEL.lat},${HOTEL.lng}`;
    const url = userPos
      ? `https://www.google.com/maps/dir/${userPos.lat},${userPos.lng}/${dest}`
      : `https://www.google.com/maps/search/?api=1&query=${dest}`;
    window.open(url, '_blank');
  };

  const openWaze = () => {
    window.open(`https://waze.com/ul?ll=${HOTEL.lat},${HOTEL.lng}&navigate=yes`, '_blank');
  };

  const formatDist = (d) => d < 1 ? `${Math.round(d * 1000)} m` : `${d.toFixed(1)} km`;
  const walkTime = (d) => Math.round(d * 12);
  const carTime = (d) => Math.round(d * 2.5);
  const motoTime = (d) => Math.round(d * 3.5);

  return (
    <div>
      {/* Map container */}
      <div style={{
        borderRadius: '4px', overflow: 'hidden',
        border: '1px solid rgba(197,160,89,0.2)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
        position: 'relative',
      }}>
        <div ref={mapRef} style={{ width: '100%', height: '420px' }} />

        {/* Nút định vị đè lên map */}
        <button
          onClick={handleLocate}
          disabled={status === 'loading'}
          style={{
            position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
            zIndex: 1000,
            background: status === 'loading' ? '#888' : '#C5A059',
            color: '#fff', border: 'none',
            padding: '10px 22px', borderRadius: '2px',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.85rem', fontWeight: 700,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            cursor: status === 'loading' ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.background = '#a07840'; }}
          onMouseLeave={e => { if (status !== 'loading') e.currentTarget.style.background = '#C5A059'; }}
        >
          <FaLocationArrow size={13} />
          {status === 'loading' ? 'Đang định vị...' : 'Xem vị trí của tôi'}
        </button>
      </div>

      {/* Kết quả khoảng cách */}
      {status === 'success' && distance !== null && (
        <div style={{
          background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.25)',
          borderRadius: '4px', padding: '20px 24px', marginTop: '16px',
          display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Khoảng cách + thời gian */}
          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#C5A059', fontFamily: "'Cormorant Garamond', serif" }}>
                {formatDist(distance)}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Từ vị trí bạn
              </div>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
            {[
              { icon: <FaCar />, label: 'Ô tô', time: carTime(distance) },
              { icon: <FaMotorcycle />, label: 'Xe máy', time: motoTime(distance) },
              { icon: <FaWalking />, label: 'Đi bộ', time: walkTime(distance) },
            ].map(({ icon, label, time }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ color: '#C5A059', marginBottom: '4px', fontSize: '1rem' }}>{icon}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>~{time} phút</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Nút mở app chỉ đường */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={openGoogleMaps} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: '#fff', color: '#222', border: 'none',
              padding: '9px 16px', borderRadius: '2px', cursor: 'pointer',
              fontSize: '0.8rem', fontWeight: 600,
            }}>
              <SiGooglemaps color="#4285F4" size={16} /> Google Maps
            </button>
            <button onClick={openWaze} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: '#05C8F7', color: '#fff', border: 'none',
              padding: '9px 16px', borderRadius: '2px', cursor: 'pointer',
              fontSize: '0.8rem', fontWeight: 600,
            }}>
              <SiWaze size={16} /> Waze
            </button>
          </div>
        </div>
      )}

      {/* Lỗi */}
      {status === 'error' && (
        <div style={{
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '4px', padding: '12px 16px', marginTop: '12px',
          color: '#fca5a5', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <FaTimes /> {errorMsg}
        </div>
      )}
    </div>
  );
}
