import React from 'react';
import { useReactToPrint } from 'react-to-print';


const Malignant = ({location}) => {
  
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Malignant_Component',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  return (
    <div>
      <h2>Malignant Component</h2>
      <p>This is a test component for Malignant cases.</p>

      

      <button onClick={handlePrint}>Print as PDF</button>

      {/* This is the content to be printed */}
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <h2>Malignant Component</h2>
          <p>This is a test component for Malignant cases.</p>

          
        </div>
      </div>
    </div>
  );
};

export default Malignant;
