from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import joblib
import cv2

app = Flask(__name__)

# Load the machine learning model
model = joblib.load('beni_mali.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the uploaded image from the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        uploaded_file = request.files['file']
        print(uploaded_file)
        if uploaded_file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Read and preprocess the image
        image = Image.open(uploaded_file)
        image = image.convert('L')  # Convert to grayscale
        image = image.resize((256, 256))
        test_image = np.array(image).reshape(-1, 256, 256, 1) / 255.0

        # Make predictions
        predictions = model.predict(test_image)
        predicted_class = np.argmax(predictions)

        class_labels = ['Bengin cases', 'Malignant cases', 'Normal cases']
        predicted_label = class_labels[predicted_class]
        print(predicted_label)

        return jsonify({'predicted_label': predicted_label}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
