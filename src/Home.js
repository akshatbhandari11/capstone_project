import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';


const homePageTheme = {
  background: '/images/background2.jpg',
  textColor: '#001f3f',
  buttonColor: '#001f3f',
  buttonHoverColor: '#003366',
  headerBackground: '#001f3f',
  headerColor: '#fff',
  footerBackground: '#001f3f',
  footerColor: '#fff',
};


const Header = styled.header`
  background-color: ${(props) => props.theme.headerBackground};
  color: ${(props) => props.theme.headerColor};
  font-size: 15px;
  padding: 2px;
  width: 100%;
  margin-top: -50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  margin-bottom: 20px;
`;

const LogoutButton = styled.button`
  padding: 10px 10px;
  font-size: 1rem;
  background-color: #008B8B;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 1200px;
  margin-top: 50px;


  &:hover {
    background-color: ${(props) => props.theme.buttonHoverColor};
  }
`;


const HomePageContainer = styled.div`
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  //background-image: url(${(props) => props.theme.background});
  background-size: cover;
  background-position: center;
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    /* Specific to this particular image */
    left: 50%;
    margin-left: -512px; /* 50% */
  }
`;

const ContentContainer = styled.div`
  /* Add any specific styling for the content container */
  max-width: 600px;
  width: 100%;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 400px;
`;

const Footer = styled.footer`
  background-color: ${(props) => props.theme.footerBackground};
  color: ${(props) => props.theme.footerColor};
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  padding: 10px;
`;

const Home = () => {
  const [image, setImage] = useState(null);
  const [predictedLabel, setPredictedLabel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stageImage, setStageImage] = useState(null);
  const [resultStage, setResultStage] = useState(null);  // Add state for result_stage

  const navigate = useNavigate();



  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
        // setPredictedLabel(null); // Clear previous predictions when a new image is selected
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
      // setLoading(true);

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
        // if (result.predicted_label === 'Benign cases') {
        //   navigate('/benign');
        // } else if (result.predicted_label === 'Malignant cases') {
        //   navigate('/malignant');
        // } else if (result.predicted_label === 'Normal cases') {
        //   navigate('/normal');
        // }
        if (result.predicted_label === 'Malignant cases') {
          const stageResponse = await fetch('http://127.0.0.1:5000/process_stage', {
            method: 'POST',
            body: formData,
          });

          if (stageResponse.ok) {
            const stageBlob = await stageResponse.blob();
            setStageImage(URL.createObjectURL(stageBlob));

            // Fetch result_stage from the new config_stage endpoint
            const configStageResponse = await fetch('http://127.0.0.1:5000/config_stage', {
              method: 'POST',
              body: formData,
            });

            if (configStageResponse.ok) {
              const configStageResult = await configStageResponse.json();
              setResultStage(configStageResult.result_stage);
            } else {
              console.log('Configuring stage failed');
              alert('Configuring stage failed');
            }
          } else {
            console.log("process failed");
            alert('Stage processing failed');
          }
        } else {
          // Reset stageImage and resultStage if the predicted label is not 'Malignant cases'
          setStageImage(null);
          setResultStage(null);

          // Navigate based on predicted labels
          if (result.predicted_label === 'Bengin cases') {
            navigate('/bengin');
          } else if (result.predicted_label === 'Normal cases') {
            navigate('/normal');
          }
        }
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Error during image upload:', error);
      alert('Image upload failed');
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  const handleReset = () => {
    setImage(null);
    setPredictedLabel(null);
  };
  const handleLogoutClick = () => {
    // Implement the logout logic here, e.g., clear user data, navigate to login page
    navigate('/'); // Navigate to the login page after logout
  };

  return (
    <ThemeProvider theme={homePageTheme}>
      <HomePageContainer>
      <Header>
      <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
      <Title>Lung Cancer Detection and Staging</Title>
      </Header>
      
        

        <ContentContainer>
          {/* Display the user's name and logout button if logged in */}
        
          <h2>Upload Medical Image</h2>
          <p>Select an image for analysis:</p>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {/* Introduce the selected-image-container */}
          {image && (
            <div className="selected-image-container">
              <img src={image} alt="Selected" className="selected-image" />
            </div>
          )}

          <button onClick={handleImageUpload} disabled={!image || loading}>
            {loading ? 'Uploading...' : 'Analyze'}
          </button>
          <button onClick={handleReset}>Reset</button>

          {predictedLabel && (
            <p className="predicted-label">Predicted Diagnosis: {predictedLabel}</p>
          )}
          {stageImage && (
        <div>
          <h2>Tumor Stage Image</h2>
          <img src={stageImage} alt="Tumor Stage" style={{ maxWidth: '100%' }} />
          {resultStage && <p>Result Stage: {resultStage}</p>}
        </div>
      )}
        </ContentContainer>

        <Footer>
          {/* Add your footer content here */}
          <p>&copy; Team 103</p>
        </Footer>
      </HomePageContainer>
    </ThemeProvider>
  );
};

export default Home;
