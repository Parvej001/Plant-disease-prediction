// frontend/src/pages/Home.jsx

import React, { useState } from 'react';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import Result from '../components/Result';
import ImagePreview from '../components/ImagePreview';

const Home = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(''); // Clear previous result
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append('file', image);

    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.result);
      } else {
        setResult(data.error || 'Prediction failed.');
      }
    } catch (err) {
      console.error("Prediction failed", err);
      setResult("Prediction failed. Is the backend server running?");
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
          <Result result={result} loading={loading} />
        </form>
      </div>
       <footer className="text-center mt-8 text-sm text-gray-500">
        <p>Powered by React, Flask & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default Home;