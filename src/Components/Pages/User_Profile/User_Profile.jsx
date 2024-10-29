import React, { useContext, useRef } from "react";
import { saveAs } from 'file-saver'; // Import the file-saver library
import { AuthContext } from "../../Providers/AuthProvider";
import ResumeMe from "../Resume_Templates/templatesColllection/ResumeMe";
import JobRecom from "../../../important/JobRecom";

const User_Profile = () => {
  const { resumeId } = useContext(AuthContext);
  const inputRef = useRef(); // Reference to the section to be captured

  const handleDownloadDoc = () => {
    const element = inputRef.current;
    if (!element) {
      console.error("Element not found");
      return;
    }

    // Create a new Blob object using the HTML content
    const content = `
      <html>
        <head>
          <meta charset="utf-8">
          <title>Resume</title>
        </head>
        <body>
          ${element.innerHTML} <!-- Get the inner HTML of the resume -->
        </body>
      </html>
    `;
    const blob = new Blob([content], { type: "application/msword" });
    
    // Use file-saver to download the file
    saveAs(blob, `resume-template-${resumeId}.doc`);
  };

  return (
    <div className=" w-full lg:w-10/12 lg:m-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* User Profile Header */}
      <header className="bg-green-600 p-6 text-white text-center">
        <h1 className="text-4xl font-bold">Your Resume</h1>
        <p className="mt-2 text-lg">Your professional journey starts here</p>
      </header>

      {/* Profile Content */}
      <div className="p-6" ref={inputRef} id="resume"> {/* Attach ref and ID here */}
        <ResumeMe /> {/* The resume component */}
        
        {/* Download Button */}
        <button
          onClick={handleDownloadDoc} // Call handleDownloadDoc on button click
          className="mt-4 bg-green-500 text-white py-2 px-6 rounded shadow hover:bg-green-600 transition duration-300"
        >
          Download as DOC
        </button>
      </div>

      <JobRecom /> {/* Job recommendations section */}
    </div>
  );
};

export default User_Profile;
