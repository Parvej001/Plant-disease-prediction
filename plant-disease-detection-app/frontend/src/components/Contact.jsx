// frontend/src/components/Contact.jsx

import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      // IMPORTANT: Replace this URL with your own Formspree endpoint URL!
      const response = await fetch('https://formspree.io/f/mjkowjpq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-black bg-opacity-20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-12"></div>
        <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
          Have questions, feedback, or a proposal? We'd love to hear from you.
        </p>

        <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto text-left">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full bg-gray-900 bg-opacity-50 text-white p-4 rounded-lg border-2 border-transparent focus:outline-none focus:border-green-500 transition-all" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full bg-gray-900 bg-opacity-50 text-white p-4 rounded-lg border-2 border-transparent focus:outline-none focus:border-green-500 transition-all" />
            </div>
            <div className="mt-6">
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="5" required className="w-full bg-gray-900 bg-opacity-50 text-white p-4 rounded-lg border-2 border-transparent focus:outline-none focus:border-green-500 transition-all"></textarea>
            </div>
            <div className="mt-8 text-center">
              <button type="submit" className="bg-green-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-green-700 hover:scale-105 transform transition-all duration-300">
                Send Message
              </button>
            </div>
            {status && <p className="text-center text-white mt-4">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;