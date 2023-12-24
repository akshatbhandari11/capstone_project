from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import numpy as np
import cv2
import io
import joblib
from stage_try import *
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)
model = joblib.load('beni_mali.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        uploaded_file = request.files['file']
        image = Image.open(uploaded_file)
        image = image.convert('L')
        image = image.resize((256, 256))
        test_image = np.array(image).reshape(-1, 256, 256, 1) / 255.0

        predictions = model.predict(test_image)
        predicted_class = np.argmax(predictions)

        class_labels = ['Bengin cases', 'Malignant cases', 'Normal cases']
        predicted_label = class_labels[predicted_class]
        print(predicted_label)
        return jsonify({'predicted_label': predicted_label})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/process_stage', methods=['POST'])
def process_stage():
    try:
        uploaded_file = request.files['file']
        image = Image.open(uploaded_file)
        # image = image.convert('L')
        # image = image.resize((256, 256))

        result_image = run_stage_processing(image)


        if result_image is not None:
            _, result_image_encoded = cv2.imencode('.jpg', result_image)
            result_image_bytes = result_image_encoded.tobytes()

            return send_file(
                io.BytesIO(result_image_bytes),
                mimetype='image/jpeg',
                as_attachment=True,
                download_name='stage_result.jpg'
            )
        else:
            return jsonify({'error': 'No contour found'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/config_stage', methods=['POST'])
def config_stage_endpoint():
    try:
        uploaded_file = request.files['file']
        image = Image.open(uploaded_file)
        
        # Call the config_stage function to get the result_stage
        result_stage = config_stage(image)

        if result_stage is not None:
            # Return the result_stage in the JSON response
            print(result_stage)
            return jsonify({'result_stage': result_stage})
        else:
            return jsonify({'error': 'No contour found'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)



# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from PIL import Image
# import numpy as np
# import joblib

# app = Flask(__name__)
# CORS(app)

# # Load the machine learning model
# model = joblib.load('beni_mali.pkl')

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get the uploaded image from the request
#         uploaded_file = request.files['file']
        
#         # Read and preprocess the image
#         image = Image.open(uploaded_file)
#         image = image.convert('L')  # Convert to grayscale
#         image = image.resize((256, 256))
#         test_image = np.array(image).reshape(-1, 256, 256, 1) / 255.0

#         # Make predictions
#         predictions = model.predict(test_image)
#         predicted_class = np.argmax(predictions)

#         class_labels = ['Bengin cases', 'Malignant cases', 'Normal cases']
#         predicted_label = class_labels[predicted_class]
#         print(predicted_label)
#         return jsonify({'predicted_label': predicted_label})

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)


# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# from PIL import Image
# import numpy as np
# import cv2
# import io
# import joblib  # Add this import statement
# import matplotlib.pyplot as plt


# app = Flask(__name__)
# CORS(app)
# model = joblib.load('beni_mali.pkl')


# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         # Get the uploaded image from the request
#         uploaded_file = request.files['file']
        
#         # Read and preprocess the image
#         image = Image.open(uploaded_file)
#         image = image.convert('L')  # Convert to grayscale
#         image = image.resize((256, 256))
#         test_image = np.array(image).reshape(-1, 256, 256, 1) / 255.0

#         # Make predictions
#         predictions = model.predict(test_image)
#         predicted_class = np.argmax(predictions)

#         class_labels = ['Bengin cases', 'Malignant cases', 'Normal cases']
#         predicted_label = class_labels[predicted_class]
#         print(predicted_label)
#         return jsonify({'predicted_label': predicted_label})

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


# @app.route('/process_stage', methods=['POST'])
# def process_stage():
#     print("in process stage")
#     try:
#         # Get the uploaded image from the request
#         uploaded_file = request.files['file']
        
#         # Read and preprocess the image
#         image = Image.open(uploaded_file)
#         image = image.convert('L')  # Convert to grayscale
#         image = image.resize((256, 256))

#         # Apply the logic from stage.py
#         result_image = run_stage_processing(image)

#         # Convert result image to bytes
#         _, result_image_encoded = cv2.imencode('.jpg', result_image)
#         result_image_bytes = result_image_encoded.tobytes()

#         return send_file(
#             io.BytesIO(result_image_bytes),
#             mimetype='image/jpeg',
#             as_attachment=True,
#             download_name='stage_result.jpg'
#         )

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
    

# async def categorize_stage_colour(tumor_size):
#     if tumor_size < 3:
#        return (255, 140, 0)  # Yellow
#     elif 3 <= tumor_size < 7:
#         return (0, 255, 255)  # Saffron
#     else:
#         return (0, 0, 255)    # Red


# async def categorize_stage(tumor_size):
#     if tumor_size < 3:
#         return 'Stage 1'
#     elif 3 <= tumor_size <= 7:
#         return 'Stage 2'
#     else:
#         return 'Stage 3'

#     def run_stage_processing(image):
#     # Convert the PIL Image to a NumPy array
#     print("check1")
#     image_np = np.array(image)

#     # Convert the image to grayscale
#     image_gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)

#     # Apply Otsu's thresholding
#     _, binary_image = cv2.threshold(image_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
#     print("check2")
#     # Find contours in the binary image
#     contours, _ = cv2.findContours(binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#     # Create a filtered mask based on contour area
#     filtered_mask = np.zeros_like(binary_image)
#     min_area = 900000  # Minimum area threshold

#     for contour in contours:
#         area = cv2.contourArea(contour)
#         if area < min_area:
#             cv2.drawContours(filtered_mask, [contour], 0, 255, -1)
#     print("check3")
#     # Apply the filtered mask to extract the tumor region
#     filtered_image = cv2.bitwise_and(binary_image, filtered_mask)

#     # Removing Lung Boundary
#     contours, _ = cv2.findContours(binary_image, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

#     contour_image = np.zeros_like(binary_image)
#     area_threshold = 1000  # Adjust the threshold as needed

#     filtered_contours = [cnt for cnt in contours if cv2.contourArea(cnt) < area_threshold]

#     cv2.drawContours(contour_image, filtered_contours, -1, 255, 2)
#     print("check4")
#     # Detecting Stage
#     lung_image = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

#     contours, _ = cv2.findContours(contour_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#     max_diameter = 0
#     longest_contour = None

#     for contour in contours:
#         (x, y), radius = cv2.minEnclosingCircle(contour)
#         diameter = 2 * radius

#         if diameter > max_diameter:
#             max_diameter = diameter
#             longest_contour = contour

#     dpi = 25  # DPI (dots per inch)
#     length_in_cm = (max_diameter / dpi) * 2.54

#     print("check5")
#     if longest_contour is not None:
#         longest_contour_image = np.zeros_like(lung_image)
#         color = categorize_stage_colour(length_in_cm)
#         cv2.drawContours(longest_contour_image, [longest_contour], -1, color, thickness=cv2.FILLED)
#         result_image = cv2.addWeighted(lung_image, 0.8, longest_contour_image, 0.2, 0)
#         print(1)
#         plt.imshow(result_image)
#         plt.show()
#         return result_image
#     else:
#         print("No contour with a diameter found")
#         return None



# if __name__ == '__main__':
#     app.run(debug=True)
    
