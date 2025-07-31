// frontend/src/App.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials'; // <-- Import new component
import Faq from './components/Faq';                 // <-- Import new component
import Predict from './components/Predict';
import Contact from './components/Contact';
import Footer from './components/Footer';

const videoUrl = "/project1-background.mp4";

const SectionWrapper = ({ children, id }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8 }}
  >
    {children}
  </motion.div>
);

function App() {
  const [isPredictModalOpen, setPredictModalOpen] = useState(false);

  const openPredictModal = () => setPredictModalOpen(true);
  const closePredictModal = () => setPredictModalOpen(false);

  return (
    <div className="font-sans">
      <div id="video-background">
        <video autoPlay loop muted>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10">
        <Navbar onPredictClick={openPredictModal} />
        <main>
          <SectionWrapper id="home"><Hero onGetStartedClick={openPredictModal} /></SectionWrapper>
          <SectionWrapper id="how-it-works"><HowItWorks /></SectionWrapper>
          <SectionWrapper id="features"><Features /></SectionWrapper>
          <SectionWrapper id="testimonials"><Testimonials /></SectionWrapper> {/* <-- Add new section */}
          <SectionWrapper id="faq"><Faq /></SectionWrapper>                 {/* <-- Add new section */}
          <SectionWrapper id="contact"><Contact /></SectionWrapper>
        </main>
        <Footer />
      </div>

      {isPredictModalOpen && <Predict onClose={closePredictModal} />}
    </div>
  );
}

export default App;