// src/Pages/Cuti/cuti.jsx

import React, { useState } from 'react';
import './cuti.css'; 

// Data Cuti Simulasi
const MOCK_LEAVE_REQUESTS = [
  { id: 1, nama: 'Budi Santoso', jenis: 'Tahunan', mulai: '2025-01-15', akhir: '2025-01-17', hari: 3, status: 'Disetujui' },
  { id: 2, nama: 'Ahmad Fauzi', jenis: 'Sakit', mulai: '2025-02-01', akhir: '2025-02-01', hari: 1, status: 'Menunggu' },
  { id: 3, nama: 'Siti Rahayu', jenis: 'Penting', mulai: '2025-03-10', akhir: '2025-03-12', hari: 3, status: 'Ditolak' },
  { id: 4, nama: 'Candra Wijaya', jenis: 'Tahunan', mulai: '2025-04-05', akhir: '2025-04-10', hari: 6, status: 'Disetujui' },
];

const Cuti = () => {
  const [requests, setRequests] = useState(MOCK_LEAVE_REQUESTS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = requests.filter(req =>
    req.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.jenis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cuti-page-wrapper"> 
      
      <header className="page-header">
        <div>
            <h1>Pengajuan Cuti</h1>
            <p className="page-subtitle">Kelola pengajuan cuti dan lihat riwayat status cuti Anda.</p>
        </div>
        <button className="btn-primary">
          + Ajukan Cuti Baru
        </button>
      </header>

      <div className="cuti-controls">
        <input 
          type="text" 
          placeholder="Cari nama atau status cuti..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="cuti-table-container dashboard-card">
        <table className="cuti-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Karyawan</th>
              <th>Jenis Cuti</th>
              <th>Tanggal Mulai</th>
              <th>Tanggal Akhir</th>
              <th>Jml. Hari</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.nama}</td>
                  <td>{req.jenis}</td>
                  <td>{req.mulai}</td>
                  <td>{req.akhir}</td>
                  <td>{req.hari}</td>
                  <td>
                    <span className={`status-badge status-${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action view">Detail</button>
                    {req.status === 'Menunggu' && (
                        <button className="btn-action cancel">Batal</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-state">Tidak ada riwayat pengajuan cuti.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

// PENTING: Pastikan ini ada agar tidak terjadi error "does not provide an export named 'default'"
export default Cuti;