import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Home = () => {
  const [image, setImage] = useState(null);
  const [predictedLabel, setPredictedLabel] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
        setPredictedLabel(null); // Clear previous predictions when a new image is selected
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert('Please select an image');
      return;
    }

    try {
      setLoading(true);

      // Convert the base64 image data to a Blob
      const blob = await fetch(image).then((res) => res.blob());

      // Create a FormData object and append the image file
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg'); // 'image.jpg' is an example, use any filename

      // Make a POST request to the Flask backend for image upload
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setPredictedLabel(result.predicted_label);

        // Navigate based on the predicted label
        if (result.predicted_label === 'Benign cases') {
          navigate('/benign');
        } else if (result.predicted_label === 'Malignant cases') {
          navigate('/malignant');
        } else if (result.predicted_label === 'Normal cases') {
          navigate('/normal');
        }
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      alert('Image upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPredictedLabel(null);
  };

  return (
    <div className="doctor-upload">
      <Header/>
      <h2>Upload Medical Image</h2>
      <p>Select an image for analysis:</p>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Selected" className="selected-image" />}
      <button onClick={handleImageUpload} disabled={!image || loading}>
        {loading ? 'Uploading...' : 'Analyze Image'}
      </button>
      <button onClick={handleReset}>Reset</button>
      {predictedLabel && <p className="predicted-label">Predicted Diagnosis: {predictedLabel}</p>}
    </div>
  );
};

export default Home;
