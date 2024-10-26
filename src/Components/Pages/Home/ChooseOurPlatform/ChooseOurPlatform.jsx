import { Link } from "react-router-dom";
import image1 from "../../../../../public/thumbsAboutUs.png"
import image2 from "../../../../../public/exoertIconAboutUs.png"
import image3 from "../../../../../public/approvedAboutUs.png"

const ChooseOurPlatform = () => {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-green-50 rounded-2xl">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 justify-items-center">
          {/* Left Side */}
          <div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <img
                    // src="/public/thumbsAboutUs.png"
                    src={image1}
                    alt="Thumbs Up"
                    className="w-16"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-600">
                    Easy Online Resume Builder
                  </h3>
                  <p className="text-gray-600 text-xl">
                    Create standout resumes effortlessly with our user-friendly
                    platform.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <img
                    // src="/public/exoertIconAboutUs.png"
                    src={image2}
                    alt="Expert Tips"
                    className="w-16"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-600">
                    Step By Step Expert Tips
                  </h3>
                  <p className="text-gray-600 text-xl">
                    Get expert advice and follow our easy steps to enhance your
                    resume.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <img
                    src={image3}
                    // src="/public/approvedAboutUs.png"
                    alt="Recruiter Approved"
                    className="w-20"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600">
                    Recruiter Approved Phrases
                  </h3>
                  <p className="text-gray-600 text-xl">
                    Use phrases and keywords that recruiters love to see, making
                    your resume and get noticed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          {/* Right Side */}
          <div className="w-full flex flex-col justify-between md:items-start items-center md:text-left text-center">
            <div className="flex flex-col gap-6">
              {/* Dots */}
              <div className="flex gap-2 mb-4 md:justify-start justify-center">
                <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
                <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
              </div>

              {/* Title */}
              <h2 className="text-4xl font-bold text-green-500 mb-2">
                Why Choose Our Platform?
              </h2>

              {/* Paragraphs */}
              <div className="md:space-y-2">
                <p className="text-gray-600 mb-4 text-xl">
                  Our platform stands out because of its intuitive design and
                  powerful features that simplify resume creation. We prioritize
                  user experience and provide a range of customizable templates
                  to help you present your professional profile effectively.
                </p>
                <p className="text-gray-600 mb-6 text-xl">
                  We are committed to helping you succeed in your job search.
                  Our platform offers real-time previews, easy-to-use editing
                  tools, and expert guidance to ensure your resume makes a
                  lasting impression on employers.
                </p>
              </div>
            </div>

            {/* Button aligned to the bottom of the right side */}
            <div className="w-full mt-6 md:mt-auto md:pt-6">
              <Link to={'/google-doc'} className="bg-green-500 text-xl text-white px-6 py-3 rounded-full shadow-md hover:bg-green-600 transition-all">
                Lets Build Your CV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseOurPlatform;
