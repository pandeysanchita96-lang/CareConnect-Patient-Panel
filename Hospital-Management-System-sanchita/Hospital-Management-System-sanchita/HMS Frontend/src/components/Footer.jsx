import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500 mt-auto">
      &copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.
    </footer>
  );
};

export default Footer;
