import React, { useState, useEffect } from 'react';
import { useAddEmployee } from '../../Logic/tambahKaryawan';
import { fetchDivisi } from '../../utils/api';
import './TambahKaryawan.css';

const TambahKaryawan = ({ onClose, onSuccess }) => {
  const { step, formData, loading, handleChange, nextStep, prevStep, submitForm } = useAddEmployee(onClose, onSuccess);
  const [divisiList, setDivisiList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const divisiData = await fetchDivisi();
        setDivisiList(divisiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="wizard-container">
      {/* --- HEADER STEPPER --- */}
      <div className="stepper-header">
        <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
        <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
        <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
      </div>
      
      <div className="stepper-labels">
        <span className={step === 1 ? 'active-text' : ''}>Data Diri</span>
        <span className={step === 2 ? 'active-text' : ''}>Jabatan & Divisi</span>
        <span className={step === 3 ? 'active-text' : ''}>Gaji & Benefit</span>
      </div>

      <form onSubmit={step === 3 ? submitForm : (e) => { e.preventDefault(); nextStep(); }}>
        <div className="form-content">
          
          {/* --- STEP 1: DATA DIRI --- */}
          {step === 1 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Nama Lengkap <span className="text-red">*</span></label>
                <input name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} required placeholder="Masukkan nama lengkap" />
              </div>
              <div className="form-group">
                <label>Email <span className="text-red">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="nama@company.com" />
              </div>
              <div className="form-group">
                <label>No. Telepon <span className="text-red">*</span></label>
                <input name="no_telepon" value={formData.no_telepon} onChange={handleChange} required placeholder="0812-3456-7890" />
              </div>
              <div className="form-group">
                <label>Tanggal Masuk <span className="text-red">*</span></label>
                <input type="date" name="tanggal_masuk" value={formData.tanggal_masuk} onChange={handleChange} required />
              </div>
            </div>
          )}

          {/* --- STEP 2: JABATAN & DIVISI --- */}
          {step === 2 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Divisi <span className="text-red">*</span></label>
                <select name="id_divisi" value={formData.id_divisi} onChange={handleChange} required>
                  <option value="">Pilih Divisi</option>
                  {divisiList.map((div) => (
                    <option key={div.id} value={div.id}>{div.nama_divisi}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Jabatan <span className="text-red">*</span></label>
                <input name="jabatan" value={formData.jabatan} onChange={handleChange} required placeholder="Senior Staff" />
              </div>
              <div className="form-group full-width">
                <label>Status Karyawan <span className="text-red">*</span></label>
                <select name="status" value={formData.status} onChange={handleChange} required>
                  <option value="">Pilih Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>
          )}

          {/* --- STEP 3: GAJI & BENEFIT --- */}
          {step === 3 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Gaji Pokok <span className="text-red">*</span></label>
                <input type="number" name="gaji_pokok" value={formData.gaji_pokok} onChange={handleChange} required placeholder="6000000" min="0" />
              </div>
              <div className="form-group">
                <label>Tunjangan</label>
                <input type="number" name="tunjangan" value={formData.tunjangan} onChange={handleChange} placeholder="1000000" min="0" />
              </div>
              <div className="form-group">
                <label>Bonus</label>
                <input type="number" name="bonus" value={formData.bonus} onChange={handleChange} placeholder="0" min="0" />
              </div>
              
              <div className="summary-card full-width">
                <h4>Ringkasan Data Karyawan</h4>
                <div className="summary-grid">
                  <div><small>Nama:</small> <br/> <strong>{formData.nama_lengkap || '-'}</strong></div>
                  <div><small>Email:</small> <br/> <strong>{formData.email || '-'}</strong></div>
                  <div><small>Jabatan:</small> <br/> <strong>{formData.jabatan || '-'}</strong></div>
                  <div><small>Gaji Pokok:</small> <br/> <strong>{formData.gaji_pokok ? `Rp ${Number(formData.gaji_pokok).toLocaleString('id-ID')}` : '-'}</strong></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- FOOTER BUTTONS --- */}
        <div className="form-footer">
          {step === 1 ? (
            <button type="button" onClick={onClose} className="btn-outline">Batal</button>
          ) : (
            <button type="button" onClick={prevStep} className="btn-outline">Kembali</button>
          )}

          {step < 3 ? (
            <button type="submit" className="btn-solid">Lanjut ke Langkah {step + 1}</button>
          ) : (
            <button type="submit" className="btn-success" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan Karyawan'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TambahKaryawan;