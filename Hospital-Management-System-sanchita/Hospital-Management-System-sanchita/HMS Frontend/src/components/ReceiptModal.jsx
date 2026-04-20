import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, CheckCircle2, CreditCard, Receipt, User, Calendar } from 'lucide-react';

const ReceiptModal = ({ isOpen, onClose, invoiceData }) => {
  const [showToast, setShowToast] = React.useState(false);

  if (!isOpen || !invoiceData) return null;

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
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Payment Receipt</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{invoiceData.id}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Receipt Content */}
          <div className="p-8 sm:p-10 space-y-8 max-h-[70vh] overflow-y-auto relative">
             {/* Watermark */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-30deg] select-none">
                <h1 className="text-9xl font-black text-slate-900">PAID</h1>
             </div>

             <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                <div className="space-y-1">
                   <h2 className="text-2xl font-black text-slate-900 tracking-tighter">CARE CONNECT</h2>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hospital & Research Center</p>
                </div>
                <div className="text-right">
                   <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                      Payment Successful
                   </span>
                   <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Issued on: {invoiceData.date}</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-1">
                         <User className="w-3 h-3 text-teal-600" /> Patient Details
                      </label>
                      <p className="text-sm font-bold text-slate-900">Yash M. Patel</p>
                      <p className="text-xs text-slate-500 font-medium tracking-tight mt-0.5">PID: PT-82910 | Age: 21 | Male</p>
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-1">
                         <Calendar className="w-3 h-3 text-teal-600" /> Billing Date
                      </label>
                      <p className="text-sm font-bold text-slate-900">{invoiceData.date}</p>
                   </div>
                </div>
                <div className="space-y-4 text-right">
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-1 justify-end">
                         <CreditCard className="w-3 h-3 text-teal-600" /> Method
                      </label>
                      <p className="text-sm font-bold text-slate-900 italic tracking-tight">UPI Payment / SecurePay</p>
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-1 justify-end">
                         <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Status
                      </label>
                      <p className="text-sm font-black text-emerald-600 uppercase tracking-widest">PAID IN FULL</p>
                   </div>
                </div>
             </div>

             <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-inner">
                <table className="w-full text-xs">
                   <thead>
                      <tr className="bg-slate-100/50 border-b border-slate-200">
                         <th className="px-6 py-4 text-left font-black text-slate-500 uppercase tracking-widest">Service Description</th>
                         <th className="px-6 py-4 text-right font-black text-slate-500 uppercase tracking-widest">Amount</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr className="border-b border-slate-100">
                         <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-800">{invoiceData.type}</p>
                            <p className="text-[10px] text-slate-400 font-medium">Standard medical {invoiceData.type.toLowerCase()} services</p>
                         </td>
                         <td className="px-6 py-4 text-right text-sm font-black text-slate-900">
                            {invoiceData.amount}
                         </td>
                      </tr>
                   </tbody>
                   <tfoot>
                      <tr className="bg-white/50">
                         <td className="px-6 py-4 text-right font-bold text-slate-500 uppercase text-[10px] tracking-widest">Subtotal</td>
                         <td className="px-6 py-4 text-right text-sm font-bold text-slate-800">{invoiceData.amount}</td>
                      </tr>
                      <tr className="bg-white/50">
                         <td className="px-6 py-4 text-right font-bold text-slate-500 uppercase text-[10px] tracking-widest">Tax (GST 5%)</td>
                         <td className="px-6 py-4 text-right text-sm font-bold text-slate-800">$0.00</td>
                      </tr>
                      <tr className="bg-emerald-50/50">
                         <td className="px-6 py-5 text-right font-black text-slate-900 uppercase text-xs tracking-[0.2em]">Grand Total</td>
                         <td className="px-6 py-5 text-right text-lg font-black text-emerald-600">{invoiceData.amount}</td>
                      </tr>
                   </tfoot>
                </table>
             </div>

             <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 border border-dashed border-slate-200">
                <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center font-black text-[8px] text-center p-1 uppercase opacity-40">
                   Digital QR Verification
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                   This is a computer generated document and does not require a physical signature. For verification, please scan the QR code available on our digital platform. Thank you for choosing Care Connect.
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
              className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-emerald-600 text-white font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 text-sm"
            >
              <Download className="w-4 h-4" />
              Download Receipt
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
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
               <Download className="w-5 h-5 animate-bounce" />
            </div>
            <div>
               <h4 className="text-sm font-bold text-white mb-0.5">Generating Receipt</h4>
               <p className="text-[11px] text-slate-300 font-medium">Your PDF is being prepared for download.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default ReceiptModal;
