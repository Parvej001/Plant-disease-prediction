// frontend/src/components/Logo.jsx

import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      {/* SVG Icon: A leaf integrated with a circuit/tech pattern */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-3"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
          stroke="#4ade80" // Green-400
          strokeWidth="1.5"
        />
        <path
          d="M12 18V14C12 12.9 12.9 12 14 12H15.5M12 6V10C12 11.1 11.1 12 10 12H8.5"
          stroke="#a3a3a3" // Gray-400
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 12L17 10.5M8.5 12L7 13.5"
          stroke="#a3a3a3" // Gray-400
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-white text-2xl font-bold">Plantify</span>
    </div>
  );
};

export default Logo;