import React from 'react';
import html2pdf from 'html2pdf.js';

const PdfDownload = ({ templateId, lastData }) => {
  const handleDownload = () => {
    const element = document.getElementById('resume'); // ID of the resume container
    const options = {
      margin: 0.5,
      filename: `resume-template-${templateId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf()
      .from(element)
      .set(options)
      .save();
  };

  return (
    <button onClick={handleDownload} className="btn-download">
      Download PDF
    </button>
  );
};

export default PdfDownload;
