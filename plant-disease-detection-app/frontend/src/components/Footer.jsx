
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-50 text-center py-5">
      <p className="text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Plantify. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;