import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Pill, User, Calendar, ClipboardCheck } from 'lucide-react';

const PrescriptionModal = ({ isOpen, onClose, prescriptionData }) => {
  const [showToast, setShowToast] = React.useState(false);

  if (!isOpen || !prescriptionData) return null;

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Prescription Details</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{prescriptionData.medication}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-10 space-y-8 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-teal-600 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-3 h-3" /> Prescribing Doctor
                </label>
                <p className="text-sm font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">{prescriptionData.doctor}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-teal-600 uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Date Issued
                </label>
                <p className="text-sm font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">{prescriptionData.date}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
               <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Medication & Dosage</h4>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    prescriptionData.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    prescriptionData.status === 'Completed' ? 'bg-teal-50 text-teal-600 border-teal-100' :
                    'bg-red-50 text-red-500 border-red-100'
                  }`}>
                    {prescriptionData.status}
                  </span>
               </div>
               
               <div className="bg-teal-50/50 rounded-2xl p-6 border border-teal-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100/30 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative z-10 flex items-start gap-4">
                     <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-teal-600 shadow-sm">
                        <ClipboardCheck className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-lg font-black text-teal-900 tracking-tight">{prescriptionData.medication}</p>
                        <p className="text-sm font-bold text-teal-700/70 mt-1 uppercase tracking-wider">{prescriptionData.dosage}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instructions & Remarks</h4>
               <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Take the medication exactly as prescribed. Do not skip doses. If you experience any severe side-effects like rashes or difficulty breathing, contact your doctor immediately or visit the emergency department of Care Connect Hospital.
               </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-white transition-all text-sm"
            >
              Close
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-slate-900 text-white font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 text-sm"
            >
              <Printer className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-slate-900/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700/50"
          >
            <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400">
               <Download className="w-5 h-5 animate-bounce" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-white mb-0.5">Generating PDF</h4>
               <p className="text-[11px] text-slate-300 font-medium">Your prescription is being prepared.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default PrescriptionModal;
