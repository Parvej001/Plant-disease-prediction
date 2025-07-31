// frontend/src/components/Testimonials.jsx

import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ image, name, title, quote }) => {
  return (
    <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-2xl p-8 text-center h-full flex flex-col">
      <div className="flex-grow">
        <FaQuoteLeft className="text-green-500 text-3xl mb-4 mx-auto" />
        <p className="text-gray-300 italic mb-6">"{quote}"</p>
      </div>
      <div className="flex-shrink-0">
        <img src={image} alt={name} className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-green-500" />
        <h4 className="text-white font-bold text-lg">{name}</h4>
        <p className="text-gray-400">{title}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonialsData = [
    {
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'John D.',
      title: 'Commercial Farmer',
      quote: 'Plantify has been a game-changer for our farm. The instant and accurate disease detection has saved us time and money, leading to a healthier, more productive harvest.',
    },
    {
      image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'Maria S.',
      title: 'Organic Gardener',
      quote: 'As a home gardener, I was always worried about identifying issues with my plants. This tool is incredibly easy to use and gives me the confidence to keep my garden thriving.',
    },
    {
      image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      name: 'David L.',
      title: 'Agricultural Consultant',
      quote: 'I recommend Plantify to all my clients. It’s a powerful, accessible first line of defense against common crop diseases. The technology is impressive and genuinely useful.',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trusted by Growers</h2>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-16"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;