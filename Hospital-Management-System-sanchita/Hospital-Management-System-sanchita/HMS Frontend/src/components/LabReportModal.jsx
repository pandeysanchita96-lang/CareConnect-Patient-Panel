import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, CheckCircle2 } from 'lucide-react';

const LabReportModal = ({ isOpen, onClose, reportData }) => {
  const [showToast, setShowToast] = React.useState(false);

  if (!isOpen || !reportData) return null;

  const handleDownload = () => {
    // Simulate PDF generation/download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `Lab_Report_${reportData.id}.pdf`;
    
    // Show toast message
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
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
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Report Preview</h3>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleDownload}
                className="p-2.5 rounded-xl hover:bg-teal-50 text-teal-600 transition-colors" 
                title="Download PDF"
              >
                <Download className="w-5 h-5" />
              </button>
              <button 
                className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
                onClick={onClose}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Report Content - Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-8 sm:p-12">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200 shadow-sm p-8 sm:p-12 relative overflow-hidden ring-1 ring-slate-100">
              
              {/* Report Header (Branding) */}
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
                <div className="space-y-1">
                  <h1 className="text-3xl font-black text-blue-900 tracking-tighter flex items-center gap-2">
                    <span className="p-1 bg-blue-900 text-white rounded-md">DRLOGY</span> 
                    PATHOLOGY LAB
                  </h1>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest italic flex items-center gap-2">
                    Accurate | Caring | Instant
                  </p>
                </div>
                <div className="text-right text-[10px] font-bold text-slate-400 leading-tight">
                  <p>0123456789 | 9876543210</p>
                  <p>drlogypathlab@drlogy.com</p>
                  <p>123, SHIVAM BUNGALOW, S.G. ROAD, MUMBAI</p>
                </div>
              </div>

              {/* Patient Info Section */}
              <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="font-bold text-slate-400 uppercase text-[10px]">Patient Name</span>
                    <span className="font-black text-slate-900">Yash M. Patel</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="font-bold text-slate-400 uppercase text-[10px]">Age / Sex</span>
                    <span className="font-black text-slate-900">21 Years / Male</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="font-bold text-slate-400 uppercase text-[10px]">PID / MR No.</span>
                    <span className="font-black text-slate-900">{reportData.id}</span>
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="font-bold text-slate-400 uppercase text-[10px]">Registered on</span>
                    <span className="font-black text-slate-900">{reportData.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="font-bold text-slate-400 uppercase text-[10px]">Reported on</span>
                    <span className="font-black text-slate-900">{reportData.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1">
                    <span className="font-bold text-slate-400 uppercase text-[10px]">Ref By.</span>
                    <span className="font-black text-slate-900">Dr. Hiren Shah</span>
                  </div>
                </div>
              </div>

              {/* Test Title */}
              <div className="bg-slate-900 text-white py-2 text-center text-sm font-black uppercase tracking-[0.3em] mb-6">
                Complete Blood Count (CBC)
              </div>

              {/* Results Table */}
              <table className="w-full text-xs mb-10">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-3 text-left font-black uppercase tracking-widest text-slate-400">Investigation</th>
                    <th className="py-3 text-left font-black uppercase tracking-widest text-slate-400">Result</th>
                    <th className="py-3 text-left font-black uppercase tracking-widest text-slate-400">Ref. Range</th>
                    <th className="py-3 text-left font-black uppercase tracking-widest text-slate-400">Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="group">
                    <td className="py-4 font-bold text-slate-700">Hemoglobin (Hb)</td>
                    <td className="py-4 font-black text-blue-600">12.5</td>
                    <td className="py-4 font-medium text-slate-400">13.0 - 17.0</td>
                    <td className="py-4 font-medium text-slate-400">g/dL</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-slate-700">RBC Count</td>
                    <td className="py-4 font-black text-slate-900">5.2</td>
                    <td className="py-4 font-medium text-slate-400">4.5 - 5.5</td>
                    <td className="py-4 font-medium text-slate-400">mill/cumm</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-slate-700">WBC Count</td>
                    <td className="py-4 font-black text-slate-900">9000</td>
                    <td className="py-4 font-medium text-slate-400">4000 - 11000</td>
                    <td className="py-4 font-medium text-slate-400">cumm</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-slate-700 text-[10px] pl-4 italic">Neutrophils</td>
                    <td className="py-4 font-black text-slate-900">60</td>
                    <td className="py-4 font-medium text-slate-400">50 - 62</td>
                    <td className="py-4 font-medium text-slate-400">%</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-slate-700 text-[10px] pl-4 italic">Lymphocytes</td>
                    <td className="py-4 font-black text-slate-900">31</td>
                    <td className="py-4 font-medium text-slate-400">20 - 40</td>
                    <td className="py-4 font-medium text-slate-400">%</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-bold text-slate-700">Platelet Count</td>
                    <td className="py-4 font-black text-amber-600">158000</td>
                    <td className="py-4 font-medium text-slate-400">150000 - 410000</td>
                    <td className="py-4 font-medium text-slate-400">cumm</td>
                  </tr>
                </tbody>
              </table>

              {/* Footer Section (Signatures) */}
              <div className="mt-auto pt-10 border-t-2 border-slate-900 flex justify-between items-end">
                <div className="text-[10px] space-y-4">
                  <div className="space-y-1">
                    <p className="font-black text-slate-800 underline uppercase italic">Medical Lab Technician</p>
                    <p className="font-bold text-slate-400">(DMLT, B.Sc)</p>
                  </div>
                </div>
                <div className="text-[10px] space-y-4 text-center">
                  <div className="space-y-1">
                    <p className="font-black text-slate-800 underline uppercase italic">Dr. Payal Shah</p>
                    <p className="font-bold text-slate-400">(MD, Pathologist)</p>
                  </div>
                </div>
                <div className="text-[10px] space-y-4 text-right">
                  <div className="space-y-1">
                    <p className="font-black text-slate-800 underline uppercase italic">Dr. Vimal Shah</p>
                    <p className="font-bold text-slate-400">(MD, Pathologist)</p>
                  </div>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="absolute top-36 right-44 opacity-20 transform rotate-12 select-none pointer-events-none">
                <div className="w-24 h-24 border-4 border-slate-900 flex items-center justify-center font-black text-[8px] text-center p-2 uppercase">
                   Digital QR for Verification
                </div>
              </div>

            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="px-8 py-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-white transition-all"
            >
              Close Preview
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-teal-600 text-white font-black hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
            >
              <Printer className="w-4 h-4" />
              Generate PDF Report
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-slate-900/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[320px] max-w-md border border-slate-700/50"
          >
            <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400">
               <Download className="w-5 h-5 animate-bounce" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-white mb-0.5">Downloading PDF</h4>
               <p className="text-[11px] text-slate-300 font-medium">Your report will be ready shortly.</p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="ml-auto p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default LabReportModal;
