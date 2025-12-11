// src/Pages/Index/Index.jsx

import React from 'react';
import './Index.css';
import StatCard, { Users, UserPlus, CalendarOff, Clock } from '../../Components/Card/Card'; 


// --- PLACEHOLDER HOOKS ---

const useAuth = () => ({
  user: {
    user_metadata: { full_name: 'Faris Mubarok' },
    email: 'faris.mubarok@example.com'
  }
});

const useDashboardStats = () => ({
  data: {
    totalEmployees: 450,
    newThisMonth: 12,
    onLeave: 5,
    pendingApprovals: 8
  },
  isLoading: false
});

// --- PLACEHOLDER COMPONENTS ---

const EmployeeChart = () => (
    <div className="chart-container dashboard-card">
        <h3>Jumlah Karyawan Per Divisi</h3>
        <p className="subtitle">Total karyawan di setiap departemen</p>
        <div className="placeholder-content placeholder-chart">
            <p>Belum ada data karyawan (Chart)</p>
        </div>
    </div>
);

const RecentActivity = () => {
    const activities = [
        { description: 'Karyawan baru bergabung - Ahmad Fauzi - Divisi IT', time: '5 menit lalu' },
        { description: 'Pengajuan cuti disetujui - Siti Rahayu - 3 hari cuti', time: '1 jam lalu' },
        { description: 'Dokumen kontrak diperbaharui - Budi Santoso - Perpanjangan kontrak', time: '2 jam lalu' },
        { description: 'Evaluasi kinerja selesai - Divisi Marketing - Q4 2024', time: '3 jam lalu' },
    ];

    return (
        <div className="activity-card dashboard-card">
            <h3>Aktivitas Terbaru</h3>
            <p className="subtitle">Update terkini dari sistem</p>
            <div className="activity-list">
                {activities.map((activity, index) => (
                    <div key={index} className="activity-list-item">
                        <div className="activity-description">
                            {activity.description}
                        </div>
                        <span className="activity-time">{activity.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const UpcomingLeave = () => (
    <div className="schedule-card dashboard-card">
        <h3>Jadwal Cuti Mendatang</h3>
        <p className="subtitle">Rencana cuti minggu ini</p>
        
        <table className="table-cuti">
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Tanggal</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan="3" className="empty-state">Tidak ada jadwal cuti mendatang</td>
                </tr>
            </tbody>
        </table>
    </div>
);

// --- KOMPONEN UTAMA INDEX ---

const Index = () => {
  const { user } = useAuth();
  const { data: stats, isLoading } = useDashboardStats();

  const mockStats = {
    totalEmployees: 0,
    newThisMonth: 0,
    onLeave: 0,
    pendingApprovals: 0
  };

  const currentStats = isLoading ? mockStats : stats;
  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Admin";

  return (
    <div className="page-container">
      <header className="page-top">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">{`Selamat datang kembali, ${userName}`}</p>
        </div>
      </header>

      <div className="page-content">
        <div className="stats-grid">
          <StatCard
            title="Total Karyawan"
            value={isLoading ? "..." : currentStats.totalEmployees}
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Karyawan Baru Bulan Ini"
            value={isLoading ? "..." : currentStats.newThisMonth}
            icon={UserPlus}
            variant="success"
          />
          <StatCard
            title="Sedang Cuti"
            value={isLoading ? "..." : currentStats.onLeave}
            icon={CalendarOff}
            variant="info"
          />
          <StatCard
            title="Menunggu Persetujuan"
            value={isLoading ? "..." : currentStats.pendingApprovals}
            icon={Clock}
            variant="warning"
          />
        </div>

        <div className="charts-row">
          <div className="employee-chart-area">
            <EmployeeChart />
          </div>
          <RecentActivity />
        </div>

        <UpcomingLeave />
      </div>
    </div>
  );
};

export default Index;