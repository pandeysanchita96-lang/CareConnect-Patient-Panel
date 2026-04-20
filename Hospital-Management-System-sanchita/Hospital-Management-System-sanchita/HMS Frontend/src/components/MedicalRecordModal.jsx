import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, FileText, User, Calendar, ShieldCheck, Activity } from 'lucide-react';

const MedicalRecordModal = ({ isOpen, onClose, recordData }) => {
  const [showToast, setShowToast] = React.useState(false);

  if (!isOpen || !recordData) return null;

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
          className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Medical Record Preview</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: REC-00{recordData.id}</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3 h-3" /> Date
                </label>
                <p className="text-sm font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">{recordData.date}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                   <Activity className="w-3 h-3" /> Type
                </label>
                <p className="text-sm font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">{recordData.type}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <User className="w-3 h-3" /> Referring Doctor
                </label>
                <p className="text-sm font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">{recordData.doctor}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
               <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Description & Findings</h4>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    recordData.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    recordData.status === 'Verified' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {recordData.status}
                  </span>
               </div>
               
               <div className="bg-blue-50/30 rounded-2xl p-6 border border-blue-100/50">
                  <p className="text-xl font-black text-slate-900 tracking-tight mb-4">{recordData.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Primary Diagnosis</p>
                        <p className="text-sm font-bold text-slate-800 tracking-wide">Patient shows stable vital signs. Internal review confirms no acute abnormalities.</p>
                     </div>
                     <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Recommendations</p>
                        <p className="text-sm font-bold text-slate-800 tracking-wide">Continue prescribed routine. Follow-up consultation in 4 weeks.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
               <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Verified Authenticity</p>
                  <p className="text-xs font-medium text-emerald-600/80">This document is digitally signed by the Care Connect Laboratory Network.</p>
               </div>
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
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-blue-600 text-white font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 text-sm"
            >
              <Download className="w-4 h-4" />
              Download Record
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
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
               <Download className="w-5 h-5 animate-bounce" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-white mb-0.5">Downloading PDF</h4>
               <p className="text-[11px] text-slate-300 font-medium">Your medical record is being prepared.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default MedicalRecordModal;
