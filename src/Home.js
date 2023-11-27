// // import React, { useState } from 'react';

// // const Home = () => {
// //   const [image, setImage] = useState(null);

// //   const handleImageChange = (event) => {
// //     const selectedImage = event.target.files[0];

// //     if (selectedImage) {
// //       const reader = new FileReader();

// //       reader.onloadend = () => {
// //         setImage(reader.result);
// //       };

// //       reader.readAsDataURL(selectedImage);
// //     }
// //   };

// //   const handleImageUpload = () => {
// //     // In a real-world scenario, you would handle the image upload to a server here
// //     alert('Image uploaded successfully!');
// //   };

// //   return (
// //     <div>
// //       <h2>Upload an Image</h2>
// //       <input type="file" accept="image/*" onChange={handleImageChange} />
// //       {image && <img src={image} alt="Selected" style={{ maxWidth: '100%' }} />}
// //       <button onClick={handleImageUpload}>Upload Image</button>
// //     </div>
// //   );
// // };

// // export default Home;


// import React, { useState } from 'react';

// const Home = () => {
//   const [image, setImage] = useState(null);

//   const handleImageChange = (event) => {
//     const selectedImage = event.target.files[0];

//     if (selectedImage) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         setImage(reader.result);
//       };

//       reader.readAsDataURL(selectedImage);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!image) {
//       alert('Please select an image');
//       return;
//     }

//     try {
//       // Convert the base64 image data to a Blob
//       const blob = await fetch(image).then((res) => res.blob());

//       // Create a FormData object and append the image file
//       const formData = new FormData();
//       formData.append('file', blob, 'image.jpg');  // 'image.jpg' is an example, use any filename

//       // Make a POST request to the Flask backend for image upload
//       const response = await fetch('http://127.0.0.1:5000', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(result.message);
//       } else {
//         alert('Image upload failed');
//       }
//     } catch (error) {
//       console.error('Error during image upload:', error);
//       alert('Image upload failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Upload an Image</h2>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       {image && <img src={image} alt="Selected" style={{ maxWidth: '100%' }} />}
//       <button onClick={handleImageUpload}>Upload Image</button>
//     </div>
//   );
// };

// export default Home;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [image, setImage] = useState(null);
  const [predictedLabel, setPredictedLabel] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
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
      // Convert the base64 image data to a Blob
      const blob = await fetch(image).then((res) => res.blob());

      // Create a FormData object and append the image file
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');  // 'image.jpg' is an example, use any filename

      // Make a POST request to the Flask backend for image upload
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setPredictedLabel(result.predicted_label);
        console.log("okay")
        // Navigate based on the predicted label
        if (result.predicted_label === 'Bengin cases') {
          navigate('/bengin');
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
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Selected" style={{ maxWidth: '100%' }} />}
      <button onClick={handleImageUpload}>Upload Image</button>
      {predictedLabel && <p>Predicted Label: {predictedLabel}</p>}
    </div>
  );
};

export default Home;