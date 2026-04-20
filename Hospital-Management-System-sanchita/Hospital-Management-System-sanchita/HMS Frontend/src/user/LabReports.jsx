import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';
import LabReportModal from '../components/LabReportModal';
import RequestTestModal from '../components/RequestTestModal';

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

const LabReports = () => {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

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

    .lab-page * { font-family: 'Inter', system-ui, sans-serif; }
  `;

  const particles = [
    { top: '5%', left: '15%', size: 14, delay: 0 },
    { top: '25%', right: '10%', size: 20, delay: 1.2 },
    { top: '50%', left: '8%', size: 18, delay: 3 },
    { top: '70%', right: '15%', size: 16, delay: 2.2 },
  ];

  const allLab = [
    { id: 'LAB-101', date: 'Oct 20, 2023', test: 'Complete Blood Count', lab: 'Central Diagnostics', status: 'Finalized' },
    { id: 'LAB-102', date: 'Oct 15, 2023', test: 'Lipid Profile', lab: 'HealthCare Lab', status: 'Finalized' },
    { id: 'LAB-103', date: 'Sep 28, 2023', test: 'Thyroid Function Test', lab: 'Central Diagnostics', status: 'Finalized' },
    { id: 'LAB-104', date: 'Sep 10, 2023', test: 'Blood Glucose (Fasting)', lab: 'City Lab Services', status: 'Finalized' },
    { id: 'LAB-105', date: 'Aug 22, 2023', test: 'Urine Routine Analysis', lab: 'HealthCare Lab', status: 'Finalized' },
    { id: 'LAB-106', date: 'Aug 05, 2023', test: 'Liver Function Test (LFT)', lab: 'Central Diagnostics', status: 'Finalized' },
    { id: 'LAB-107', date: 'Jul 19, 2023', test: 'Vitamin D & B12 Levels', lab: 'City Lab Services', status: 'Finalized' },
  ];

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allLab.length / ITEMS_PER_PAGE);
  const labData = allLab.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <style>{keyframes}</style>

      <div className="lab-page w-full relative flex flex-col items-center py-12 px-4 sm:px-6 lg:px-10">
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
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Lab Reports</h2>
              <div className="h-1.5 w-24 rounded-full" style={{ background: 'linear-gradient(90deg, #0d9488, transparent)' }}></div>
            </div>
            
            <button 
              onClick={() => setIsRequestModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white relative overflow-hidden group transition-all duration-300 transform hover:-translate-y-0.5"
              style={{ 
                background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0f766e 100%)',
                boxShadow: '0 8px 30px rgba(20,184,166,0.15)'
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'shimmer 2s infinite' }} />
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Request New Test
            </button>
          </div>

          {/* Lab Records Table Card */}
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
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Test Name</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Lab</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {labData.map((item, idx) => (
                    <tr 
                      key={item.id} 
                      className="group hover:bg-teal-50/50 transition-colors duration-300"
                      style={{ 
                        animation: mounted ? `fadeInUp 0.6s ease-out ${0.3 + idx * 0.1}s both` : 'none'
                      }}
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-slate-800">{item.date}</p>
                        <p className="text-[10px] font-black text-teal-600/60 uppercase tracking-widest">{item.id}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-teal-600 tracking-wide">{item.test}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm text-slate-500 font-medium">{item.lab}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-emerald-50 text-emerald-600 border-emerald-100">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => {
                            setSelectedReport(item);
                            setIsModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-teal-500/10 text-teal-300 text-[10px] font-black uppercase tracking-widest hover:bg-teal-500 hover:text-white transition-all duration-300 border border-teal-500/20"
                        >
                           View Result
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
        
        <LabReportModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          reportData={selectedReport} 
        />

        <RequestTestModal 
          isOpen={isRequestModalOpen} 
          onClose={() => setIsRequestModalOpen(false)} 
        />
      </div>
    </>
  );
};

export default LabReports;
