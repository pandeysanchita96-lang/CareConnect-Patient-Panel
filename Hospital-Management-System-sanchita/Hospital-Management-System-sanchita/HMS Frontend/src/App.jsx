import { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import { motion } from 'framer-motion';

const AUTH_PATHS = ['/login', '/register'];

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const isAuthPage = AUTH_PATHS.includes(location.pathname);

  if (isAuthPage) {
    return (
      <div
        className="min-h-screen w-full"
        style={{ background: 'linear-gradient(135deg, #042f2e 0%, #0f3d3a 25%, #134e4a 50%, #115e59 75%, #0f766e 100%)' }}
      >
        <AppRoutes />
      </div>
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #042f2e 0%, #0f3d3a 25%, #134e4a 50%, #115e59 75%, #0f766e 100%)' }}
    >
      {/* Sidebar — fixed on left */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(prev => !prev)}
      />

      {/* Main panel — animates its left margin with sidebar width */}
      <motion.div
        className="flex flex-col flex-1 overflow-hidden my-3 mr-3 rounded-3xl"
        animate={{ marginLeft: sidebarCollapsed ? 72 : 288 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: 'rgba(255,255,255,0.93)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 50px rgba(4,47,46,0.3)',
          border: '1px solid rgba(255,255,255,0.4)',
        }}
      >
        {/* Navbar lives inside the panel — no sidebar overlap */}
        <Navbar />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <AppRoutes />
        </div>
      </motion.div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
