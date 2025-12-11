// src/Components/Card/Card.jsx

import React from 'react';
import './Card.css'; 
// Import CSS khusus untuk Card

// --- PLACEHOLDER ICON COMPONENTS ---
// Ikon ini adalah pengganti untuk 'lucide-react' atau library ikon lainnya.
// Di Index.jsx, Anda akan mengimpor ikon yang sebenarnya dan melewatkannya.

const Users = () => <span className="icon-placeholder icon-users">&#128101;</span>;
const UserPlus = () => <span className="icon-placeholder icon-user-plus">&#128105;</span>;
const CalendarOff = () => <span className="icon-placeholder icon-calendar-off">&#9201;</span>;
const Clock = () => <span className="icon-placeholder icon-clock">&#128337;</span>;


/**
 * Komponen StatCard untuk menampilkan ringkasan data statistik di Dashboard.
 * * @param {string} title - Judul kartu (misal: Total Karyawan)
 * @param {string|number} value - Nilai statistik (misal: 450)
 * @param {React.Component} icon - Komponen ikon (misal: Users, Clock)
 * @param {('primary'|'success'|'info'|'warning')} variant - Varian warna untuk styling
 */
const StatCard = ({ title, value, icon: Icon, variant }) => {
  // Tentukan class CSS berdasarkan varian warna yang dipilih
  const variantClass = `stat-card stat-card--${variant}`;

  return (
    <div className={variantClass}>
      <div className="stat-card__content">
        <p className="stat-card__title">{title}</p>
        <h2 className="stat-card__value">{value}</h2>
      </div>
      <div className="stat-card__icon-wrapper">
        {/* Komponen ikon akan di-render di sini */}
        <Icon className="stat-card__icon" />
      </div>
    </div>
  );
};

export default StatCard;

// Export placeholder icon agar bisa digunakan untuk testing di Index.jsx
export { Users, UserPlus, CalendarOff, Clock };