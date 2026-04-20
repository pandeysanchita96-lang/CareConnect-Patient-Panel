import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// User
import UserDashboard from '../user/Dashboard';
import BookAppointment from '../user/BookAppointment';
import Profile from '../user/Profile';
import Prescriptions from '../user/Prescriptions';
import MedicalRecords from '../user/MedicalRecords';
import UserBilling from '../user/Billing';
import LabReports from '../user/LabReports';

// Common
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* User Routes */}
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/book-appointment" element={<BookAppointment />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/user/prescriptions" element={<Prescriptions />} />
      <Route path="/user/medical-records" element={<MedicalRecords />} />
      <Route path="/user/billing" element={<UserBilling />} />
      <Route path="/user/lab-reports" element={<LabReports />} />

      {/* Redirect legacy admin routes */}
      <Route path="/admin/*" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
