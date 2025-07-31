#Plant Disease Detection and Remedy Recommendation System 🌿

This is a full-stack web application designed to help farmers and gardeners identify plant diseases from leaf images. The application uses a deep learning model trained on the renowned PlantVillage dataset to classify 15 different types of plant diseases and healthy leaves across three species (Tomato, Potato, and Pepper).

Upon detecting a disease, the application provides the user with a confidence score and recommended remedial measures to manage the condition.

✨ Key Features
AI-Powered Diagnosis: Utilizes a MobileNetV2 deep learning model for accurate and fast classification.

Comprehensive Disease Coverage: Trained to detect 15 distinct classes from the PlantVillage dataset.

Instant Feedback: Provides the disease name, the model's confidence level, and actionable treatment advice.

User-Friendly Interface: A clean, responsive, and intuitive UI built with React and Tailwind CSS for easy image uploads.

Full-Stack Architecture: A robust backend powered by Flask and a modern frontend built with React.

🔬 Model & Dataset Details
The core of this application is a convolutional neural network (CNN) built using transfer learning on the MobileNetV2 architecture, pre-trained on ImageNet.

Dataset: The model was trained on the public PlantVillage dataset.

Detectable Classes: The model can identify the following 15 classes:

Pepper, bell - Bacterial spot

Pepper, bell - healthy

Potato - Early blight

Potato - Late blight

Potato - healthy

Tomato - Bacterial spot

Tomato - Early blight

Tomato - Late blight

Tomato - Leaf Mold

Tomato - Septoria leaf spot

Tomato - Spider mites (Two-spotted spider mite)

Tomato - Target Spot

Tomato - Tomato Yellow Leaf Curl Virus

Tomato - Tomato mosaic virus

Tomato - healthy

🛠️ Technology Stack
Backend:

Python

Flask (API Server)

TensorFlow & Keras (Deep Learning)

Pillow (Image Processing)

Flask-CORS

Frontend:

React.js

Vite (Build Tool)

Tailwind CSS (Styling)

📂 Project Structure
plant-disease-detection-app/
├── backend/
│   ├── uploads/
│   ├── app.py
│   ├── predict_helper.py
│   ├── requirements.txt
│   └── plant_disease_best_model.h5
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── dataset/
├── train_model.py
└── README.md
🚀 Local Setup and Installation
Prerequisites
Python (3.8+) & pip

Node.js & npm

1. Backend Setup
Bash

# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
# Windows
python -m venv venv
venv\Scripts\activate
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Install dependencies from requirements.txt
pip install -r requirements.txt

# Run the Flask server
python app.py
The backend will be running on http://127.0.0.1:5000.

2. Frontend Setup
Open a new terminal for the frontend.

Bash

# Navigate to the frontend directory
cd frontend

# Install npm packages
npm install

# Run the React development server
npm run dev
The frontend will be running on http://localhost:5173 (or a similar port).

Usage
Open the frontend URL in your web browser.

Click the button to open the prediction modal.

Upload an image of a plant leaf.

Click "Predict Disease".

The application will display the diagnosis, confidence score, and recommended treatment.
