import { Card } from 'react-bootstrap';

const StatsCard = ({ title, value, icon, color = "primary", trend, trendValue }) => {
  return (
    <Card className="hotel-card border-0 h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <p className="text-muted mb-1 fw-medium">{title}</p>
            <h3 className="mb-0 fw-bold">{value}</h3>
          </div>
          <div 
            className={`bg-${color} bg-opacity-10 text-${color} rounded d-flex align-items-center justify-content-center`}
            style={{ width: '48px', height: '48px', fontSize: '1.5rem' }}
          >
            {icon}
          </div>
        </div>
        
        {trend && (
          <div className="d-flex align-items-center">
            <span className={`badge bg-${trend === 'up' ? 'success' : 'danger'} bg-opacity-10 text-${trend === 'up' ? 'success' : 'danger'} me-2`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}%
            </span>
            <span className="text-muted small">so với tháng trước</span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default StatsCard;
