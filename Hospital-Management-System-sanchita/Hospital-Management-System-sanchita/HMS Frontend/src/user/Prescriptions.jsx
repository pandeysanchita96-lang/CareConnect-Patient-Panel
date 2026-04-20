import React, { useState, useEffect } from 'react';
import { Download, X, Eye } from 'lucide-react';
import Pagination from '../components/Pagination';
import PrescriptionModal from '../components/PrescriptionModal';

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

const Prescriptions = () => {
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleDownloadAll = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
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

    .prescriptions-page * { font-family: 'Inter', system-ui, sans-serif; }
  `;

  const particles = [
    { top: '10%', left: '5%', size: 16, delay: 0 },
    { top: '25%', right: '8%', size: 22, delay: 1.5 },
    { top: '60%', left: '10%', size: 14, delay: 3 },
    { top: '80%', right: '5%', size: 20, delay: 2 },
  ];

  const allPrescriptions = [
    { id: 1, date: 'Oct 12, 2023', doctor: 'Dr. Sarah Smith', medication: 'Amoxicillin 500mg', dosage: '1 tablet twice daily', status: 'Active' },
    { id: 2, date: 'Sep 20, 2023', doctor: 'Dr. James Wilson', medication: 'Lisinopril 10mg', dosage: '1 tablet daily', status: 'Completed' },
    { id: 3, date: 'Aug 05, 2023', doctor: 'Dr. Sarah Smith', medication: 'Ibuprofen 400mg', dosage: 'As needed for pain', status: 'Expired' },
    { id: 4, date: 'Jul 15, 2023', doctor: 'Dr. Michael Chen', medication: 'Cetirizine 10mg', dosage: '1 tablet daily', status: 'Completed' },
    { id: 5, date: 'Jun 01, 2023', doctor: 'Dr. James Wilson', medication: 'Metformin 500mg', dosage: '1 tablet with meals', status: 'Active' },
    { id: 6, date: 'May 10, 2023', doctor: 'Dr. Sarah Smith', medication: 'Atorvastatin 20mg', dosage: '1 tablet at night', status: 'Active' },
    { id: 7, date: 'Apr 22, 2023', doctor: 'Dr. Michael Chen', medication: 'Omeprazole 20mg', dosage: '1 capsule before meals', status: 'Completed' },
  ];

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allPrescriptions.length / ITEMS_PER_PAGE);
  const prescriptionData = allPrescriptions.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <style>{keyframes}</style>

      <div className="prescriptions-page w-full relative flex flex-col py-8 px-4 sm:px-6">
        {/* Floating particles */}
        {particles.map((p, i) => {
          const { size, delay, ...pos } = p;
          return <MedicalParticle key={i} style={pos} size={size} delay={delay} />;
        })}

        <div className="w-full relative z-20">
          {/* Header */}
          <div 
            className="mb-8 flex items-center justify-between"
            style={{ 
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) forwards' : 'none',
              opacity: mounted ? 1 : 0
            }}
          >
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Prescriptions</h2>
              <div className="h-1.5 w-24 rounded-full" style={{ background: 'linear-gradient(90deg, #0d9488, transparent)' }}></div>
            </div>
            
            <button 
              onClick={handleDownloadAll}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ 
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0f766e 100%)',
                boxShadow: '0 8px 30px rgba(20,184,166,0.15)'
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'shimmer 2s infinite' }} />
              <Download className="w-4 h-4" />
              Download All
            </button>
          </div>

          {/* Prescriptions Table Card */}
          <div 
            className="rounded-[24px] overflow-hidden relative shadow-2xl p-2 sm:p-4 lg:p-6"
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
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Doctor</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Medication</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Dosage</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {prescriptionData.map((item, idx) => (
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
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-600 text-xs font-bold">
                            {item.doctor.split(' ').pop().charAt(0)}
                          </div>
                          <p className="text-sm font-medium text-slate-600">{item.doctor}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-teal-600 tracking-wide">{item.medication}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-slate-500 font-medium">{item.dosage}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          item.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          item.status === 'Completed' ? 'bg-teal-50 text-teal-600 border-teal-100' :
                          'bg-red-50 text-red-500 border-red-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => handleViewPrescription(item)}
                          className="p-2 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-teal-500/20 active:scale-95"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>

        <PrescriptionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          prescriptionData={selectedPrescription} 
        />

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-bottom-10 duration-500">
             <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700/50">
                <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400">
                   <Download className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                   <h4 className="text-sm font-bold text-white mb-0.5">Preparing Download</h4>
                   <p className="text-[11px] text-slate-300 font-medium">All prescriptions are being bundled into a PDF.</p>
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

export default Prescriptions;
