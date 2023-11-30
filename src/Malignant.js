import React from 'react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';

const Malignant = () => {
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

      {/* Add the small image below h2 */}
      <img
        src="Malignant case (16).jpg"

        style={{ width: '50px', height: '50px' }}
      />

      <button onClick={handlePrint}>Print as PDF</button>

      {/* This is the content to be printed */}
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          <h2>Malignant Component</h2>
          <p>This is a test component for Malignant cases.</p>

          {/* Include the same image in the printed content */}
          <img
            src="Malignant case (16).jpg"
            style={{ width: '50px', height: '50px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Malignant;
