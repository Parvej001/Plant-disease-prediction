// frontend/src/components/Faq.jsx

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-xl font-semibold text-white">{question}</h3>
        <div className="text-green-400 text-xl">
          {isOpen ? <FaMinus /> : <FaPlus />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-300 mt-4 pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: 'How accurate is the disease detection?',
      answer: 'Our AI model is trained on a vast and verified dataset, achieving high accuracy rates. However, it should be used as a preliminary diagnostic tool, and we recommend consulting a local agricultural expert for critical cases.',
    },
    {
      question: 'What types of plants and diseases can it identify?',
      answer: 'The model can identify 38 different diseases across 14 common plant species, including tomatoes, potatoes, apples, and corn. We are continuously working to expand our database.',
    },
    {
      question: 'Is my data and are my uploaded images kept private?',
      answer: 'Absolutely. We prioritize your privacy. Uploaded images are used solely for the purpose of prediction and are not stored or shared. The process is completely anonymous.',
    },
    {
      question: 'What should I do after a disease is detected?',
      answer: 'Once a disease is identified, we recommend researching the specific condition to understand treatment options, which may include organic remedies, fungicides, or changes in plant care practices.',
    },
  ];

  return (
    <section id="faq" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto"></div>
        </div>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FaqItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;