// frontend/src/components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8">
        <div className="relative h-24 w-24">
            <div className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-t-green-500 border-gray-600 animate-spin"></div>
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a8.962 8.962 0 01-1.428 1.428 8.962 8.962 0 01-12 0 8.962 8.962 0 01-1.428-1.428 8.962 8.962 0 010-12 8.962 8.962 0 011.428-1.428 8.962 8.962 0 0112 0 8.962 8.962 0 011.428 1.428 8.962 8.962 0 010 12z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
        </div>
        <p className="text-white mt-4 text-lg">Scanning Image...</p>
    </div>
  );
};

export default Loader;