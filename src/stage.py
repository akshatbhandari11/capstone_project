import sys
import cv2
import numpy as np
import matplotlib.pyplot as plt

import sys
import cv2
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
import base64

def get_tumor_stage(image_path):
    # ... (your existing code)

    if longest_contour is not None:
        longest_contour_image = np.zeros_like(lung_image)
        color = categorize_stage_colour(length_in_cm)
        cv2.drawContours(longest_contour_image, [longest_contour], -1, color, thickness=cv2.FILLED)
        result_image = cv2.addWeighted(lung_image, 0.8, longest_contour_image, 0.2, 0)

        # Convert the image to bytes
        img_bytes = BytesIO()
        plt.imsave(img_bytes, result_image, format='png')
        img_bytes.seek(0)
        img_base64 = base64.b64encode(img_bytes.read()).decode('utf-8')

        return img_base64  # Return the base64-encoded image
    else:
        print("No contour with a diameter found")
        return None
