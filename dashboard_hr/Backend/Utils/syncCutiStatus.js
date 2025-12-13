import db from '../Config/db.js';

// Fungsi untuk sync status karyawan berdasarkan tanggal cuti
export const syncCutiStatus = async () => {
  try {
    // 1. Set status 'Cuti' untuk karyawan yang cutinya sedang berlangsung
    //    (cuti disetujui, tanggal_mulai <= hari ini, tanggal_selesai >= hari ini)
    await db.query(`
      UPDATE tabel_karyawan k
      INNER JOIN tabel_cuti c ON k.id = c.id_karyawan
      SET k.status = 'Cuti'
      WHERE c.status = 'Disetujui'
        AND DATE(c.tanggal_mulai) <= CURDATE()
        AND DATE(c.tanggal_selesai) >= CURDATE()
    `);

    // 2. Set status 'Aktif' untuk karyawan yang cutinya sudah selesai atau belum mulai
    //    (status masih 'Cuti' tapi tidak ada cuti aktif hari ini)
    await db.query(`
      UPDATE tabel_karyawan k
      SET k.status = 'Aktif'
      WHERE k.status = 'Cuti'
        AND NOT EXISTS (
          SELECT 1 FROM tabel_cuti c
          WHERE c.id_karyawan = k.id
            AND c.status = 'Disetujui'
            AND DATE(c.tanggal_mulai) <= CURDATE()
            AND DATE(c.tanggal_selesai) >= CURDATE()
        )
    `);

    console.log('✅ Cuti status synced');
  } catch (error) {
    console.error('❌ Error syncing cuti status:', error);
  }
};
