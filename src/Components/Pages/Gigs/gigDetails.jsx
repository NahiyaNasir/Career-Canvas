import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../Hooks/AxiosHooks/useAxiosPublic';

const GigDetails = () => {
  const axiosPublic = useAxiosPublic();
  const [gigsCards, setGigsCards] = useState([]);
  const [matchedGig, setMatchedGig] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/gig-section');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPublic.get('/api/gig');
        setGigsCards(res.data);
        const gig = res.data.find((gig) => gig._id === id);
        setMatchedGig(gig);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [axiosPublic, id]);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-white to-green-100 shadow-2xl rounded-3xl border border-green-500 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      {matchedGig ? (
        <div className="animate-fadeIn">
          {/* Profile Section */}
          <div className="text-center mb-8">
            <img
              className="w-32 h-32 rounded-full mx-auto border-4 border-green-500 shadow-lg transition duration-500 transform hover:scale-110"
              src={matchedGig.userImage}
              alt={`${matchedGig.userName}'s profile`}
            />
            <h1 className="text-4xl font-extrabold text-green-700 mt-4">{matchedGig.title}</h1>
            <p className="text-gray-500 italic">Posted by {matchedGig.userName}</p>
          </div>

          {/* Project Details */}
          <div className="mb-6 bg-green-50 p-6 rounded-lg shadow-md border border-green-200 transition duration-500 hover:shadow-xl hover:bg-green-100">
            <h2 className="text-2xl font-semibold text-green-700">Project Details</h2>
            <p className="text-gray-700 mt-3 leading-relaxed">{matchedGig.projectDetail}</p>
          </div>

          {/* Contact Information */}
          <div className="mb-6 bg-green-50 p-6 rounded-lg shadow-md border border-green-200 transition duration-500 hover:shadow-xl hover:bg-green-100">
            <h2 className="text-2xl font-semibold text-green-700">Contact Information</h2>
            <p className="text-gray-700 mt-3">
              Email: <span className="text-green-600 font-medium">{matchedGig.contactInfo.email}</span>
            </p>
            <p className="text-gray-700">
              Phone: <span className="text-green-600 font-medium">{matchedGig.contactInfo.phone}</span>
            </p>
          </div>

          {/* Skills Required */}
          <div className="mb-6 bg-green-50 p-6 rounded-lg shadow-md border border-green-200 transition duration-500 hover:shadow-xl hover:bg-green-100">
            <h2 className="text-2xl font-semibold text-green-700">Skills Required</h2>
            <ul className="flex flex-wrap gap-3 mt-3">
              {matchedGig.skills.map((skill, index) => (
                <li
                  key={index}
                  className="bg-green-600 text-white px-4 py-2 rounded-full shadow-md text-sm transition-transform duration-500 hover:scale-105"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Gallery */}
          <div className="mb-6 bg-green-50 p-6 rounded-lg shadow-md border border-green-200 transition duration-500 hover:shadow-xl hover:bg-green-100">
            <h2 className="text-2xl font-semibold text-green-700">Project Gallery</h2>
            <div className="flex gap-4 mt-4 overflow-x-auto">
              {matchedGig.projectImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Project visual"
                  className="w-1/3 rounded-lg border-2 border-green-300 shadow-md transition duration-500 transform hover:scale-105 hover:border-green-400"
                />
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-6 bg-green-50 p-6 rounded-lg shadow-md border border-green-200 transition duration-500 hover:shadow-xl hover:bg-green-100">
            <h2 className="text-2xl font-semibold text-green-700">FAQs</h2>
            {matchedGig.faq && matchedGig.faq.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {matchedGig.faq.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    <p className="font-bold text-green-600">Q: {item.question}</p>
                    <p className="ml-4 text-gray-600">A: {item.answer}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No FAQs available.</p>
            )}
          </div>

          {/* Last Updated */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">Last Updated: {new Date(matchedGig.updatedAt).toLocaleDateString()}</p>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleBack}
              className="bg-green-600 text-white text-xl rounded-lg px-8 py-2 shadow-lg transition-transform duration-500 hover:scale-105 hover:bg-green-700 focus:outline-none"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 animate-pulse">Loading gig details...</p>
      )}
    </div>
  );
};

export default GigDetails;
