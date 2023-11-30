from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import numpy as np
import cv2
import io
import joblib  # Add this import statement
import matplotlib.pyplot as plt



def categorize_stage(tumor_size):
        if tumor_size < 3:
            return 'Stage 1'
        elif 3 <= tumor_size <= 7:
            return 'Stage 2'
        else:
            return 'Stage 3'


def categorize_stage_colour(tumor_size):
        if tumor_size < 3:
            return (0, 140, 255)  # Yellow
        elif 3 <= tumor_size < 7:
            return (255, 255, 0)  # Saffron
        else:
            return (255, 0, 0)    # Red



def run_stage_processing(image):
    try:
        image_np = np.array(image)

        # Ensure the image has three channels (for RGB)
        if len(image_np.shape) == 2:
            image_np = cv2.cvtColor(image_np, cv2.COLOR_GRAY2RGB)

        image_gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)
        _, binary_image = cv2.threshold(image_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        contours, _ = cv2.findContours(binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        filtered_mask = np.zeros_like(binary_image)
        min_area = 900000

        for contour in contours:
            area = cv2.contourArea(contour)
            if area < min_area:
                cv2.drawContours(filtered_mask, [contour], 0, 255, -1)

        filtered_image = cv2.bitwise_and(binary_image, filtered_mask)
        contours, _ = cv2.findContours(filtered_image, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        contour_image = np.zeros_like(filtered_image)
        area_threshold = 1000

        filtered_contours = [cnt for cnt in contours if cv2.contourArea(cnt) < area_threshold]
        cv2.drawContours(contour_image, filtered_contours, -1, 255, 2)

        lung_image = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
        contours, _ = cv2.findContours(contour_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        max_diameter = 0
        longest_contour = None

        for contour in contours:
            (x, y), radius = cv2.minEnclosingCircle(contour)
            diameter = 2 * radius

            if diameter > max_diameter:
                max_diameter = diameter
                longest_contour = contour

        dpi = 25
        length_in_cm = (max_diameter / dpi) * 2.54

        if longest_contour is not None:
            longest_contour_image = np.zeros_like(lung_image)
            color = categorize_stage_colour(length_in_cm)
            cv2.drawContours(longest_contour_image, [longest_contour], -1, color, thickness=cv2.FILLED)

            # Add text below the image
            result_image = cv2.addWeighted(lung_image, 0.8, longest_contour_image, 0.2, 0)
            # text = f"Stage: {categorize_stage(length_in_cm)}"
            # cv2.putText(result_image, text, (50, result_image.shape[0] - 20), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2, cv2.LINE_AA)

            return result_image
        else:
            print("No contour with a diameter found")
            return None

    except Exception as e:
        print(f"Error in run_stage_processing: {str(e)}")
        return None


def config_stage(image):
    try:
        image_np = np.array(image)

        # Ensure the image has three channels (for RGB)
        if len(image_np.shape) == 2:
            image_np = cv2.cvtColor(image_np, cv2.COLOR_GRAY2RGB)

        image_gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)
        _, binary_image = cv2.threshold(image_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        contours, _ = cv2.findContours(binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        filtered_mask = np.zeros_like(binary_image)
        min_area = 900000

        for contour in contours:
            area = cv2.contourArea(contour)
            if area < min_area:
                cv2.drawContours(filtered_mask, [contour], 0, 255, -1)

        filtered_image = cv2.bitwise_and(binary_image, filtered_mask)
        contours, _ = cv2.findContours(filtered_image, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

        contour_image = np.zeros_like(filtered_image)
        area_threshold = 1000

        filtered_contours = [cnt for cnt in contours if cv2.contourArea(cnt) < area_threshold]
        cv2.drawContours(contour_image, filtered_contours, -1, 255, 2)

        lung_image = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
        contours, _ = cv2.findContours(contour_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        max_diameter = 0
        longest_contour = None

        for contour in contours:
            (x, y), radius = cv2.minEnclosingCircle(contour)
            diameter = 2 * radius

            if diameter > max_diameter:
                max_diameter = diameter
                longest_contour = contour

        dpi = 25
        length_in_cm = (max_diameter / dpi) * 2.54

        if longest_contour is not None:
            longest_contour_image = np.zeros_like(lung_image)
            color = categorize_stage_colour(length_in_cm)
            cv2.drawContours(longest_contour_image, [longest_contour], -1, color, thickness=cv2.FILLED)

            # Add text below the image
            result_image = cv2.addWeighted(lung_image, 0.8, longest_contour_image, 0.2, 0)
            text = f"Stage: {categorize_stage(length_in_cm)}"
            cv2.putText(result_image, text, (50, result_image.shape[0] - 20), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2, cv2.LINE_AA)

            return categorize_stage(length_in_cm)
        else:
            print("No contour with a diameter found")
            return None

    except Exception as e:
        print(f"Error in run_stage_processing: {str(e)}")
        return None

# def run_stage_processing(image):
#     try:
#         image_np = np.array(image)
        
#         # Ensure the image has three channels (for RGB)
#         if len(image_np.shape) == 2:
#             image_np = cv2.cvtColor(image_np, cv2.COLOR_GRAY2RGB)

#         image_gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)
#         _, binary_image = cv2.threshold(image_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

#         contours, _ = cv2.findContours(binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
#         filtered_mask = np.zeros_like(binary_image)
#         min_area = 900000

#         for contour in contours:
#             area = cv2.contourArea(contour)
#             if area < min_area:
#                 cv2.drawContours(filtered_mask, [contour], 0, 255, -1)

#         filtered_image = cv2.bitwise_and(binary_image, filtered_mask)
#         contours, _ = cv2.findContours(filtered_image, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

#         contour_image = np.zeros_like(filtered_image)
#         area_threshold = 1000

#         filtered_contours = [cnt for cnt in contours if cv2.contourArea(cnt) < area_threshold]
#         cv2.drawContours(contour_image, filtered_contours, -1, 255, 2)

#         lung_image = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
#         contours, _ = cv2.findContours(contour_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#         max_diameter = 0
#         longest_contour = None

#         for contour in contours:
#             (x, y), radius = cv2.minEnclosingCircle(contour)
#             diameter = 2 * radius

#             if diameter > max_diameter:
#                 max_diameter = diameter
#                 longest_contour = contour

#         dpi = 25
#         length_in_cm = (max_diameter / dpi) * 2.54

#         if longest_contour is not None:
#             longest_contour_image = np.zeros_like(lung_image)
#             print(length_in_cm)
#             color = categorize_stage_colour(length_in_cm)
#             cv2.drawContours(longest_contour_image, [longest_contour], -1, color, thickness=cv2.FILLED)
#             result_image = cv2.addWeighted(lung_image, 0.8, longest_contour_image, 0.2, 0)
#             result_stage = categorize_stage(length_in_cm)
#             return result_image
#         else:
#             print("No contour with a diameter found")
#             return None

    # except Exception as e:
    #     print(f"Error in run_stage_processing: {str(e)}")
    #     return None




#     #Assuming you have a lung image available
# lung_image_path = '/Users/ayanaggarwal/Desktop/capstone_project/Dataset/archive/The IQ-OTHNCCD lung cancer dataset/The IQ-OTHNCCD lung cancer dataset/Malignant cases/Malignant case (499).jpg'
# lung_image = cv2.imread(lung_image_path)

# # Convert the lung image to RGB format
# lung_image_rgb = cv2.cvtColor(lung_image, cv2.COLOR_BGR2RGB)

# #Open the lung image as a PIL Image
# lung_pil_image = Image.fromarray(lung_image_rgb)

# # Run the stage processing function
# result_image = run_stage_processing(lung_pil_image)
# plt.imshow(result_image)
# plt.show()





# def run_stage_processing(image):
#     # Convert the PIL Image to a NumPy array
#     image_np = np.array(image)

#     # Convert the image to grayscale
#     image_gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)

#     # Apply Otsu's thresholding
#     _, binary_image = cv2.threshold(image_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

#     # Find contours in the binary image
#     contours, _ = cv2.findContours(binary_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#     # Create a filtered mask based on contour area
#     filtered_mask = np.zeros_like(binary_image)
#     min_area = 900000  # Minimum area threshold

#     for contour in contours:
#         area = cv2.contourArea(contour)
#         if area < min_area:
#             cv2.drawContours(filtered_mask, [contour], 0, 255, -1)

#     # Apply the filtered mask to extract the tumor region
#     filtered_image = cv2.bitwise_and(binary_image, filtered_mask)

#     # Removing Lung Boundary
#     contours, _ = cv2.findContours(binary_image, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

#     contour_image = np.zeros_like(binary_image)
#     area_threshold = 1000  # Adjust the threshold as needed

#     filtered_contours = [cnt for cnt in contours if cv2.contourArea(cnt) < area_threshold]

#     cv2.drawContours(contour_image, filtered_contours, -1, 255, 2)

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

#     def categorize_stage_colour(tumor_size):
#         if tumor_size < 3:
#             return (255, 140, 0)  # Yellow
#         elif 3 <= tumor_size < 7:
#             return (0, 255, 255)  # Saffron
#         else:
#             return (0, 0, 255)    # Red

#     def categorize_stage(tumor_size):
#         if tumor_size < 3:
#             return 'Stage 1'
#         elif 3 <= tumor_size <= 7:
#             return 'Stage 2'
#         else:
#             return 'Stage 3'

#     if longest_contour is not None:
#         longest_contour_image = np.zeros_like(lung_image)
#         color = categorize_stage_colour(length_in_cm)
#         cv2.drawContours(longest_contour_image, [longest_contour], -1, color, thickness=cv2.FILLED)
#         result_image = cv2.addWeighted(lung_image, 0.8, longest_contour_image, 0.2, 0)
#         plt.imshow(result_image)
#         plt.title('Processed Image')
#         plt.show()
#         return result_image
#     else:
#         print("No contour with a diameter found")
#         return None
    
