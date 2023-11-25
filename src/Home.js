import React, { useState } from 'react';

const Home = () => {
  const [image, setImage] = useState(null);

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

  const handleImageUpload = () => {
    // In a real-world scenario, you would handle the image upload to a server here
    alert('Image uploaded successfully!');
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Selected" style={{ maxWidth: '100%' }} />}
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default Home;
