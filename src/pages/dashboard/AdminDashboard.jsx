import { useMemo } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaBed, FaUserFriends, FaMoneyBillWave, FaConciergeBell } from 'react-icons/fa';
import { useApp } from '../../contexts/AppContext';
import { calculateOccupancy, calculateRevenue, generateMonthlyRevenue } from '../../utils/algorithms';
import { formatCurrency } from '../../utils/formatters';
import StatsCard from '../../components/common/StatsCard';
import RevenueChart from '../../components/charts/RevenueChart';
import OccupancyChart from '../../components/charts/OccupancyChart';

const AdminDashboard = () => {
  const { rooms, bookings, customers, services } = useApp();

  const stats = useMemo(() => {
    const occupancy = calculateOccupancy(rooms);
    const revenue = calculateRevenue(bookings, 'month');
    
    return {
      totalRevenue: revenue.total,
      occupancyRate: occupancy.rate,
      totalCustomers: customers.length,
      activeRooms: occupancy.occupied + occupancy.booked,
      totalRooms: occupancy.total
    };
  }, [rooms, bookings, customers]);

  const monthlyData = useMemo(() => generateMonthlyRevenue(bookings), [bookings]);

  return (
    <div>
      <h2 className="page-title mb-4">Tổng quan hệ thống (Admin)</h2>

      <Row className="g-4 mb-4">
        <Col md={6} xl={3}>
          <StatsCard 
            title="Doanh thu tháng này" 
            value={formatCurrency(stats.totalRevenue)}
            icon={<FaMoneyBillWave />}
            color="success"
            trend="up"
            trendValue={12.5}
          />
        </Col>
        <Col md={6} xl={3}>
          <StatsCard 
            title="Công suất phòng" 
            value={`${stats.occupancyRate}%`}
            icon={<FaBed />}
            color="primary"
            trend="up"
            trendValue={5.2}
          />
        </Col>
        <Col md={6} xl={3}>
          <StatsCard 
            title="Tổng khách hàng" 
            value={stats.totalCustomers}
            icon={<FaUserFriends />}
            color="warning"
            trend="up"
            trendValue={8.4}
          />
        </Col>
        <Col md={6} xl={3}>
          <StatsCard 
            title="Phòng đang sử dụng" 
            value={`${stats.activeRooms} / ${stats.totalRooms}`}
            icon={<FaConciergeBell />}
            color="info"
          />
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="hotel-card border-0 h-100">
            <Card.Body>
              <h5 className="mb-4 fw-bold">Biểu đồ doanh thu 12 tháng</h5>
              <RevenueChart data={monthlyData} />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="hotel-card border-0 h-100">
            <Card.Body>
              <h5 className="mb-4 fw-bold">Trạng thái phòng hiện tại</h5>
              <OccupancyChart rooms={rooms} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
