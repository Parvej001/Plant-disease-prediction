// frontend/src/components/Features.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-2xl p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Features = () => {
  const featuresData = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636L4.222 4.222m15.556 15.556L18.364 18.364M5.636 18.364L4.222 19.778m15.556-15.556L18.364 5.636" /></svg>,
      title: 'High Accuracy',
      description: 'Our model is trained on the extensive PlantVillage dataset, achieving high precision in disease identification.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      title: 'Instant Results',
      description: 'No waiting required. Upload your image and receive an immediate diagnosis to take prompt action.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: 'Broad Coverage',
      description: 'Capable of identifying 38 different plant diseases across a wide variety of common crops and plants.',
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Plantify?</h2>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-16"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;