from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import numpy as np
import joblib
import subprocess
import base64
from io import BytesIO

# Load the machine learning model
model = joblib.load('beni_mali.pkl')

def get_tumor_stage(image_path):
    stage_command = f'python stage.py "{image_path}"'
    stage_output = subprocess.check_output(stage_command, shell=True).decode('utf-8').strip()
    return stage_output

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the uploaded image from the request
        uploaded_file = request.files['file']
        
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

        tumor_stage = None
        img_data = None

        # Call stage.py only if the predicted label is "Malignant"
        if predicted_label == 'Malignant cases':
            tumor_stage = get_tumor_stage(uploaded_file)
            
            # Add logic to convert the output image to base64
            img_data = base64.b64encode(open('output_image.png', 'rb').read()).decode('utf-8')

        return jsonify({'predicted_label': predicted_label, 'tumor_stage': tumor_stage, 'img_data': img_data})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
