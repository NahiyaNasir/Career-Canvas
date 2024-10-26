import { useState, useRef, useContext } from "react";
import ReactQuill from "react-quill"; // Rich text editor
import "react-quill/dist/quill.snow.css"; // Styles for the editor
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; // Importing html2canvas
import { saveAs } from "file-saver"; // For saving files like DOCX and HTML
import { Document, Packer, Paragraph, TextRun } from "docx"; // For DOCX export
import "quill/dist/quill.snow.css"; // Quill Snow theme
import { AuthContext } from "../../Providers/AuthProvider";

const GoogleDocAdvanced = () => {
  const { user, chatMessages, addChatMessage, clearChatMessages } = useContext(AuthContext);
  console.log(chatMessages[chatMessages.length-1])
  
  const [editorContent, setEditorContent] = useState(""); // Editor state
  const [wordCount, setWordCount] = useState(0); // Word count
  const editorRef = useRef(null); // Reference for ReactQuill

  // Handle changes in the editor content
  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    setWordCount(editor.getText().trim().split(/\s+/).length); // Update word count
  };

  // Export as PDF using html2canvas and jsPDF
  const downloadPdf = () => {
    const input = editorRef.current?.getEditor().root; // Ensure ref is valid

    if (input) {
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210; // A4 size width in mm
          const pageHeight = 297; // A4 size height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          // If content is larger than one page, add new pages
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save("document.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }
  };

  // Export as DOCX
  const downloadDocx = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun(editorContent.replace(/<[^>]*>?/gm, ""))], // Remove HTML tags for plain text export
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "document.docx");
    });
  };

  // Save as HTML file
  const downloadHtml = () => {
    const htmlBlob = new Blob([editorContent], { type: "text/html" });
    saveAs(htmlBlob, "document.html");
  };

  // Print the document
  const printDocument = () => {
    const content = editorRef.current?.getEditor().root.innerHTML;
    const newWindow = window.open();
    newWindow.document.write(content);
    newWindow.print();
  };

  return (
    <div className="container mx-auto bg-white w-full lg:w-3/4 p-4 ">
      <h1 className="text-center text-3xl font-bold text-green-700 mb-6">Advanced Google Docs Editor</h1>
      <div className="rounded-lg shadow-lg bg-white h-full pb-12">
        {/* Quill Text Editor */}
        <ReactQuill
          ref={editorRef}
          value={editorContent}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
          className="h-96 "
        />
      </div>

      {/* Options to download in different formats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-20">
        {/* <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={downloadPdf}
        >
          Download as PDF
        </button> */}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={downloadDocx}
        >
          Download as DOCX
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={downloadHtml}
        >
          Download as HTML
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={printDocument}
        >
          Print Document
        </button>
      </div>

      {/* Word Count */}
      <div className="mt-4 text-center text-green-700">
        <p>Word Count: {wordCount}</p>
      </div>
    </div>
  );
};

// Custom Quill modules and formats
const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image", "video"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "color",
  "background",
  "video",
];

export default GoogleDocAdvanced;
