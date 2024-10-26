import image from "../../../../../public/weDevilerBest.png"

const WeDeliverBest = () => {
  return (
    <section className="md:mt-20 mt-8 bg-white  md:px-16 md:py-14">
      <div className="px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side content */}
          <div className="space-y-10">
            {/* Dots */}
            <div className="flex gap-2 mb-4 justify-start">
              <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
              <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-green-500 mb-8 text-left">
              We Deliver The Best
            </h2>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex md:items-center items-start">
                <span className="text-green-500 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-green-500"
                  >
                    {/* Green circle */}
                    <circle cx="12" cy="12" r="10" fill="currentColor" />

                    {/* Stylish white check mark */}
                    <path
                      d="M9 12.5l2 2 4-4.5"
                      fill="none"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </span>
                <p className="text-gray-700 text-xl text-left">
                  Proven CV Templates to increase Hiring Chance
                </p>
              </div>

              <div className="flex md:items-center items-start">
                <span className="text-green-500 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-green-500"
                  >
                    {/* Green circle */}
                    <circle cx="12" cy="12" r="10" fill="currentColor" />

                    {/* Stylish white check mark */}
                    <path
                      d="M9 12.5l2 2 4-4.5"
                      fill="none"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </span>
                <p className="text-gray-700 text-xl text-left">
                  Creative and Clean Templates Design
                </p>
              </div>

              <div className="flex md:items-center items-start">
                <span className="text-green-500 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-green-500"
                  >
                    {/* Green circle */}
                    <circle cx="12" cy="12" r="10" fill="currentColor" />

                    {/* Stylish white check mark */}
                    <path
                      d="M9 12.5l2 2 4-4.5"
                      fill="none"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </span>
                <p className="text-gray-700 text-xl text-left">
                  Easy and Intuitive Online CV Builder
                </p>
              </div>

              <div className="flex md:items-center items-start">
                <span className="text-green-500 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-green-500"
                  >
                    {/* Green circle */}
                    <circle cx="12" cy="12" r="10" fill="currentColor" />

                    {/* Stylish white check mark */}
                    <path
                      d="M9 12.5l2 2 4-4.5"
                      fill="none"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </span>
                <p className="text-gray-700 text-xl text-left">
                  Free to use. Developed by hiring professionals
                </p>
              </div>

              <div className="flex md:items-center items-start">
                <span className="text-green-500 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-green-500"
                  >
                    {/* Green circle */}
                    <circle cx="12" cy="12" r="10" fill="currentColor" />

                    {/* Stylish white check mark */}
                    <path
                      d="M9 12.5l2 2 4-4.5"
                      fill="none"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </span>
                <p className="text-gray-700 text-xl text-left">
                  Fast Easy CV and Resume Formatting
                </p>
              </div>

              <div className="flex md:items-center items-start">
                <span className="text-green-500 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-green-500"
                  >
                    {/* Green circle */}
                    <circle cx="12" cy="12" r="10" fill="currentColor" />

                    {/* Stylish white check mark */}
                    <path
                      d="M9 12.5l2 2 4-4.5"
                      fill="none"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </span>
                <p className="text-gray-700 text-xl text-left">
                  Recruiter Approved Phrases
                </p>
              </div>
            </div>
          </div>

          {/* Right side image */}
          <div className="flex justify-center">
            <img
              // src="/public/weDevilerBest.png"
              src={image}
              alt="CV Examples"
              className="w-full md:w-3/4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeDeliverBest;
