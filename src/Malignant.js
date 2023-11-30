// import React from 'react';

// const Malignant = () => {
//   return (
//     <div>
//       <h2>Malignant Component</h2>
//       <p>This is a test component for Malignant cases.</p>
//     </div>
//   );
// };

// export default Malignant;

import React, { useEffect, useState } from 'react';

const Malignant = () => {
  const [tumorStage, setTumorStage] = useState('');
  const [stageImage, setStageImage] = useState('');

  useEffect(() => {
    // Fetch the tumor stage and image for the Malignant case from your Flask API
    const fetchTumorStageAndImage = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/malignant-info'); // Replace with your API endpoint
        if (response.ok) {
          const result = await response.json();
          setTumorStage(result.tumor_stage);
          setStageImage(result.stage_image);
        } else {
          console.error('Failed to fetch malignant information');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchTumorStageAndImage();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div>
      <h2>Malignant Case</h2>
      {tumorStage && <p>Tumor Stage: {tumorStage}</p>}
      {stageImage && <img src={stageImage} alt="Tumor Stage" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default Malignant;
