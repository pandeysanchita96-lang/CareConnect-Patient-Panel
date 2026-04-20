import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MagicCard } from '../components/magicui/MagicCard';
import ShinyButton from '../components/magicui/ShinyButton';

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

const BookAppointment = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedDept, setSelectedDept] = useState('Cardiology');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Smith');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('idle'); // 'idle', 'booking', 'success'
  const [errors, setErrors] = useState({});
  const location = useLocation();

  // Mock data for slots based on doctor
  const doctorSlots = {
    'Dr. Sarah Smith': ['09:00 AM', '10:30 AM', '01:00 PM', '03:30 PM'],
    'Dr. James Wilson': ['11:00 AM', '12:30 PM', '02:00 PM', '04:30 PM'],
    'Dr. Michael Chen': ['08:30 AM', '10:00 AM', '11:30 AM', '02:30 PM'],
    'Dr. Emily Brown': ['09:30 AM', '11:00 AM', '01:30 PM', '04:00 PM'],
    'Dr. Robert Taylor': ['10:00 AM', '12:00 PM', '02:00 PM', '03:00 PM'],
    'Dr. Linda Garcia': ['08:00 AM', '09:30 AM', '11:00 AM', '01:00 PM'],
    'Dr. David Martinez': ['11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'],
    'Dr. Susan Lee': ['09:00 AM', '10:30 AM', '12:30 PM', '02:30 PM'],
    'Dr. Joseph White': ['10:30 AM', '12:00 PM', '01:30 PM', '03:30 PM']
  };

  useEffect(() => {
    if (selectedDoctor) {
      setAvailableSlots(doctorSlots[selectedDoctor] || []);
      setSelectedSlot(''); // Reset slot when doctor changes
    }
  }, [selectedDoctor, selectedDate]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (location.state?.prefill) {
      const { category, title } = location.state.prefill;
      if (category === 'Doctor') {
        setSelectedDoctor(title);
      } else if (category === 'Department') {
        setSelectedDept(title);
      }
    }
  }, [location.state, setSelectedDoctor, setSelectedDept]);

  const handleBooking = () => {
    const errs = {};
    if (!selectedDate) errs.date = 'Please select a date';
    if (!selectedSlot) errs.slot = 'Please select a time slot';
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setBookingStatus('booking');
    
    // Simulate API call
    setTimeout(() => {
      setBookingStatus('success');
    }, 2000);
  };

  const resetBooking = () => {
    setBookingStatus('idle');
    setSelectedDate('');
    setSelectedSlot('');
    setIsEmergency(false);
  };

  /* ─── inline keyframes ─── */
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

    @keyframes shimmer {
      0%   { left: -100%; }
      100% { left: 100%; }
    }

    @keyframes pulse-red {
      0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
      100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
  `;

  const particles = [
    { top: '15%', left: '10%', size: 16, delay: 0 },
    { top: '40%', right: '15%', size: 22, delay: 1.5 },
    { bottom: '20%', left: '15%', size: 20, delay: 2 },
  ];

  return (
    <>
      <style>{keyframes}</style>
      <div className="min-h-[80vh] w-full relative py-12 px-4 sm:px-6 flex items-center justify-center overflow-hidden">
        {/* Floating particles */}
        {particles.map((p, i) => {
          const { size, delay, ...pos } = p;
          return <MedicalParticle key={i} style={pos} size={size} delay={delay} />;
        })}

        <div className="w-full relative z-20">
          <div 
            className="text-center mb-10"
            style={{ 
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) forwards' : 'none',
              opacity: mounted ? 1 : 0
            }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Book <span className="text-teal-600">Appointment</span></h2>
            <div className="h-1.5 w-32 bg-teal-500/20 rounded-full mx-auto mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-teal-400/40 w-1/2 animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', animation: 'shimmer 2s infinite' }}></div>
            </div>
            <p className="text-slate-500 font-medium max-w-md mx-auto">Select your preferred date, time and doctor to schedule your visit.</p>
          </div>

          <MagicCard 
            className="p-8 md:p-12 lg:p-16 relative shadow-2xl space-y-12 overflow-visible"
            gradientColor="rgba(20,184,166,0.1)"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-teal-600 uppercase tracking-[0.2em] ml-2">Select Department</label>
                <div className="relative group">
                  <select 
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-slate-800 font-bold outline-none appearance-none focus:border-teal-500/40 focus:bg-white transition-all duration-300 shadow-sm"
                  >
                    <option className="bg-white text-slate-800">Cardiology</option>
                    <option className="bg-white text-slate-800">Neurology</option>
                    <option className="bg-white text-slate-800">Orthopedics</option>
                    <option className="bg-white text-slate-800">Pediatrics</option>
                    <option className="bg-white text-slate-800">Oncology</option>
                    <option className="bg-white text-slate-800">Dermatology</option>
                    <option className="bg-white text-slate-800">Ophthalmology</option>
                    <option className="bg-white text-slate-800">Psychiatry</option>
                    <option className="bg-white text-slate-800">Gastroenterology</option>
                    <option className="bg-white text-slate-800">Urology</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-teal-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-teal-600 uppercase tracking-[0.2em] ml-2">Select Doctor</label>
                <div className="relative group">
                  <select 
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-slate-800 font-bold outline-none appearance-none focus:border-teal-500/40 focus:bg-white transition-all duration-300 shadow-sm"
                  >
                    <option className="bg-white text-slate-800">Dr. Sarah Smith</option>
                    <option className="bg-white text-slate-800">Dr. James Wilson</option>
                    <option className="bg-white text-slate-800">Dr. Michael Chen</option>
                    <option className="bg-white text-slate-800">Dr. Emily Brown</option>
                    <option className="bg-white text-slate-800">Dr. Robert Taylor</option>
                    <option className="bg-white text-slate-800">Dr. Linda Garcia</option>
                    <option className="bg-white text-slate-800">Dr. David Martinez</option>
                    <option className="bg-white text-slate-800">Dr. Susan Lee</option>
                    <option className="bg-white text-slate-800">Dr. Joseph White</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-teal-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-teal-600 uppercase tracking-[0.2em] ml-2">Preferred Date</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    if (errors.date) setErrors(prev => ({ ...prev, date: null }));
                  }}
                  className={`w-full h-14 bg-slate-50 border rounded-2xl px-6 text-slate-800 font-bold outline-none focus:bg-white transition-all duration-300 [color-scheme:light] shadow-sm ${errors.date ? 'border-red-500' : 'border-slate-200 focus:border-teal-500/40'}`} 
                />
                {errors.date && <p className="text-[10px] font-bold text-red-500 ml-2 mt-1">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-teal-600 uppercase tracking-[0.2em] ml-2">Slots Available</label>
                <div className="relative group">
                  <select 
                    value={selectedSlot}
                    onChange={(e) => {
                      setSelectedSlot(e.target.value);
                      if (errors.slot) setErrors(prev => ({ ...prev, slot: null }));
                    }}
                    className={`w-full h-14 bg-slate-50 border rounded-2xl px-6 text-slate-800 font-bold outline-none appearance-none focus:bg-white transition-all duration-300 shadow-sm ${errors.slot ? 'border-red-500' : 'border-slate-200 focus:border-teal-500/40'}`}
                  >
                    <option value="" className="bg-white">Select a slot</option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-white">{slot}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-teal-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                {errors.slot && <p className="text-[10px] font-bold text-red-500 ml-2 mt-1">{errors.slot}</p>}
              </div>
            </div>

            <div className={`p-6 rounded-3xl transition-all duration-500 flex items-center justify-between border ${isEmergency ? 'bg-red-50/50 border-red-200 shadow-lg pulse-red' : 'bg-slate-50 border-slate-100'}`}
                 style={{ animation: isEmergency ? 'pulse-red 2s infinite' : 'none' }}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${isEmergency ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className={`text-sm font-black uppercase tracking-wider ${isEmergency ? 'text-red-600' : 'text-slate-500'}`}>Emergency Appointment</h4>
                  <p className="text-xs text-slate-400 font-medium">Mark this if you need immediate medical attention</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isEmergency} onChange={() => setIsEmergency(!isEmergency)} />
                <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-teal-600 uppercase tracking-[0.2em] ml-2">Additional Notes</label>
              <textarea rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] p-6 text-slate-800 font-medium outline-none focus:border-teal-500/40 focus:bg-white transition-all duration-300 resize-none shadow-sm" placeholder="Is there anything else we should know?"></textarea>
            </div>

            <div className="pt-4">
              <ShinyButton 
                className="w-full py-5 text-lg" 
                onClick={handleBooking}
                disabled={bookingStatus === 'booking'}
              >
                {bookingStatus === 'booking' ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Request...
                  </span>
                ) : 'Confirm Appointment'}
              </ShinyButton>
            </div>
          </MagicCard>
        </div>

        {/* Success Overlay */}
        {bookingStatus === 'success' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
             <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-md w-full text-center relative overflow-hidden animate-in zoom-in-95 duration-500">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 to-emerald-500" />
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10 transform rotate-12">
                   <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Booking Confirmed!</h3>
                <p className="text-slate-500 font-medium mb-8">Your appointment with <span className="text-teal-600 font-black">{selectedDoctor}</span> has been successfully scheduled.</p>
                
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8 text-left space-y-3">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Date</span>
                      <span className="text-slate-900 font-black">{selectedDate}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Time Slot</span>
                      <span className="text-slate-900 font-black">{selectedSlot}</span>
                   </div>
                </div>

                <button 
                  onClick={resetBooking}
                  className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-sm tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
                >
                  DONE
                </button>
             </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookAppointment;
