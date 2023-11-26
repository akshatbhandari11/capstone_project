import React, { useState } from 'react';
import './CSSstyles/faceRecognitionDemo.css';

function FaceRecognitionDemo() {
  const [result, setResult] = useState({
    jsonResult: '',
    accuracyResult: '',
    frameNumberResult: '',
    timestampResult: '',
  });

  const [integerInput, setIntegerInput] = useState('');

  async function processPhotoAndVideo() {
    const uploadForm = new FormData(document.getElementById('uploadForm'));
    const fetchURL = 'http://127.0.0.1:8000/process_photo_and_video';

    try {
      const response = await fetch(fetchURL, {
        method: 'POST',
        body: uploadForm,
      });

      if (response.ok) {
        const resultData = await response.json();

        if (resultData !== undefined) {
          setResult({
            jsonResult: JSON.stringify(resultData, null, 2),
            accuracyResult: `Best Match Accuracy: ${resultData.best_match_accuracy}`,
            frameNumberResult: `Best Match Frame Number: ${resultData.best_match_frame_number}`,
            timestampResult: `Best Match Timestamp: ${resultData.best_match_timestamp}`,
            frameNumberResult5: `Best 5 Match Frame Number: ${resultData.top_5_matches}`,
          });

          console.log('best_match_accuracy:', resultData.best_match_accuracy);
          console.log('best_match_frame_number:', resultData.best_match_frame_number);
          console.log('best_match_timestamp:', resultData.best_match_timestamp);
        } else {
          console.error('Unexpected response format:', resultData);
        }
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleProcess = async () => {
    // Validate the integer input (add more validation if needed)
    if (!Number.isInteger(parseInt(integerInput))) {
      alert('Please enter a valid integer.');
      return;
    }

    // Create a FormData object for photo and video files
    const formData = new FormData(document.getElementById('uploadForm'));
    formData.append('image_number', integerInput);

    try {
      const response = await fetch('http://127.0.0.1:8000/get_image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.blob();

        // Display the result image on the frontend
        const resultImage = document.getElementById('resultImage');
        if (resultImage) {
          resultImage.src = URL.createObjectURL(result);
        } else {
          console.error('Element with id "resultImage" not found.');
        }

        // Handle other result information as needed
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="face-recognition-demo">
      <h1>Face Recognition Demo</h1>

      <form id="uploadForm">
        <label htmlFor="photo">Upload Photo:</label>
        <input type="file" id="photo" name="photo" accept="image/*" required />
        <br />
        <label htmlFor="video">Upload Video:</label>
        <input type="file" id="video" name="video" accept="video/*" required />
        <br />
        <label htmlFor="integerInput">Image Number:</label>
        <input
          type="number"
          id="integerInput"
          name="image_number"
          required
          value={integerInput}
          onChange={(e) => setIntegerInput(e.target.value)}
        />
        <br />
        <button type="button" onClick={processPhotoAndVideo}>
          Process
        </button>
        <button type="button" onClick={handleProcess}>
          showFrame
        </button>
      </form>

      <div id="result">
        <h2>Result:</h2>
        
        <p id="accuracyResult">{result.accuracyResult}</p>
        <p id="frameNumberResult">{result.frameNumberResult}</p>
        <p id="timestampResult">{result.timestampResult}</p>
        <img id="resultImage" alt="Result Image" />
      </div>
    </div>
  );
}

export default FaceRecognitionDemo;