import { useContext, useEffect, useState } from 'react';
import { FaUpload, FaCheckCircle, FaPen } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../../Hooks/AxiosHooks/useAxiosPublic';

const Resume_Review = () => {
  const { user } = useContext(AuthContext)
  const axios = useAxiosPublic()
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [uploadStatus, setUploadStatus] = useState(''); // State to hold upload status message
  const [feedback, setFeedback] = useState(''); // State to hold upload status message
  const [isUploading, setIsUploading] = useState(false); // Add an uploading stat
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`/api/feedback/${user?.email}`);
        const uploadStatus = response.data.data;
        setFeedback(uploadStatus);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    if (user?.email) {
      fetchFeedback();
    }
  }, [user?.email, axios]);




  // Handler function for file input change
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0]; // Get the first uploaded file
    if (uploadedFile) {
      setFile(uploadedFile); // Update the file state
      setUploadStatus(''); // Clear any previous upload status
    }
  };



  // Modify the handleSubmit function
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setUploadStatus('Please upload a resume before submitting.');
      return;
    }

    setIsUploading(true); // Show loading state
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
        body: formData,
      });
      if (response.status === 201) {

        setUploadStatus('Resume uploaded successfully!');
        toast.success('Upload successful')
        setFile(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message)
        throw new Error(errorData.message || 'Failed to upload the resume.');
      }
    } catch (error) {
      toast.error('An error occurred while uploading the resume.') // Show error message in toast notification
      setUploadStatus(`Error: ${error.message}`);
    } finally {
      setIsUploading(false); // Remove loading state
    }
  };

  { isUploading && <p>Uploading...</p> }


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col items-center py-12">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-green-600 mb-10 animate-bounce transition-transform duration-500 hover:scale-105">
        Resume Review
      </h1>

      {/* Resume Upload Section */}
      <div className="bg-white w-full max-w-4xl rounded-lg p-8 mb-12 shadow-lg border border-green-200 transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">Submit Your Resume</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-center mb-6">
            <label className="flex flex-col items-center px-4 py-6 bg-green-200 text-green-600 rounded-lg shadow-md tracking-wide uppercase border border-green-300 cursor-pointer hover:bg-green-300 transition duration-300 ease-in-out">
              <FaUpload className="text-3xl mb-2" />
              <span className="text-base leading-normal">Upload Resume</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf" // Optional: Restrict to PDF files
                onChange={handleFileChange} // Call the handler on file change
              />
            </label>
          </div>
          <p className="text-gray-700 text-center mb-4">
            Upload your resume in PDF format for review by our team.
          </p>

          {file ? (
            <div className="text-center mt-4">
              <p className="text-green-600 font-semibold">Uploaded File: {file.name}</p>
              <p className="text-gray-700">Thank you for uploading your resume! Our team will review it shortly.</p>
            </div>
          ) : (
            <p className="text-gray-700 text-center mb-4">
              No file uploaded yet.
            </p>
          )}

          {/* Submit Button */}
          <button type="submit" className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
            Submit Resume
          </button>
        </form>

        {/* Upload Status */}
        {uploadStatus && (
          <p className="mt-4 text-center text-green-600">{uploadStatus}</p>
        )}
      </div>

      {/* Feedback Section */}
      <div className="bg-white w-full max-w-4xl rounded-lg p-8 mb-12 shadow-lg border border-green-200 transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">Feedback</h2>
        <p className="text-gray-700 mb-4">
          The admin will provide feedback here once your resume has been reviewed. Please make changes according to the suggestions.
        </p>
        <div className="border border-green-300 rounded-lg p-4 mb-4 bg-green-100">
          <FaPen className="inline-block text-green-600 mr-2" />
          <span className="text-green-700 font-semibold">feedback yet.</span>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>PDF Name</th>
                  <th>Rating</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {

                  feedback.length > 0 && feedback.map(
                    (item, index) => (
                      <tr key={index} className='hover'>
                        <td>{index + 1}</td>
                        <td className='max-w-36'>
                          {item?.pdf.split(/[/\\]/).pop().replace(/.*-/, '')}
                        </td>
                        {
                          item?.feedback?.rating && item?.feedback?.text ? <>
                            <td className='max-w-3'>{item?.feedback?.rating}</td>
                            <td className='max-w-28'>{item?.feedback?.text}</td>
                          </> :

                            <>
                              <td className='max-w-3'>Panding Rating</td>
                              <td className='max-w-28'>Panding Feedback</td>
                            </>
                        }
                      </tr>
                    )
                  )
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Status and Suggestions Section */}
      <div className="bg-white w-full max-w-4xl rounded-lg p-8 shadow-lg border border-green-200 transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">Status & Suggestions</h2>
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Status */}
          <div className="bg-green-100 p-6 rounded-lg w-full md:w-5/12 mb-6 md:mb-0 shadow-md text-center transition-transform duration-300 hover:scale-105">
            <FaCheckCircle className="text-green-600 text-4xl mb-2" />
            <h3 className="text-xl font-semibold text-green-700">Status: Pending Review</h3>
          </div>

          {/* Suggestions */}
          <div className="bg-white p-6 rounded-lg w-full md:w-6/12 shadow-md">
            <h3 className="text-xl font-semibold text-green-700 mb-4">Suggestions for Improvement</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Optimize resume format for readability</li>
              <li>Highlight key achievements</li>
              <li>Remove unnecessary details</li>
              <li>Ensure consistent formatting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume_Review;
