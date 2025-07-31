// frontend/src/pages/Home.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import Result from '../components/Result';
import ImagePreview from '../components/ImagePreview';

// Best practice: Use an environment variable for the API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

const Home = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  // FIX 1: Change result state to hold an object
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null); // Clear previous result object
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append('file', image);

    setLoading(true);
    setResult(null);
    setError('');

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (res.ok) {
        // FIX 2: Process the 'prediction', 'confidence', and 'remedy' keys
        const formattedResult = {
          name: data.prediction.replace(/__/g, ' ').replace(/_/g, ' '),
          confidence: (data.confidence * 100).toFixed(2),
          remedy: data.remedy,
        };
        setResult(formattedResult);
      } else {
        setError(data.error || 'Prediction failed.');
      }
    } catch (err) {
      console.error("Prediction failed", err);
      setError("Prediction failed. Is the backend server running?");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg transition-all">
        <Header />
        <form onSubmit={handleSubmit}>
          <ImageUpload onImageChange={handleImageChange} loading={loading} hasImage={!!image} />
          <ImagePreview previewUrl={previewUrl} />
          {/* FIX 3: Pass the result object and error to the Result component */}
          <Result result={result} loading={loading} error={error} />
        </form>
      </div>
      <footer className="text-center mt-8 text-sm text-gray-500">
        <p>Powered by React, Flask & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default Home;