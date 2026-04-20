import React, { useState, useEffect } from 'react';
import { Upload, X, CheckCircle2, Eye, Download } from 'lucide-react';
import Pagination from '../components/Pagination';
import MedicalRecordModal from '../components/MedicalRecordModal';

/* ─── floating medical cross particle ─── */
const MedicalParticle = ({ style, size = 18, delay = 0 }) => (
  <div
    className="absolute pointer-events-none select-none"
    style={{
      ...style,
      animation: `floatParticle ${8 + delay}s ease-in-out ${delay}s infinite`,
      opacity: 0.12,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M10 2h4v8h8v4h-8v8h-4v-8H2v-4h8V2z" fill="currentColor" className="text-teal-400" />
    </svg>
  </div>
);

const MedicalRecords = () => {
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleUpload = (type) => {
    setToastMessage(`Uploading ${type}...`);
    setShowToast(true);
    setTimeout(() => {
      setToastMessage(`${type} uploaded successfully!`);
      setTimeout(() => setShowToast(false), 2000);
    }, 2000);
  };

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  /* ─── inline keyframes ─── */
  const keyframes = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

    @keyframes floatParticle {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25%  { transform: translateY(-30px) rotate(8deg); }
      50%  { transform: translateY(-15px) rotate(-5deg); }
      75%  { transform: translateY(-25px) rotate(3deg); }
    }

    @keyframes fadeInUp {
      0%   { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes shimmer {
      0%   { left: -100%; }
      100% { left: 100%; }
    }

    .records-page * { font-family: 'Inter', system-ui, sans-serif; }
  `;

  const particles = [
    { top: '15%', left: '8%', size: 18, delay: 0.5 },
    { top: '30%', right: '12%', size: 20, delay: 2 },
    { top: '65%', left: '5%', size: 16, delay: 3.5 },
    { top: '85%', right: '10%', size: 24, delay: 1 },
  ];

  const allRecords = [
    { id: 1, date: 'Oct 05, 2023', type: 'Lab Report', description: 'Complete Blood Count (CBC)', doctor: 'Dr. Sarah Smith', status: 'Available' },
    { id: 2, date: 'Sep 12, 2023', type: 'Vaccination', description: 'COVID-19 Booster Shot', doctor: 'Dr. James Wilson', status: 'Verified' },
    { id: 3, date: 'Aug 28, 2023', type: 'Imaging', description: 'Chest X-Ray', doctor: 'Dr. Michael Chen', status: 'Available' },
    { id: 4, date: 'Jul 10, 2023', type: 'Consultation', description: 'Annual Health Checkup', doctor: 'Dr. Sarah Smith', status: 'Archived' },
    { id: 5, date: 'Jun 05, 2023', type: 'Imaging', description: 'MRI Scan - Lumbar Spine', doctor: 'Dr. Michael Chen', status: 'Available' },
    { id: 6, date: 'May 22, 2023', type: 'Lab Report', description: 'Lipid Profile', doctor: 'Dr. James Wilson', status: 'Verified' },
    { id: 7, date: 'Apr 18, 2023', type: 'Consultation', description: 'Cardiology Follow-up', doctor: 'Dr. Sarah Smith', status: 'Archived' },
  ];

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allRecords.length / ITEMS_PER_PAGE);
  const recordData = allRecords.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <style>{keyframes}</style>

      <div className="records-page w-full relative flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Floating particles */}
        {particles.map((p, i) => {
          const { size, delay, ...pos } = p;
          return <MedicalParticle key={i} style={pos} size={size} delay={delay} />;
        })}

        <div className="w-full relative z-20">
          {/* Header */}
          <div 
            className="mb-8 flex items-center justify-between relative z-[60]"
            style={{ 
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) forwards' : 'none',
              opacity: mounted ? 1 : 0
            }}
          >
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Medical Records</h2>
              <div className="h-1.5 w-24 rounded-full" style={{ background: 'linear-gradient(90deg, #0d9488, transparent)' }}></div>
            </div>
            
            <div className="relative group hidden sm:block">
              <button 
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white relative overflow-hidden transition-all duration-300 transform group-hover:-translate-y-0.5"
                style={{ 
                  background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0f766e 100%)',
                  boxShadow: '0 8px 30px rgba(20,184,166,0.15)'
                }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'shimmer 2s infinite' }} />
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Upload Documents
                <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>

              {/* Hover Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2 z-50">
                <div className="bg-white/90 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-2xl overflow-hidden p-2">
                  <button 
                    onClick={() => handleUpload('Local Document')}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-teal-50 transition-colors group/item"
                  >
                    <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 group-hover/item:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Local Documents</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">PDF, JPG, PNG</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleUpload('DigiLocker ID')}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors group/item mt-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover/item:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">DigiLocker</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Govt Verified ID</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleUpload('Insurance Copy')}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 transition-colors group/item mt-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 group-hover/item:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Medical Insurance</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">TPA & Policy Copy</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Records Table Card */}
          <div 
            className="rounded-[32px] overflow-hidden relative shadow-2xl p-6 sm:p-8 lg:p-12"
            style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(30px) saturate(1.5)',
              border: '1px solid rgba(255,255,255,0.8)',
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) 0.2s forwards' : 'none',
              opacity: mounted ? 1 : 0
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Date</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Record Type</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Description</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Doctor</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recordData.map((item, idx) => (
                    <tr 
                      key={item.id} 
                      className="group hover:bg-teal-50/50 transition-colors duration-300"
                      style={{ 
                        animation: mounted ? `fadeInUp 0.6s ease-out ${0.3 + idx * 0.1}s both` : 'none'
                      }}
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-slate-800">{item.date}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-teal-50 text-teal-600 px-3 py-1 rounded-lg text-xs font-bold border border-teal-100">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-slate-900 tracking-wide">{item.description}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-slate-500 font-medium">{item.doctor}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          item.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          item.status === 'Verified' ? 'bg-teal-50 text-teal-600 border-teal-100' :
                          'bg-slate-50 text-slate-400 border-slate-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleViewRecord(item)}
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-blue-500/20 active:scale-95"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-teal-500/20 active:scale-95" title="Download">
                             <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>

        <MedicalRecordModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          recordData={selectedRecord} 
        />

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-right-10 duration-500">
             <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700/50 min-w-[300px]">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${toastMessage.includes('successfully') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-teal-500/20 text-teal-400'}`}>
                   {toastMessage.includes('successfully') ? <CheckCircle2 className="w-5 h-5" /> : <Upload className="w-5 h-5 animate-bounce" />}
                </div>
                <div>
                   <h4 className="text-sm font-bold text-white mb-0.5">{toastMessage.includes('successfully') ? 'Upload Complete' : 'Processing Upload'}</h4>
                   <p className="text-[11px] text-slate-300 font-medium">{toastMessage}</p>
                </div>
                <button 
                  onClick={() => setShowToast(false)}
                  className="ml-auto p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
             </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MedicalRecords;
