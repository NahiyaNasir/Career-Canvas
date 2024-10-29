import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
} from "react-share";

const GigCard = ({ gigCard }) => {
  const navigate = useNavigate();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  const shareURL = `https://career-canvas365.netlify.app/gig-details/${gigCard?._id}`;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { projectImages, userImage, userName, title } = gigCard;

  return (
    <div
      className="rounded overflow-hidden shadow-lg bg-white p-4"
      data-aos={isLargeScreen ? "fade-left" : undefined}
      data-aos-delay={isLargeScreen ? "500" : undefined}
    >
      <Link to={`/gig-details/${gigCard?._id}`} className="relative group">
        <img
          className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-110"
          src={projectImages[0]}
          alt="Project"
        />
        <span className="absolute top-2 left-2 text-white bg-green-600 bg-opacity-75 px-2 py-1 rounded text-sm">
          Project
        </span>
      </Link>

      <div className="px-6 py-4">
        <div className="flex items-center mb-4">
          <Link to={`/gig-details/${gigCard?._id}`}>
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={userImage}
              alt="User Avatar"
            />
          </Link>
          <Link to={`/gig-details/${gigCard?._id}`}>
            <span className="font-bold text-xl text-green-700">{userName}</span>
          </Link>
        </div>
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          Short description of the gig, highlighting the main features.
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-green-600">Rating: ⭐⭐⭐⭐</span>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/gig-details/${gigCard?._id}`)}
              className="relative bg-green-500 text-white px-4 py-2 rounded overflow-hidden group hover:bg-green-700 transition duration-200"
            >
              View Details
            </button>
            <button
              className="relative bg-green-500 text-white px-4 py-2 rounded overflow-hidden group hover:bg-green-700 transition duration-200"
              onClick={openModal}
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-md">
            <h3 className="font-bold text-lg mb-4">Share With:</h3>
            <p className="mb-4">
              Choose Your Platforms where you want to share:
            </p>
            <div className="flex items-center gap-4 mb-4">
              <FacebookShareButton url={shareURL}>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <LinkedinShareButton url={shareURL}>
                <LinkedinIcon size={40} round={true} />
              </LinkedinShareButton>
              <EmailShareButton url={shareURL}>
                <EmailIcon size={40} round={true} />
              </EmailShareButton>
            </div>
            <button
              onClick={closeModal}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
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
