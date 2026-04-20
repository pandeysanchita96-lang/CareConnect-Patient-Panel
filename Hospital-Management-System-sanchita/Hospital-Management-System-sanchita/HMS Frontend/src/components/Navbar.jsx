import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Settings, LogOut, ChevronDown, Search, Calendar, FileText, UserRound, GraduationCap, Building2 } from 'lucide-react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const searchableData = [
    // Pages
    { id: 1, title: 'Dashboard', category: 'Page', path: '/user/dashboard', icon: <Building2 className="w-4 h-4" /> },
    { id: 2, title: 'Book Appointment', category: 'Page', path: '/user/book-appointment', icon: <Calendar className="w-4 h-4" /> },
    { id: 3, title: 'Prescriptions', category: 'Page', path: '/user/prescriptions', icon: <FileText className="w-4 h-4" /> },
    { id: 4, title: 'Medical Records', category: 'Page', path: '/user/medical-records', icon: <FileText className="w-4 h-4" /> },
    { id: 5, title: 'Billing', category: 'Page', path: '/user/billing', icon: <FileText className="w-4 h-4" /> },
    { id: 6, title: 'Profile', category: 'Page', path: '/user/profile', icon: <UserRound className="w-4 h-4" /> },
    
    // Departments
    { id: 7, title: 'Cardiology', category: 'Department', path: '/user/book-appointment', icon: <Building2 className="w-4 h-4" /> },
    { id: 8, title: 'Neurology', category: 'Department', path: '/user/book-appointment', icon: <Building2 className="w-4 h-4" /> },
    { id: 9, title: 'Orthopedics', category: 'Department', path: '/user/book-appointment', icon: <Building2 className="w-4 h-4" /> },
    { id: 10, title: 'Pediatrics', category: 'Department', path: '/user/book-appointment', icon: <Building2 className="w-4 h-4" /> },
    { id: 11, title: 'Oncology', category: 'Department', path: '/user/book-appointment', icon: <Building2 className="w-4 h-4" /> },
    
    // Doctors
    { id: 12, title: 'Dr. Sarah Smith', category: 'Doctor', role: 'Cardiologist', path: '/user/book-appointment', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 13, title: 'Dr. James Wilson', category: 'Doctor', role: 'Neurologist', path: '/user/book-appointment', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 14, title: 'Dr. Michael Chen', category: 'Doctor', role: 'Orthopedic', path: '/user/book-appointment', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 15, title: 'Dr. Emily Brown', category: 'Doctor', role: 'Pediatrician', path: '/user/book-appointment', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredResults([]);
      setShowResults(false);
      return;
    }

    const filtered = searchableData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.role && item.role.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 6);

    setFilteredResults(filtered);
    setShowResults(true);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (result) => {
    navigate(result.path, { state: { prefill: result } });
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <nav
      className="sticky top-0 z-40 w-full transition-all duration-500"
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(15,118,110,0.1)',
      }}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6">
        <div className="flex items-center h-16 gap-4">

          {/* ── Logo ── */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-black text-teal-800 tracking-tighter whitespace-nowrap">
              CARE <span className="text-teal-500">CONNECT</span>
            </h1>
          </div>

          {/* ── Search Bar ── */}
          <div className="flex-1 max-w-2xl mx-4 relative group" ref={searchRef}>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-500 transition-colors duration-200">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() !== '' && setShowResults(true)}
              placeholder="Search doctors, reports, appointments..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-sm font-medium outline-none text-slate-700 placeholder-slate-400 transition-all duration-300"
              style={{
                background: 'rgba(241,245,249,0.9)',
                border: searchQuery.trim() !== '' && showResults ? '1.5px solid rgba(20,184,166,0.3)' : '1.5px solid rgba(203,213,225,0.6)',
                borderBottomLeftRadius: showResults && filteredResults.length > 0 ? '0px' : '1rem',
                borderBottomRightRadius: showResults && filteredResults.length > 0 ? '0px' : '1rem',
              }}
            />

            {/* ── Search Results Dropdown ── */}
            {showResults && filteredResults.length > 0 && (
              <div 
                className="absolute top-full left-0 w-full bg-white border-x border-b border-slate-200 shadow-2xl rounded-b-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                style={{ backdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.98)' }}
              >
                <div className="py-2">
                  {filteredResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-teal-50 transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-100 group-hover:text-teal-600 transition-colors">
                        {result.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-slate-800 group-hover:text-teal-700 transition-colors">{result.title}</span>
                          <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 group-hover:text-teal-500/60 transition-colors">{result.category}</span>
                        </div>
                        {result.role && <p className="text-[11px] text-slate-500 font-medium">{result.role}</p>}
                      </div>
                    </button>
                  ))}
                </div>
                {searchQuery && filteredResults.length >= 6 && (
                  <div className="px-4 py-2 border-t border-slate-50 bg-slate-50/50">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter text-center">More results available...</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Avatar Dropdown ── */}
          <div className="relative group z-50 flex-shrink-0">
            <button className="flex items-center gap-2 p-1 pl-1.5 pr-3 rounded-full bg-slate-50 border border-slate-200 hover:bg-teal-50 hover:border-teal-200 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-black text-xs shadow-sm">
                JD
              </div>
              <span className="text-sm font-semibold text-slate-600 hidden sm:block">John Doe</span>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2 z-[100]">
              <div className="bg-white/98 backdrop-blur-2xl border border-slate-100 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] overflow-hidden p-2">
                <div className="px-4 py-3 border-b border-slate-100/60 mb-1">
                  <p className="text-sm font-bold text-slate-800">John Doe</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">Patient ID: PAT-84920</p>
                </div>

                <Link to="/user/profile" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-teal-50 text-slate-600 hover:text-teal-600 transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-semibold">My Profile</span>
                </Link>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-semibold">Account Settings</span>
                </button>

                <div className="h-px bg-slate-100 my-1 mx-2" />

                <Link to="/login" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors mt-1">
                  <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm font-semibold">Logout</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
