import React, { useState, useEffect } from 'react';
import { MagicCard } from '../components/magicui/MagicCard';
import ShinyButton from '../components/magicui/ShinyButton';
import { useNavigate } from 'react-router-dom';

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

const facilities = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Cardiology',
    desc: 'Advanced heart care & diagnostics',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Neurology',
    desc: 'Brain & nervous system specialists',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Emergency',
    desc: '24/7 critical care & trauma unit',
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Orthopedics',
    desc: 'Bone, joint & muscle treatment',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Pediatrics',
    desc: 'Specialized care for children',
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Diagnostics',
    desc: 'Lab tests, imaging & pathology',
    color: 'text-teal-500',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
  },
];

const keyframes = `
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
`;

const particles = [
  { top: '10%', left: '5%', size: 16, delay: 0 },
  { top: '25%', right: '8%', size: 22, delay: 1.5 },
  { top: '60%', left: '10%', size: 14, delay: 3 },
  { top: '80%', right: '5%', size: 20, delay: 2 },
];

const UserDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{keyframes}</style>
      <div className="space-y-10 relative pb-12">
        {particles.map((p, i) => {
          const { size, delay, ...pos } = p;
          return <MedicalParticle key={i} style={pos} size={size} delay={delay} />;
        })}

        {/* ── Welcome Banner ── */}
        <div
          className="relative rounded-[32px] p-10 md:p-14 overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.12) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.7)',
            animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) forwards' : 'none',
            opacity: mounted ? 1 : 0,
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-black text-teal-500 uppercase tracking-[0.25em] mb-3">CareConnect Hospital</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Welcome back,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
                John Doe!
              </span>
            </h2>
            <p className="text-slate-500 text-lg mb-8 font-medium leading-relaxed">
              Your health is our priority. Here's a quick look at your upcoming activities and medical updates for today.
            </p>
            <ShinyButton onClick={() => navigate('/user/book-appointment')}>
              Book New Appointment
            </ShinyButton>
          </div>
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-400 opacity-[0.06] blur-3xl" />
          <div className="absolute bottom-0 right-10 -mb-10 w-64 h-64 rounded-full bg-emerald-400 opacity-[0.06] blur-3xl" />
        </div>

        {/* ── Activity Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <MagicCard className="p-10 md:p-12 group shadow-2xl min-h-[280px] flex flex-col justify-between" gradientColor="rgba(20,184,166,0.15)">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              Upcoming Appointment
            </h3>
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex justify-between items-center group-hover:bg-white/80 transition-all duration-300">
              <div>
                <p className="font-black text-slate-800 text-lg">Dr. Sarah Smith</p>
                <p className="text-teal-600 font-bold text-xs uppercase tracking-widest mt-1">Cardiologist</p>
                <div className="flex items-center gap-3 mt-6 text-slate-500 font-medium text-base">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tomorrow, 10:30 AM
                </div>
              </div>
              <button 
                onClick={() => navigate('/user/book-appointment')}
                className="bg-white border border-teal-500/10 text-teal-600 px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-teal-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                Reschedule
              </button>
            </div>
          </MagicCard>

          <MagicCard className="p-10 md:p-12 group shadow-2xl min-h-[280px] flex flex-col justify-between" gradientColor="rgba(16,185,129,0.15)">
            <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              Recent Prescription
            </h3>
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 group-hover:bg-white/80 transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <span className="font-black text-slate-800 text-lg">Amoxicillin 500mg</span>
                <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-500/20">
                  Active
                </span>
              </div>
              <p className="text-slate-500 font-medium text-base">1 tablet twice daily after meals</p>
              <div className="h-px w-full bg-slate-200 my-6" />
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Prescribed on: Oct 12, 2023</p>
            </div>
          </MagicCard>
        </div>

        {/* ── Hospital Facilities Hero ── */}
        <div
          style={{
            animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) 0.4s both' : 'none',
          }}
        >
          <div className="mb-6">
            <p className="text-xs font-black text-teal-500 uppercase tracking-[0.25em] mb-1">What We Offer</p>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Our Facilities</h3>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 mt-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {facilities.map((f, i) => (
              <div
                key={i}
                className="group rounded-[32px] p-8 bg-white/70 backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer min-h-[220px] flex flex-col justify-center items-center text-center px-6"
                style={{ animation: mounted ? `fadeInUp 0.6s ease-out ${0.5 + i * 0.07}s both` : 'none' }}
              >
                <div className={`w-16 h-16 rounded-2xl ${f.bg} border ${f.border} flex items-center justify-center ${f.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h4 className="font-black text-slate-800 text-lg mb-2">{f.title}</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
