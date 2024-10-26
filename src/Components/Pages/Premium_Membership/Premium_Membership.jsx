import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Premium_Membership = () => {
  const premiumFeatures = [
    "Chat with Admin",
    "Post Projects",
    "Apply for Jobs",
    "Send Resume for Review",
    "Get Feedback from Admin",
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // You can adjust duration here
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10">
      {/* Animated Heading */}
      <h1 className="text-5xl font-bold text-green-600 mb-8 animate-pulse">
        What a Premium User Can Do
      </h1>

      {/* Features Table */}
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-green-600 mb-6 text-center">
          Premium Features
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-4 px-6 border-b border-gray-300 text-left text-lg font-medium text-green-600">
                  Feature
                </th>
                <th className="py-4 px-6 border-b border-gray-300 text-left text-lg font-medium text-green-600">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {premiumFeatures.map((feature, index) => (
                <tr key={index} className="hover:bg-gray-100" data-aos="fade-up">
                  <td className="py-4 px-6 border-b border-gray-300 text-gray-700">
                    <FaCheckCircle className="inline text-green-600 mr-2" />
                    {feature}
                  </td>
                  <td className="py-4 px-6 border-b border-gray-300 text-gray-600">
                    {feature === "Chat with Admin" && "Connect directly with admins for support."}
                    {feature === "Post Projects" && "Share your projects with the community."}
                    {feature === "Apply for Jobs" && "Apply for job listings easily."}
                    {feature === "Send Resume for Review" && "Get professional feedback on your resume."}
                    {feature === "Get Feedback from Admin" && "Receive insights to improve your profile."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Purchase Button */}
      <div className="mt-10">
        <Link to={'/dashboard/payment'}>
          <button className="bg-green-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-700 transition transform hover:scale-105 duration-300">
            Get Premium
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Premium_Membership;
