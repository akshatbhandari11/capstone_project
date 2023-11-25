import joblib
from PIL import Image
import numpy as np
import cv2

test_image = cv2.imread('/Users/ayanaggarwal/Desktop/capstone_project/Dataset/archive/The IQ-OTHNCCD lung cancer dataset/The IQ-OTHNCCD lung cancer dataset/Normal cases/Normal case (1).jpg', 0)
test_image = cv2.resize(test_image, (256, 256))
test_image = np.array(test_image).reshape(-1, 256, 256, 1) / 255.0
# Load the model
model = joblib.load('beni_mali.pkl')
predictions = model.predict(test_image)
predicted_class = np.argmax(predictions)

class_labels = ['Bengin cases', 'Malignant cases', 'Normal cases']
predicted_label = class_labels[predicted_class]

print("Predicted class:", predicted_label)