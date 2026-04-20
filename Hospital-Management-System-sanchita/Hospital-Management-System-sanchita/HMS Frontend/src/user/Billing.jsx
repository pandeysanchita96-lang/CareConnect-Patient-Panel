import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, ShieldCheck, Smartphone, CheckCircle2, Receipt } from 'lucide-react';
import Pagination from '../components/Pagination';
import ReceiptModal from '../components/ReceiptModal';

// Mock QR Code Component inner pattern
const QRPattern = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-900">
    <path fill="currentColor" d="M0 0h30v30H0zm5 5h20v20H5zM10 10h10v10H10zM70 0h30v30H70zm5 5h20v20H75zM80 10h10v10H80zM0 70h30v30H0zm5 5h20v20H5zM10 80h10v10H10zM40 0h20v10H40zM40 20h10v20H40zM50 10h10v10H50zM60 40h10v20H60zM40 50h10v10H40zM50 60h20v10H50zM40 80h20v10H40zM80 40h20v10H80zM80 60h10v20H80zM90 80h10v20H90zM30 40h10v10H30zM20 50h10v10H20zM30 60h10v10H30zM50 80h10v20H50z" />
  </svg>
);

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

const Billing = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* ─── inline keyframes ─── */
  const keyframes = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

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

    .billing-page * { font-family: 'Inter', system-ui, sans-serif; }
  `;

  const particles = [
    { top: '10%', left: '10%', size: 16, delay: 0 },
    { top: '20%', right: '15%', size: 22, delay: 1 },
    { top: '55%', left: '5%', size: 14, delay: 2.5 },
    { top: '75%', right: '8%', size: 20, delay: 1.5 },
  ];

  const allBilling = [
    { id: 'INV-84920', date: 'Oct 15, 2023', amount: '$150.00', status: 'Unpaid', type: 'Consultation' },
    { id: 'INV-84815', date: 'Sep 22, 2023', amount: '$75.00', status: 'Paid', type: 'Lab Test' },
    { id: 'INV-84702', date: 'Aug 10, 2023', amount: '$210.00', status: 'Paid', type: 'Imaging' },
    { id: 'INV-84650', date: 'Jul 05, 2023', amount: '$45.00', status: 'Paid', type: 'Pharmacy' },
    { id: 'INV-84590', date: 'Jun 18, 2023', amount: '$320.00', status: 'Paid', type: 'Surgery' },
    { id: 'INV-84510', date: 'May 30, 2023', amount: '$90.00', status: 'Unpaid', type: 'Consultation' },
    { id: 'INV-84430', date: 'Apr 12, 2023', amount: '$55.00', status: 'Paid', type: 'Pharmacy' },
  ];

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('Pending');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Reset page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredData = allBilling.filter(item => 
    activeTab === 'Pending' ? item.status === 'Unpaid' : item.status === 'Paid'
  );
  
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 1;
  const billingData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePayNow = (invoice) => {
    setSelectedInvoice(invoice);
    setPaymentModalOpen(true);
    setPaymentSuccess(false);
  };

  const simulatePayment = () => {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentModalOpen(false);
        setPaymentSuccess(false);
        // Refresh or switch to history could happen here in a real app
      }, 2500);
    }, 2000);
  };

  const handleViewReceipt = (invoice) => {
    setSelectedInvoice(invoice);
    setIsReceiptModalOpen(true);
  };

  return (
    <>
      <style>{keyframes}</style>

      <div className="billing-page w-full relative flex flex-col items-center py-12 px-4 sm:px-6 lg:px-10">
        {/* Floating particles */}
        {particles.map((p, i) => {
          const { size, delay, ...pos } = p;
          return <MedicalParticle key={i} style={pos} size={size} delay={delay} />;
        })}

        <div className="w-full relative z-20">
          {/* Header & Tabs */}
          <div 
            className="mb-8 flex flex-col xl:flex-row xl:items-end justify-between gap-6"
            style={{ 
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) forwards' : 'none',
              opacity: mounted ? 1 : 0
            }}
          >
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Billing & Payments</h2>
              <div className="h-1.5 w-24 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #0d9488, transparent)' }}></div>
              
              {/* Tab Navigation */}
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                <button
                  onClick={() => setActiveTab('Pending')}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    activeTab === 'Pending' 
                      ? 'bg-white text-teal-600 shadow-md transform scale-105' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  Pending Bills
                </button>
                <button
                  onClick={() => setActiveTab('History')}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    activeTab === 'History' 
                      ? 'bg-white text-teal-600 shadow-md transform scale-105' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                  }`}
                >
                  Payment History
                </button>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex flex-col justify-center min-w-[160px]">
                 <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mb-1">Total Outstanding</p>
                 <p className="text-3xl font-black text-slate-900">$240.00</p>
              </div>
            </div>
          </div>

          {/* Billing Table Card */}
          <div 
            className="rounded-[32px] overflow-hidden relative shadow-2xl p-6 sm:p-8 lg:p-12"
            style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(30px) saturate(1.5)',
              border: '1px solid rgba(255,255,255,0.8)',
              animation: mounted ? 'fadeInUp 0.8s cubic-bezier(.22,1,.36,1) 0.2s forwards' : 'none',
              opacity: mounted ? 1 : 0
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Invoice ID</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Date</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Description</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Amount</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em]">Status</th>
                    <th className="px-6 py-5 text-xs font-black text-teal-600 uppercase tracking-[0.2em] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {billingData.map((item, idx) => (
                    <tr 
                      key={item.id} 
                      className="group hover:bg-teal-50/50 transition-colors duration-300"
                      style={{ 
                        animation: mounted ? `fadeInUp 0.6s ease-out ${0.3 + idx * 0.1}s both` : 'none'
                      }}
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-teal-600 tracking-wider">{item.id}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-slate-800">{item.date}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-slate-600">{item.type}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-black text-slate-900 tracking-wide">{item.amount}</p>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          item.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        {item.status === 'Unpaid' ? (
                          <button 
                            onClick={() => handlePayNow(item)}
                            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-indigo-600/20 active:translate-y-0"
                          >
                             Pay Now
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleViewReceipt(item)}
                            className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 text-[11px] font-black uppercase tracking-widest hover:bg-emerald-100 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 ml-auto shadow-sm hover:shadow-emerald-500/10 active:translate-y-0"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                             Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>

        <ReceiptModal 
          isOpen={isReceiptModalOpen} 
          onClose={() => setIsReceiptModalOpen(false)} 
          invoiceData={selectedInvoice} 
        />
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {paymentModalOpen && selectedInvoice && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !paymentProcessing && !paymentSuccess && setPaymentModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* PhonePe/RazorPay Styled Header */}
              <div className="bg-indigo-900 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-indigo-300" />
                  <span className="text-white font-black tracking-wide text-lg">SecurePay</span>
                </div>
                {!paymentProcessing && !paymentSuccess && (
                  <button 
                    onClick={() => setPaymentModalOpen(false)}
                    className="p-1.5 bg-indigo-800/50 rounded-full text-indigo-200 hover:text-white hover:bg-indigo-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Payment Details */}
              <div className="p-6">
                {!paymentSuccess ? (
                  <>
                    <div className="text-center mb-6">
                      <p className="text-sm font-bold text-slate-500 mb-1">Payment for {selectedInvoice.type}</p>
                      <h3 className="text-4xl font-black text-slate-900">{selectedInvoice.amount}</h3>
                      <p className="text-xs font-bold text-indigo-600 bg-indigo-50 inline-block px-3 py-1 rounded-full mt-2">ID: {selectedInvoice.id}</p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center justify-center mb-6 relative overflow-hidden group">
                      {paymentProcessing ? (
                        <div className="flex flex-col items-center py-8">
                          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
                          <p className="text-sm font-bold text-slate-600 animate-pulse">Processing Payment...</p>
                        </div>
                      ) : (
                        <>
                          <div className="w-40 h-40 bg-white rounded-xl shadow-sm p-3 mb-4 relative z-10 transition-transform group-hover:scale-105 duration-300">
                             <QRPattern />
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                               <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                                  <QrCode className="w-5 h-5 text-indigo-600" />
                               </div>
                             </div>
                          </div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Scan with any UPI app</p>
                          <div className="flex gap-2 mt-3 items-center opacity-60">
                             {/* Mock UPI app icons via simple colored shapes */}
                             <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
                             <div className="w-6 h-6 rounded-full bg-purple-600 border-2 border-white shadow-sm" />
                             <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                             <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white shadow-sm" />
                          </div>
                        </>
                      )}
                    </div>

                    <button 
                      onClick={simulatePayment}
                      disabled={paymentProcessing}
                      className="w-full py-4 rounded-xl bg-indigo-600 text-white font-black text-sm tracking-wide shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Smartphone className="w-5 h-5" />
                      {paymentProcessing ? 'Processing...' : 'Simulate Payment'}
                    </button>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Payment Successful</h3>
                    <p className="text-slate-500 font-medium text-center mb-6">Your payment of {selectedInvoice.amount} has been received.</p>
                    <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 flex justify-between items-center">
                       <span className="text-sm font-bold text-slate-500">Transaction ID</span>
                       <span className="text-sm font-black text-slate-900">TXN{Math.floor(Math.random() * 100000000)}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Billing;
