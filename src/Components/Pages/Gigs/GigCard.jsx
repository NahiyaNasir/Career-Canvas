
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const GigCard = ({gigCard}) => {
  const navigate = useNavigate();
  // console.log(gigCard._id)
  // console.log(gigCard);
    // eslint-disable-next-line no-unused-vars
    const {projectImages,Image,userName,title,}=gigCard
  const [isModalOpen, setIsModalOpen] = useState(false);
 
   


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const giveRating = () => {
    alert("Rating functionality is not implemented yet.");
  };

  const checkReviews = () => {
    alert("Review checking functionality is not implemented yet.");
  };

  
 
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
     <Link to={`/gig-details/${gigCard?._id}`}>
      <img
        className="w-full h-48 object-cover"
        src={gigCard?.projectImages[0]}
        alt="Project"
      />
     </Link>
      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <Link to={`/gig-details/${gigCard?._id}`}>
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={gigCard?.userImage}
            alt="User Avatar"
          />
          </Link>
          <Link to={`/gig-details/${gigCard?._id}`}> <span className="font-bold text-lg">{gigCard?.userName}</span></Link>
        </div>
        <div className="font-bold text-xl mb-2">{gigCard?.title}</div>
        <p className="text-gray-700 text-base">
          Short description of the gig, highlighting the main features.
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-green-600">Rating: ⭐⭐⭐⭐</span>
          <button
            onClick={openModal}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 mx-auto mt-20 max-w-lg relative">
            <span
              onClick={closeModal}
              className="cursor-pointer text-red-500 float-right text-2xl"
            >
              &times;
            </span>
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              <Link to={`/gig-details/${gigCard?._id}`}>
              {gigCard?.title}
              </Link>
            </h2>
            <Link to={`/gig-details/${gigCard?._id}`}>
            <img
              className="w-full h-48 object-cover mb-4 rounded-lg"
              src={gigCard?.projectImages[0]}
              alt="Project"
            />
            </Link>
            <div className="flex items-center mb-4">
              <Link to={`/gig-details/${gigCard?._id}`}>
              <img
                className="w-10 h-10 rounded-full mr-2"
                src={gigCard?.userImage}
                alt="User Avatar"
              />
              </Link>
                <Link to={`/gig-details/${gigCard?._id}`}>
              <span className="font-bold text-lg">

                {gigCard?.userName}</span>
                </Link>
            </div>
            <p className="text-gray-800 mb-2">
              <strong>Project Details:</strong>
              <br />
              {gigCard?.projectDetails}
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Skills Required:</strong>{" "}
              <span className="text-green-500">
                {gigCard?.skills?.join(", ")}
              </span>
            </p>
            <p className="text-gray-800 mb-2">
              <strong>Contact Info:</strong>
              <br />
              Email:{" "}
              <a
                href={`mailto:${gigCard?.contactInfo?.email}`}
                className="text-green-500"
              >
                {gigCard?.contactInfo?.email}
              </a>
              <br />
              Phone:{" "}
              <span className="text-green-500">
                {gigCard?.contactInfo?.phone}
              </span>
            </p>
            <p className="text-gray-800 mb-2">
              <strong>FAQs:</strong>
            </p>
            <ul className="list-disc pl-5 text-gray-800">
              {gigCard?.faqs?.map((faq, index) => (
                <li key={index}>
                  <strong>{faq?.question}</strong> {faq?.answer}
                </li>
              ))}
            </ul>
            {/* <div className="flex justify-between mt-4">
              <button
                onClick={giveRating}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Give Rating
              </button>
              <button
                onClick={checkReviews}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
              >
                Check Reviews
              </button>
            </div> */}
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
        
      )}
    </div>
  );
};

export default GigCard;
