import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

const Profile = () => {
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Edward Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dob: 'March 15, 1985',
    bloodGroup: 'O+',
    allergies: 'Penicillin, Peanuts',
    conditions: 'None reported',
    emergencyContact: 'Jane Doe (+1 555-987-6543)'
  });
  const [editedData, setEditedData] = useState({ ...profileData });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleEditToggle = () => {
    setEditedData({ ...profileData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData({ ...editedData });
    setIsEditing(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({ ...prev, [name]: value }));
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

    @keyframes heartbeat {
      0%, 100% { transform: scale(1); }
      14%  { transform: scale(1.1); }
      28%  { transform: scale(1); }
      42%  { transform: scale(1.1); }
      70%  { transform: scale(1); }
    }

    @keyframes gradientShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes fadeInUp {
      0%   { opacity: 0; transform: translateY(30px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeInRight {
      0%   { opacity: 0; transform: translateX(40px); }
      100% { opacity: 1; transform: translateX(0); }
    }

    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 15px rgba(20,184,166,0.2); }
      50%      { box-shadow: 0 0 35px rgba(20,184,166,0.5); }
    }

    @keyframes shimmer {
      0%   { left: -100%; }
      100% { left: 100%; }
    }

    @keyframes ecgLine {
      0%   { stroke-dashoffset: 600; }
      100% { stroke-dashoffset: 0; }
    }

    .profile-page * { font-family: 'Inter', system-ui, sans-serif; }
  `;

  const particles = [
    { top: '10%', left: '5%', size: 16, delay: 0 },
    { top: '25%', right: '8%', size: 22, delay: 1.5 },
    { top: '60%', left: '10%', size: 14, delay: 3 },
    { top: '80%', right: '5%', size: 20, delay: 2 },
    { bottom: '15%', right: '15%', size: 15, delay: 1 },
  ];

  return (
    <>
      <style>{keyframes}</style>

      <div className="profile-page w-full relative flex flex-col items-center py-8 px-4 sm:px-6">
        {/* Floating particles */}
        {particles.map((p, i) => {
          const { size, delay, ...pos } = p;
          return <MedicalParticle key={i} style={pos} size={size} delay={delay} />;
        })}

        {/* ECG line decoration */}
        <svg className="absolute bottom-0 left-0 w-full h-20 opacity-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 80">
          <polyline
            points="0,40 150,40 180,40 200,10 220,70 240,30 260,50 280,40 400,40 600,40 630,40 650,10 670,70 690,30 710,50 730,40 900,40 1000,40 1030,40 1050,10 1070,70 1090,30 1110,50 1130,40 1200,40"
            fill="none" stroke="#14b8a6" strokeWidth="2"
            style={{ strokeDasharray: 600, animation: 'ecgLine 4s linear infinite' }}
          />
        </svg>

        <div className="w-full max-w-4xl relative z-20">
          {/* Header */}
          <div 
            className="mb-8 flex items-center justify-between"
            style={{ 
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) forwards' : 'none',
              opacity: mounted ? 1 : 0
            }}
          >
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Profile</h2>
              <div className="h-1.5 w-24 rounded-full" style={{ background: 'linear-gradient(90deg, #0d9488, transparent)' }}></div>
            </div>
          </div>
          
          {/* Main Profile Card */}
          <div 
            className="rounded-[32px] overflow-hidden relative"
            style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(30px) saturate(1.5)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 25px 60px rgba(4,47,46,0.15)',
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) 0.2s forwards' : 'none',
              opacity: mounted ? 1 : 0
            }}
          >
             {/* Animated gradient border glow on hover */}
             <div
              className="absolute -inset-[1px] rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10"
              style={{
                background: 'linear-gradient(45deg, #14b8a6, #0d9488, #5eead4, #14b8a6)',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 4s ease infinite',
                filter: 'blur(1px)',
              }}
            />

            {/* Profile Header Side */}
            <div className="p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 border-b border-slate-100">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-black text-white relative shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
                  border: '4px solid rgba(255,255,255,0.8)',
                  animation: 'heartbeat 2s ease-in-out infinite, pulseGlow 2s ease-in-out infinite',
                }}
              >
                JD
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-400 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                   <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-3xl font-extrabold text-slate-900 mb-1">John Doe</h3>
                <p className="text-teal-600 font-bold tracking-wide">Patient ID: <span className="text-slate-500">PAT-84920</span></p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {isEditing ? 'Editing Profile...' : 'Active Status'}
                  </span>
                  <span className="bg-teal-50 text-teal-600 border border-teal-100 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                    Level 2 Access
                  </span>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Personal Info */}
               <div 
                 className="space-y-6"
                 style={{ animation: 'fadeInRight 0.6s ease-out 0.4s both' }}
               >
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <h4 className="text-sm font-black text-teal-600 uppercase tracking-[0.2em]">Personal Information</h4>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-5">
                      {isEditing ? (
                        <>
                          <EditItem label="Full Name" name="fullName" value={editedData.fullName} onChange={handleChange} />
                          <EditItem label="Email Address" name="email" value={editedData.email} onChange={handleChange} />
                          <EditItem label="Phone Number" name="phone" value={editedData.phone} onChange={handleChange} />
                          <EditItem label="Date of Birth" name="dob" value={editedData.dob} onChange={handleChange} />
                        </>
                      ) : (
                        <>
                          <InfoItem label="Full Name" value={profileData.fullName} />
                          <InfoItem label="Email Address" value={profileData.email} />
                          <InfoItem label="Phone Number" value={profileData.phone} />
                          <InfoItem label="Date of Birth" value={profileData.dob} />
                        </>
                      )}
                   </div>
               </div>
               {/* Medical Info */}
               <div 
                 className="space-y-6"
                 style={{ animation: 'fadeInRight 0.6s ease-out 0.5s both' }}
               >
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-3.566 0l-.727-2.903a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-2.387 2.387a2 2 0 11-2.828-2.828l2.387-2.387a2 2 0 00.547-1.022l.477-2.387a2 2 0 00-1.414-1.96L2.903 9.428a2 2 0 010-3.566l2.903-.727a2 2 0 001.414-1.96l.477-2.387a2 2 0 00-.547-1.022L4.767 1.318a2 2 0 112.828-2.828l2.387 2.387a2 2 0 001.022.547l2.387.477a2 2 0 001.96-1.414l.727-2.903a2 2 0 013.566 0l.727 2.903a2 2 0 001.96 1.414l2.387-.477a2 2 0 001.022-.547l2.387-2.387a2 2 0 112.828 2.828l-2.387 2.387a2 2 0 00-.547 1.022l-.477 2.387a2 2 0 001.414 1.96l2.903.727a2 2 0 010 3.566l-2.903.727a2 2 0 00-1.414 1.96l-.477 2.387a2 2 0 00.547 1.022l2.387 2.387a2 2 0 11-2.828 2.828l-2.387-2.387z" /></svg>
                      </div>
                      <h4 className="text-sm font-black text-teal-600 uppercase tracking-[0.2em]">Medical Information</h4>
                   </div>
                   
                   <div className="grid grid-cols-1 gap-5">
                      {isEditing ? (
                        <>
                          <EditItem label="Blood Group" name="bloodGroup" value={editedData.bloodGroup} onChange={handleChange} />
                          <EditItem label="Allergies" name="allergies" value={editedData.allergies} onChange={handleChange} />
                          <EditItem label="Chronic Conditions" name="conditions" value={editedData.conditions} onChange={handleChange} />
                          <EditItem label="Emergency Contact" name="emergencyContact" value={editedData.emergencyContact} onChange={handleChange} />
                        </>
                      ) : (
                        <>
                          <InfoItem label="Blood Group" value={profileData.bloodGroup} isHighlight={true} />
                          <InfoItem label="Allergies" value={profileData.allergies} />
                          <InfoItem label="Chronic Conditions" value={profileData.conditions} />
                          <InfoItem label="Emergency Contact" value={profileData.emergencyContact} />
                        </>
                      )}
                   </div>
               </div>
            </div>
            
            {/* Footer Actions */}
            <div className="bg-slate-50 px-8 py-6 sm:px-10 border-t border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              
              {/* Medical Management Actions */}
              <div className="flex flex-col sm:flex-row gap-4" style={{ animation: 'fadeInUp 0.6s ease-out 0.6s both' }}>
                <Link to="/user/medical-records" className="px-6 py-3 text-sm font-bold text-teal-600 bg-teal-50 hover:bg-teal-100 transition-all duration-300 rounded-xl border border-teal-200 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Medical Records
                </Link>

                {/* Upload Documents Dropdown (same as MedicalRecords page) */}
                <div className="relative group z-[100]">
                  <button 
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white relative overflow-hidden transition-all duration-300 transform group-hover:-translate-y-0.5"
                    style={{ 
                      background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0f766e 100%)',
                      boxShadow: '0 8px 30px rgba(20,184,166,0.15)'
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'shimmer 2s infinite' }} />
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Upload Documents
                    <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>

                  <div className="absolute left-0 bottom-full mb-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-bottom-left group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="bg-white/90 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-2xl overflow-hidden p-2">
                      <button className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-teal-50 transition-colors group/item">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 group-hover/item:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">Local Documents</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">PDF, JPG, PNG</p>
                        </div>
                      </button>
                      <button className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors group/item mt-1">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover/item:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">DigiLocker</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Govt Verified ID</p>
                        </div>
                      </button>
                      <button className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-amber-50 transition-colors group/item mt-1">
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

              {/* Setting Actions */}
              <div className="flex flex-col sm:flex-row gap-4 border-t xl:border-t-0 pt-6 xl:pt-0 border-slate-200">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleCancel}
                      className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-all duration-300 rounded-xl hover:bg-slate-200/50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSave}
                      className="px-8 py-3 rounded-xl text-sm font-bold text-white relative overflow-hidden group transition-all duration-300 shadow-lg bg-indigo-600 hover:bg-indigo-500"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Save Changes
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-all duration-300 rounded-xl hover:bg-slate-200/50"
                      style={{ animation: 'fadeInUp 0.6s ease-out 0.65s both' }}
                    >
                      Change Password
                    </button>
                    <button 
                      onClick={handleEditToggle}
                      className="px-8 py-3 rounded-xl text-sm font-bold text-white relative overflow-hidden group transition-all duration-300 shadow-lg bg-teal-900 hover:bg-teal-800"
                      style={{ animation: 'fadeInUp 0.6s ease-out 0.7s both' }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Edit Profile
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {showToast && (
          <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-right-10 duration-500">
             <div className="bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/20 backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                   <p className="text-sm font-black whitespace-nowrap">Changes Saved Successfully</p>
                   <p className="text-xs font-medium text-emerald-100/80">Your profile has been updated.</p>
                </div>
             </div>
          </div>
        )}
      </div>
    </>
  );
};

/* ─── Helping Sub-components ─── */
const InfoItem = ({ label, value, isHighlight = false }) => (
  <div className="group">
    <p className="text-xs font-bold text-teal-600/40 uppercase tracking-widest mb-1.5 transition-colors group-hover:text-teal-600">{label}</p>
    <div className="flex items-center">
       {isHighlight ? (
         <p className="font-extrabold text-red-500 bg-red-50 border border-red-100 px-3 py-1 rounded-lg shadow-sm">
           {value}
         </p>
       ) : (
         <p className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{value}</p>
       )}
    </div>
    <div className="h-[1px] w-full mt-3 bg-slate-100 group-hover:bg-teal-100 transition-all duration-500 overflow-hidden">
       <div className="h-full w-0 group-hover:w-full bg-teal-400/40 transition-all duration-700"></div>
    </div>
  </div>
);

const EditItem = ({ label, name, value, onChange }) => (
  <div className="group">
    <label className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-1.5 block">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-teal-400 focus:bg-white transition-all shadow-sm"
    />
  </div>
);

export default Profile;
