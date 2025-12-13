import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import Routes
import karyawanRoutes from './Routes/karyawanRoutes.js';
import gajiRoutes from './Routes/gajiRoutes.js';
import divisiRoutes from './Routes/divisiRoutes.js';
import cutiRoutes from './Routes/cutiRoutes.js';
import adminRoutes from './Routes/adminRoutes.js';

// Import Utils
import { syncCutiStatus } from './Utils/syncCutiStatus.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Agar bisa baca JSON dari React

// Sync status cuti saat server start
syncCutiStatus();

// Sync status cuti setiap 1 menit (untuk production bisa tiap 1 jam)
setInterval(syncCutiStatus, 60 * 1000);

// API Routes
app.use('/api/karyawan', karyawanRoutes);
app.use('/api/gaji', gajiRoutes);
app.use('/api/divisi', divisiRoutes);
app.use('/api/cuti', cutiRoutes);
app.use('/api/admin', adminRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'HR Dashboard API',
    endpoints: {
      karyawan: '/api/karyawan',
      gaji: '/api/gaji',
      divisi: '/api/divisi',
      cuti: '/api/cuti',
      admin: '/api/admin'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));