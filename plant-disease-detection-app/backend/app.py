# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from predict_helper import predict_image

# --- Initialization & Configuration ---
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# NEW: Create a dictionary for disease remedies.
# You should replace these with accurate, well-researched remedies.
REMEDIES = {
    "Pepper__bell___Bacterial_spot": "Use copper-based fungicides. Remove and destroy infected plant parts. Avoid overhead watering.",
    "Potato___Early_blight": "Apply fungicides containing mancozeb or chlorothalonil. Ensure proper spacing for air circulation. Mulch around plants.",
    "Potato___Late_blight": "This is a serious disease. Apply fungicides like metalaxyl or chlorothalonil preventatively. Destroy infected plants immediately.",
    "Tomato_Bacterial_spot": "Spray with copper-based bactericides. Prune lower leaves to improve air circulation. Rotate crops and avoid working with plants when they are wet.",
    "Tomato_Leaf_Mold": "Ensure good ventilation, especially in greenhouses. Reduce humidity. Apply fungicides if necessary.",
    "Tomato_Spider_mites_Two_spotted_spider_mite": "Use miticides or insecticidal soaps. Introduce predatory mites. Regularly spray plants with water to disrupt mites.",
    "Tomato__Target_Spot": "Prune affected leaves. Apply a fungicide. Improve air circulation and avoid wetting the foliage.",
    "Tomato__Tomato_YellowLeaf__Curl_Virus": "This is a viral disease with no cure. Remove and destroy infected plants immediately to prevent spread by whiteflies. Control whitefly populations.",
    "Tomato__Tomato_mosaic_virus": "No cure for viral diseases. Remove and destroy infected plants. Wash hands and tools thoroughly to prevent spreading."
    # Add other diseases here...
}


@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file:
        try:
            filename = secure_filename(file.filename)
            file_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(file_path)

            predicted_class, confidence = predict_image(file_path)
            
            # MODIFIED: Look up the remedy from our dictionary.
            # .get() provides a default message if the class is not found (e.g., for healthy plants).
            remedy = REMEDIES.get(predicted_class, "No specific measures required for healthy plants.")
            
            # MODIFIED: Add the remedy to the JSON response.
            result = {
                "prediction": predicted_class,
                "confidence": float(confidence),
                "remedy": remedy 
            }
            
            return jsonify(result)

        except Exception as e:
            print(f"An error occurred during prediction: {e}")
            return jsonify({'error': 'An internal error occurred during prediction.'}), 500

    return jsonify({'error': 'Invalid file'}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5000)