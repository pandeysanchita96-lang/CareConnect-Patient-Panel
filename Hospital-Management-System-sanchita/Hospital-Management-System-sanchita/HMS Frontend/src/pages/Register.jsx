import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  const calcStrength = (pw) => { let s = 0; if (pw.length >= 8) s++; if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++; if (/\d/.test(pw)) s++; if (/[^a-zA-Z0-9]/.test(pw)) s++; return s; };
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', '#ef4444', '#f59e0b', '#14b8a6', '#10b981'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (name === 'password') setPasswordStrength(calcStrength(value));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) errs.phone = 'Phone must be 10 digits';
    if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 8) errs.password = 'Min 8 characters';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => { navigate('/login'); setLoading(false); }, 1200);
  };

  const keyframes = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    @keyframes fadeInUp { 0%{opacity:0;transform:translateY(24px)} 100%{opacity:1;transform:translateY(0)} }
    @keyframes heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.18)} 28%{transform:scale(1)} 42%{transform:scale(1.18)} 70%{transform:scale(1)} }
    @keyframes ecgLine { 0%{stroke-dashoffset:600} 100%{stroke-dashoffset:0} }
    @keyframes shimmer { 0%{left:-100%} 100%{left:100%} }
    @keyframes strengthPulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
    .register-page * { font-family: 'Inter', system-ui, sans-serif; }
  `;

  /* Reusable input */
  const InputField = ({ id, name, type = 'text', label, icon, placeholder, error, value, isPassword, showPw, onTogglePw, delay = 0 }) => (
    <div style={{ animation: `fadeInUp 0.5s ease-out ${delay}s both` }}>
      <label className="block text-[10px] font-black text-teal-600 uppercase tracking-widest mb-1.5 ml-1" htmlFor={id}>{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-teal-500/50">{icon}</div>
        <input
          id={id} name={name} type={isPassword ? (showPw ? 'text' : 'password') : type}
          value={value} onChange={handleChange} placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none text-slate-800 placeholder-slate-400 text-sm font-bold transition-all duration-300"
          style={{ background: '#f8fafc', border: error ? '1.5px solid rgba(248,113,113,1)' : '1.5px solid #f1f5f9', ...(isPassword && { paddingRight: '2.5rem' }) }}
          onFocus={e => { e.target.style.border = '1.5px solid rgba(20,184,166,0.3)'; e.target.style.background = '#ffffff'; e.target.style.boxShadow = '0 4px 12px rgba(20,184,166,0.05)'; }}
          onBlur={e => { e.target.style.border = error ? '1.5px solid rgba(248,113,113,1)' : '1.5px solid #f1f5f9'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
        />
        {isPassword && (
          <button type="button" onClick={onTogglePw} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-teal-500/40 hover:text-teal-500 transition-colors">
            {showPw
              ? <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              : <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            }
          </button>
        )}
      </div>
      {error && <p className="mt-0.5 text-[11px] font-bold text-red-500 ml-1">{error}</p>}
    </div>
  );

  const iconSm = (d) => <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>;
  const userIcon = iconSm("M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z");
  const emailIcon = iconSm("M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z");
  const phoneIcon = iconSm("M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.46 4.38a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.38 1.46a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z");
  const calendarIcon = iconSm("M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z");
  const lockIcon = iconSm("M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z");

  return (
    <>
      <style>{keyframes}</style>
      <div
        className="register-page min-h-screen flex items-center justify-center p-4 sm:p-8"
        style={{ background: 'linear-gradient(135deg, #042f2e 0%, #0f3d3a 40%, #0f766e 100%)' }}
      >
        {/* Full Page Background Stethoscope */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.22] z-0">
          <img
            src="/stethoscope-bg-premium.png"
            alt=""
            className="w-full h-full object-cover object-center transform scale-110 rotate-3"
          />
        </div>

        {/* ECG */}
        <svg className="absolute bottom-0 left-0 w-full h-16 opacity-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 80">
          <polyline points="0,40 150,40 180,40 200,10 220,70 240,30 260,50 280,40 400,40 600,40 630,40 650,10 670,70 690,30 710,50 730,40 900,40 1000,40 1030,40 1050,10 1070,70 1090,30 1110,50 1130,40 1200,40"
            fill="none" stroke="#14b8a6" strokeWidth="2" style={{ strokeDasharray: 600, animation: 'ecgLine 4s linear infinite' }} />
        </svg>

        {/* ── Unified Card ── */}
        <div
          className="w-full max-w-5xl relative overflow-hidden rounded-[32px] shadow-[0_40px_120px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row"
          style={{ opacity: mounted ? 1 : 0, animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) forwards' : 'none' }}
        >
          {/* ════════ LEFT — White Hero ════════ */}
          <div className="relative lg:w-5/12 flex flex-col justify-between p-10 lg:p-12 overflow-hidden" style={{ background: '#ffffff' }}>
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #0d9488, transparent)' }} />
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #14b8a6, transparent)' }} />

            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)', animation: 'heartbeat 1.5s ease-in-out infinite' }}>
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>
                <span className="text-xl font-black text-teal-800 tracking-tight">CARE <span className="text-teal-500">CONNECT</span></span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">
                Join Our<br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #0d9488, #14b8a6)' }}>
                  Health Network
                </span>
              </h1>
              <p className="text-slate-500 text-base leading-relaxed font-medium">
                Create your account and start managing your health journey with our world-class digital platform.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="mt-10 lg:mt-0 space-y-3">
              {[
                { icon: '📋', text: 'Book appointments in seconds' },
                { icon: '📊', text: 'Access your health records anytime' },
                { icon: '💊', text: 'Get prescription reminders' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.04), rgba(13,148,136,0.07))', border: '1px solid rgba(20,184,166,0.1)' }}>
                  <span className="text-lg flex-shrink-0">{f.icon}</span>
                  <span className="text-slate-600 text-sm font-medium">{f.text}</span>
                </div>
              ))}
            </div>


          </div>

          {/* Divider */}
          <div className="hidden lg:block absolute top-0 h-full pointer-events-none" style={{ left: 'calc(41.666667% - 1px)', width: '2px', background: 'linear-gradient(180deg, transparent, rgba(20,184,166,0.3), transparent)' }} />

          {/* ════════ RIGHT — White Form ════════ */}
          <div className="lg:w-7/12 flex flex-col justify-center p-8 sm:p-10 lg:p-10 relative overflow-hidden" style={{ background: '#ffffff' }}>
            {/* Subtle floating blobs for premium feel */}
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #14b8a6, transparent)' }} />
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, #0d9488, transparent)' }} />

            <div className="mb-5 relative z-10" style={{ animation: 'fadeInUp 0.5s ease-out 0.15s both' }}>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">Create Account</h2>
              <p className="text-slate-500 font-medium text-sm">Join thousands of patients and doctors</p>
            </div>

            {errors.submit && (
              <div className="mb-4 p-3 rounded-xl text-sm font-medium border relative z-10" style={{ background: 'rgba(220,38,38,0.05)', borderColor: 'rgba(220,38,38,0.2)', color: '#dc2626' }}>{errors.submit}</div>
            )}

            <form className="space-y-3 relative z-10" onSubmit={handleSubmit}>
              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <InputField id="firstName" name="firstName" label="First Name" icon={userIcon} placeholder="John" error={errors.firstName} value={formData.firstName} delay={0.2} />
                <InputField id="lastName" name="lastName" label="Last Name" icon={userIcon} placeholder="Doe" error={errors.lastName} value={formData.lastName} delay={0.24} />
              </div>

              <InputField id="email" name="email" type="email" label="Email Address" icon={emailIcon} placeholder="john@hospital.com" error={errors.email} value={formData.email} delay={0.28} />

              {/* Phone + DOB */}
              <div className="grid grid-cols-2 gap-3">
                <InputField id="phone" name="phone" type="tel" label="Phone Number" icon={phoneIcon} placeholder="9876543210" error={errors.phone} value={formData.phone} delay={0.32} />
                <InputField id="dob" name="dateOfBirth" type="date" label="Date of Birth" icon={calendarIcon} placeholder="" error={errors.dateOfBirth} value={formData.dateOfBirth} delay={0.36} />
              </div>

              <InputField id="password" name="password" label="Password" icon={lockIcon} placeholder="••••••••" error={errors.password} value={formData.password} isPassword showPw={showPassword} onTogglePw={() => setShowPassword(v => !v)} delay={0.40} />

              {/* Strength meter */}
              {formData.password && (
                <div className="space-y-1" style={{ animation: 'fadeInUp 0.3s ease-out both' }}>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-all duration-500"
                        style={{ background: i <= passwordStrength ? strengthColors[passwordStrength] : 'rgba(255,255,255,0.08)', ...(i <= passwordStrength && { animation: 'strengthPulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }) }} />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold" style={{ color: strengthColors[passwordStrength] }}>{strengthLabels[passwordStrength]}</p>
                </div>
              )}

              <InputField id="confirmPassword" name="confirmPassword" label="Confirm Password" icon={lockIcon} placeholder="••••••••" error={errors.confirmPassword} value={formData.confirmPassword} isPassword showPw={showConfirmPassword} onTogglePw={() => setShowConfirmPassword(v => !v)} delay={0.44} />

              {/* Submit */}
              <div style={{ animation: 'fadeInUp 0.5s ease-out 0.48s both' }}>
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #0f766e 100%)', boxShadow: '0 8px 30px rgba(20,184,166,0.3)' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(20,184,166,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(20,184,166,0.3)'; }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)', animation: 'shimmer 2s infinite' }} />
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                      Creating Account...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Create Account
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </span>
                  )}
                </button>
              </div>

              {/* OR + Google */}
              <div style={{ animation: 'fadeInUp 0.5s ease-out 0.52s both' }}>
                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px" style={{ background: '#f1f5f9' }} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">OR</span>
                  <div className="flex-1 h-px" style={{ background: '#f1f5f9' }} />
                </div>
                <button type="button" onClick={() => alert('Google Auth Simulated')}
                  className="w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-3 mt-1 border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
              </div>
            </form>

            {/* Login link */}
            <div className="mt-5 text-center relative z-10" style={{ animation: 'fadeInUp 0.5s ease-out 0.56s both' }}>
              <span className="text-slate-500 font-medium text-sm">Already have an account? </span>
              <Link to="/login" className="text-sm font-black text-teal-600 hover:text-teal-500 transition-colors hover:underline underline-offset-4">
                Sign In →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
