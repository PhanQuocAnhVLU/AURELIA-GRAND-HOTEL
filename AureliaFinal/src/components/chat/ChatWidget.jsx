import { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

const HOTEL_CONTEXT = `Bạn là Aurelia Concierge - trợ lý tư vấn của Aurelia Grand Hotel. Hãy trả lời thân thiện, chuyên nghiệp bằng tiếng Việt. Không dùng markdown bold (**). Trả lời ngắn gọn, tối đa 6 dòng.

=== DỊCH VỤ ===
1. Nhà hàng Fine Dining - 500.000đ/người/bữa - Ẩm thực quốc tế & Việt Nam cao cấp, đầu bếp 5 sao. Đánh giá: 4.8★
2. Spa & Wellness - 800.000đ/giờ - Massage trị liệu, chăm sóc sắc đẹp toàn diện. Đánh giá: 4.9★
3. Hồ bơi vô cực - 200.000đ/ngày - Tầng thượng, view thành phố, jacuzzi, khu nằm nghỉ. Đánh giá: 4.7★
4. Gym & Fitness Center - 150.000đ/ngày - Thiết bị hiện đại, huấn luyện viên cá nhân, lớp yoga. Đánh giá: 4.6★
5. Giặt ủi cao cấp - 100.000đ/lần - Nhanh chóng, cẩn thận. Đánh giá: 4.5★
6. Room Service 24/7 - 50.000đ/lần - Thực đơn đầy đủ, phục vụ tận phòng. Đánh giá: 4.7★
7. Đưa đón sân bay - 350.000đ/lượt - Xe hạng thương gia, lái xe riêng. Đánh giá: 4.9★

=== PHÒNG NGHỈ ===
Standard (Tầng 1): 800.000 - 950.000đ/đêm, 25-30m², 2-3 người, Wi-Fi, TV, điều hòa, minibar
Deluxe (Tầng 2): 1.500.000 - 1.800.000đ/đêm, 35-40m², TV 4K, bồn tắm, ban công riêng
Executive (Tầng 3): 2.500.000 - 2.800.000đ/đêm, 55-65m², phòng khách riêng, jacuzzi, view panorama
Suite (Tầng 4): 4.800.000 - 6.000.000đ/đêm, 85-120m², phòng khách+ăn, bếp, jacuzzi riêng
Presidential Suite (Tầng 5): 12.000.000 - 15.000.000đ/đêm, 350-500m², hồ bơi riêng, butler 24/7, gym riêng

Nếu khách hỏi về đặt phòng/dịch vụ, hãy gợi ý liên hệ lễ tân hoặc dùng nút đặt phòng trên website.`;

const SUGGESTIONS = [
  'Có những dịch vụ gì?',
  'Giá phòng Suite bao nhiêu?',
  'Dịch vụ spa như thế nào?',
  'Có hồ bơi không?',
];

function getTime() {
  return new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Xin chào! Tôi là Aurelia Concierge.\nTôi có thể tư vấn về phòng nghỉ, nhà hàng, spa, hồ bơi và các dịch vụ khác.\nQuý khách cần hỗ trợ gì ạ?',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [open, messages]);

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setInput('');
    setShowSuggestions(false);
    setLoading(true);

    const userMsg = { role: 'user', text: msg, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);

    const newHistory = [...history, { role: 'user', content: msg }];
    setHistory(newHistory);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: HOTEL_CONTEXT,
          messages: newHistory,
        }),
      });
      const data = await res.json();
      if (data.error) {
        const botMsg = { role: 'bot', text: `Lỗi: ${data.error}`, time: getTime() };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const reply = data.content?.[0]?.text || 'Xin lỗi, tôi chưa hiểu câu hỏi. Quý khách vui lòng hỏi lại nhé!';
        const botMsg = { role: 'bot', text: reply, time: getTime() };
        setMessages((prev) => [...prev, botMsg]);
        setHistory((prev) => [...prev, { role: 'assistant', content: reply }]);
        if (!open) setUnread((n) => n + 1);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: `Lỗi kết nối: ${err.message}`, time: getTime() },
      ]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        className="chat-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Mở hỗ trợ tư vấn"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
        {!open && unread > 0 && <span className="chat-badge">{unread}</span>}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel" role="dialog" aria-label="Aurelia Concierge chat">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-avatar-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="chat-header-info">
              <span className="chat-header-name">Aurelia Concierge</span>
              <span className="chat-header-status">
                <span className="status-dot" />
                Trực tuyến
              </span>
            </div>
            <button className="chat-close-btn" onClick={() => setOpen(false)} aria-label="Đóng">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div className="chat-bubble">
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>{line}{j < msg.text.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>
                <span className="chat-time">{msg.time}</span>
              </div>
            ))}

            {loading && (
              <div className="chat-msg bot">
                <div className="chat-bubble typing-bubble">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="chat-chip" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-wrap">
            <textarea
              ref={textareaRef}
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Nhập câu hỏi..."
              rows={1}
              disabled={loading}
            />
            <button
              className="chat-send-btn"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              aria-label="Gửi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
