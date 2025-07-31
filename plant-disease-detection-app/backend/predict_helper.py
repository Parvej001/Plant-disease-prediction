# predict_helper.py

import tensorflow as tf
import numpy as np
from PIL import Image

MODEL_PATH = "plant_disease_best_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

# The correct class names, copied directly from your training script's output
CLASS_NAMES = [
    'Pepper__bell___Bacterial_spot', 
    'Pepper__bell___healthy', 
    'Potato___Early_blight', 
    'Potato___Late_blight', 
    'Potato___healthy', 
    'Tomato_Bacterial_spot', 
    'Tomato_Early_blight', 
    'Tomato_Late_blight', 
    'Tomato_Leaf_Mold', 
    'Tomato_Septoria_leaf_spot', 
    'Tomato_Spider_mites_Two_spotted_spider_mite', 
    'Tomato__Target_Spot', 
    'Tomato__Tomato_YellowLeaf__Curl_Virus', 
    'Tomato__Tomato_mosaic_virus', 
    'Tomato_healthy'
]

def predict_image(image_path):
    """
    Takes an image path and returns the predicted class and confidence score.
    """
    # 1. Load and resize the image
    img = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    
    # 2. Convert to NumPy array and expand dimensions
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)

    # 3. Preprocess the image exactly as in training
    preprocessed_img = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)

    # 4. Make a prediction
    predictions = model.predict(preprocessed_img)

    # 5. Decode the prediction
    predicted_index = np.argmax(predictions[0])
    predicted_class = CLASS_NAMES[predicted_index]
    confidence = np.max(predictions[0])

    return predicted_class, confidence