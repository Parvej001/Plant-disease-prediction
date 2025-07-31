// frontend/src/components/Hero.jsx
import React from 'react';

const Hero = ({ onGetStartedClick }) => {
  return (
    // FIX #1: This className is crucial for vertical centering
    <section id="home" className="h-screen flex items-center justify-center text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
              Advanced Crop Health Monitoring
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Utilizing cutting-edge AI to detect plant diseases instantly. Upload an image of a leaf and get an accurate diagnosis in seconds.
            </p>
            <button
              onClick={onGetStartedClick}
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>
          {/* Image Content */}
          <div className="flex justify-center">
            {/* FIX #2: Using the correct image URL */}
            <img 
              src="https://images.pexels.com/photos/4505469/pexels-photo-4505469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Farmer with crop" 
              className="rounded-full w-80 h-80 md:w-96 md:h-96 object-cover shadow-2xl border-4 border-green-600"
              onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/222/FFF?text=Farmer'; }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;