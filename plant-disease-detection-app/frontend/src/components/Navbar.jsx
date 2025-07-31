// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import Logo from './Logo';

const Navbar = ({ onPredictClick }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: 'home', text: 'Home' },
    { to: 'how-it-works', text: 'How It Works' },
    { to: 'features', text: 'Features' },
    { to: 'testimonials', text: 'Testimonials' }, // <-- Added new link
    { to: 'faq', text: 'FAQ' },                   // <-- Added new link
    { to: 'contact', text: 'Contact Us' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black bg-opacity-70 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} spy={true} smooth={true} offset={-80} duration={500} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" activeClass="bg-green-600 text-white">
                  {link.text}
                </Link>
              ))}
              <button onClick={onPredictClick} className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-green-700 transition-all">
                Predict
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;