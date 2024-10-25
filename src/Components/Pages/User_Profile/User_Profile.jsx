import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Resume1 from "../Resume_Templates/templatesColllection/Resume1";
import Resume2 from "../Resume_Templates/templatesColllection/Resume9";
import { useContext, useRef, } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import ResumeMe from "../Resume_Templates/templatesColllection/ResumeMe";
import JobRecom from "../../../important/JobRecom";

const User_Profile = () => {
  const { resumeId } = useContext(AuthContext);
  const inputRef = useRef();
  const downloadPDF = () => {
    const input = inputRef.current;
    console.log("Input ref:", input); // Debugging output
    if (!input) {
      console.error(
        "Input reference is null. Ensure the ref is correctly set."
      );
      return;
    }

    const dpi = 300;

    html2canvas(input, { scale: dpi / 96 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const imgWidth = 210; // Width of A4 paper
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 0;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= 297;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= 297;
        }

        pdf.save("template1-high-res-a4.pdf");
      })
      .catch((err) => {
        console.error("Error capturing the canvas:", err);
      });
  };

  return (
    <div className="w-10/12 m-auto  bg-white shadow-lg rounded-lg overflow-hidden">
      {/* User Profile Header */}
      <header className="bg-green-600 p-6 text-white text-center">
        <h1 className="text-4xl font-bold">Your Resume</h1>
        <p className="mt-2 text-lg">Your professional journey starts here</p>
      </header>

      {/* Profile Content */}
      <div className="p-6">

       <ResumeMe/>
      
        {/* Download Button */}
        <button
          onClick={downloadPDF}
          className="mt-4 bg-green-500 text-white py-2 px-6 rounded shadow hover:bg-green-600 transition duration-300"
        >
          Download as PDF
        </button>
      </div>
      <JobRecom/>
    </div>
  );
};

export default User_Profile;
