import React, { useState, useRef } from 'react';
import Loader from './Loader';
import { FaTimes } from 'react-icons/fa';

const Predict = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [result, setResult] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
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
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (res.ok) {
        // MODIFIED: Store the entire result object, including the remedy
        setResult({
          name: data.prediction.replace(/__/g, ' ').replace(/_/g, ' '), // Also replace single underscores
          confidence: (data.confidence * 100).toFixed(2),
          remedy: data.remedy, // Store the remedy
        });
      } else {
        setError(data.error || 'Prediction failed.');
      }
    } catch (err) {
      setError("Prediction failed. Is the backend server running?");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 bg-opacity-80 border border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto transition-all relative text-white max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10">
          <FaTimes />
        </button>

        <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Disease Detection Center</h2>
            <p className="text-gray-300 mb-8">Upload a clear image of a plant leaf to get an instant diagnosis.</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* ... your form code (no changes here) ... */}
          <div
            className="border-2 border-dashed border-gray-500 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-700 hover:bg-opacity-50 transition-colors"
            onClick={() => fileInputRef.current.click()}
          >
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} ref={fileInputRef} />
            <div className="flex flex-col items-center text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <p className="font-semibold">{previewUrl ? 'Change Image' : 'Click to upload an image'}</p>
              <p className="text-xs mt-1">PNG, JPG, JPEG</p>
            </div>
          </div>

          {previewUrl && <img src={previewUrl} alt="Preview" className="mt-6 max-w-xs mx-auto rounded-lg shadow-md" />}

          <div className="mt-8">
            <button type="submit" disabled={loading || !image} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-500 transition-all">
              {loading ? 'Analyzing...' : 'Predict Disease'}
            </button>
          </div>
        </form>

        {loading && <Loader />}
        
        {/* ... error display code (no changes here) ... */}
        {!loading && error && (
          <div className="mt-8 p-5 bg-red-900 bg-opacity-50 rounded-lg">
            <h3 className="text-xl font-semibold text-white">Error:</h3>
            <p className="text-lg text-red-300 font-medium mt-2">{error}</p>
          </div>
        )}

        {/* MODIFIED: Display the result, including the new remedy section */}
        {!loading && result && (
          <div className="mt-8 p-5 bg-gray-900 bg-opacity-70 rounded-lg text-left">
            <h3 className="text-xl font-semibold text-white mb-4">Prediction Result</h3>
            <p className="text-lg text-green-300 font-medium">
              <strong>Status:</strong> {result.name}
            </p>
            <p className="text-md text-gray-400 mb-4">
              <strong>Confidence:</strong> {result.confidence}%
            </p>
            <div className="border-t border-gray-700 pt-4 mt-4">
              <h4 className="text-lg font-semibold text-white">Recommended Measures:</h4>
              <p className="text-gray-300 mt-2">{result.remedy}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;