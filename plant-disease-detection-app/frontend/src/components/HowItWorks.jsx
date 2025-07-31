// frontend/src/components/HowItWorks.jsx

import React from 'react';

// Icon for Step 1: Upload
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

// Icon for Step 2: Analyze
const AnalyzeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// Icon for Step 3: Result
const ResultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


const HowItWorks = () => {
  const steps = [
    {
      icon: <UploadIcon />,
      title: '1. Upload Your Image',
      description: 'Simply click the upload area and select a clear, well-lit photo of the plant leaf you are concerned about.',
    },
    {
      icon: <AnalyzeIcon />,
      title: '2. AI-Powered Analysis',
      description: 'Our advanced AI model, trained on thousands of images, analyzes the visual patterns and symptoms in your photo.',
    },
    {
      icon: <ResultIcon />,
      title: '3. Receive Instant Diagnosis',
      description: 'Get an accurate, easy-to-understand result in seconds, helping you take the right steps to protect your plants.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-black bg-opacity-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Simple Steps to a Healthy Crop</h2>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-full p-6 mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;