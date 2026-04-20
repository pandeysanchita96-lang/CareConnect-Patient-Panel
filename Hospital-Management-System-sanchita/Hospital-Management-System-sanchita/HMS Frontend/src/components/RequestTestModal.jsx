import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Activity, Calendar, Clock, AlertCircle, CheckCircle2, FlaskConical } from 'lucide-react';

const RequestTestModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);
  const [urgency, setUrgency] = useState('Routine');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableTests = [
    { id: 1, name: 'Complete Blood Count (CBC)', category: 'Hematology', price: '$45' },
    { id: 2, name: 'Lipid Profile', category: 'Biochemistry', price: '$60' },
    { id: 3, name: 'Thyroid Function Test (TFT)', category: 'Endocrinology', price: '$85' },
    { id: 4, name: 'Blood Glucose (Fasting)', category: 'Metabolic', price: '$20' },
    { id: 5, name: 'Liver Function Test (LFT)', category: 'Hepatology', price: '$75' },
    { id: 6, name: 'Kidney Function Test (KFT)', category: 'Nephrology', price: '$70' },
    { id: 7, name: 'Vitamin D & B12', category: 'Nutritional', price: '$110' },
    { id: 8, name: 'HbA1c', category: 'Diabetes', price: '$40' },
  ];

  const filteredTests = availableTests.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTest = (test) => {
    if (selectedTests.find(t => t.id === test.id)) {
      setSelectedTests(selectedTests.filter(t => t.id !== test.id));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTests.length === 0) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setSelectedTests([]);
        setSearchTerm('');
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-xl shadow-teal-500/20">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Request New Test</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Select from available diagnostics</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200/50 rounded-xl transition-colors text-slate-400">
               <X className="w-6 h-6" />
            </button>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Search & Selection */}
              <div className="space-y-4">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  <input 
                    type="text"
                    placeholder="Search by test name or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {filteredTests.map((test) => {
                    const isSelected = selectedTests.find(t => t.id === test.id);
                    return (
                      <button
                        key={test.id}
                        type="button"
                        onClick={() => toggleTest(test)}
                        className={`p-4 rounded-2xl border transition-all duration-300 text-left flex items-center justify-between group ${
                          isSelected 
                            ? 'bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/20 scale-[0.98]' 
                            : 'bg-white border-slate-100 hover:border-teal-500/30 hover:bg-teal-50/30'
                        }`}
                      >
                        <div>
                          <p className={`text-sm font-black tracking-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>{test.name}</p>
                          <p className={`text-[10px] font-bold uppercase tracking-wider mt-1 ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>{test.category}</p>
                        </div>
                        <span className={`text-xs font-black ${isSelected ? 'text-teal-50' : 'text-teal-600'}`}>{test.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Urgency Level</label>
                  <div className="flex gap-2 p-1 bg-slate-50 rounded-xl border border-slate-100">
                    {['Routine', 'Urgent', 'Stat'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setUrgency(level)}
                        className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${
                          urgency === level 
                            ? 'bg-white text-teal-600 shadow-sm' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Preferred Slot</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                       <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input type="text" placeholder="Date" className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none" />
                    </div>
                    <div className="flex-1 relative">
                       <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input type="text" placeholder="Time" className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
                 <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                 <p className="text-[11px] text-amber-700 font-bold leading-relaxed">
                   Note: Some specialized tests may require a minimum fasting period of 8-12 hours. Please check individual test instructions after confirmation.
                 </p>
              </div>
            </form>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
               <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="w-24 h-24 bg-teal-500 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-teal-500/40"
               >
                  <CheckCircle2 className="w-12 h-12" />
               </motion.div>
               <h3 className="text-3xl font-black text-slate-900 mb-2">Request Submitted!</h3>
               <p className="text-slate-500 font-medium max-w-xs">Your test request for {selectedTests.length} item(s) has been successfully sent to the diagnostics department.</p>
            </div>
          )}

          {/* Footer */}
          {!isSuccess && (
            <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total selected</p>
                <p className="text-lg font-black text-teal-600">{selectedTests.length} Tests</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={onClose}
                  className="px-6 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={selectedTests.length === 0 || isSubmitting}
                  onClick={handleSubmit}
                  className="px-10 py-3 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-xl shadow-slate-900/20 hover:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-[0.98] flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Activity className="w-4 h-4" />
                  )}
                  {isSubmitting ? 'Processing...' : 'Submit Request'}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RequestTestModal;
