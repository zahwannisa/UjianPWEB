import React from 'react';
import './Card.css';

// 1. IMPORT IKON DARI REACT-ICONS
// Kita ambil ikon yang sesuai dari 'react-icons/io5'

import { 
  IoPersonAddSharp, 
  IoPeopleSharp, 
  IoTimeSharp, 
  IoCalendarNumberSharp 
} from "react-icons/io5";

// --- PENGGANTI PLACEHOLDER ---
// Sekarang variabel ini mengembalikan komponen React Icon langsung.
// Kita menggunakan props (...props) agar class CSS dari parent bisa masuk ke ikon.

const Users = (props) => <IoPeopleSharp {...props} />;
const UserPlus = (props) => <IoPersonAddSharp {...props} />;

// Catatan: Jika ingin ikon "Calendar Off" spesifik, mungkin perlu cari di set lain (misal 'lu' atau 'tb'), 
// tapi di sini saya pakai CalendarNumber sebagai contoh dari io5.

const CalendarOff = (props) => <IoCalendarNumberSharp {...props} />; 
const Clock = (props) => <IoTimeSharp {...props} />;

/**
 * Komponen StatCard untuk menampilkan ringkasan data statistik di Dashboard.
 * @param {string} title - Judul kartu
 * @param {string|number} value - Nilai statistik
 * @param {React.ElementType} icon - Komponen ikon (dikirim sebagai referensi komponen, bukan elemen < />)
 * @param {('primary'|'success'|'info'|'warning')} variant - Varian warna
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
        {/* Render ikon di sini. 
           Kita bisa menambahkan props default seperti size jika perlu.
           ClassName 'stat-card__icon' akan diteruskan ke komponen ikon di atas via {...props}
        */}
        {Icon && <Icon className="stat-card__icon" size={24} />}
      </div>
    </div>
  );
};

export default StatCard;

// Export ikon-ikon ini agar bisa di-import di Index.jsx / Dashboard
export { Users, UserPlus, CalendarOff, Clock };