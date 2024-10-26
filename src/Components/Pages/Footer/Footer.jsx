import { Link } from "react-router-dom";
import logo from "/public/LogoCareerCanvas.png";

const Footer = () => {
  return (
    <footer className="bg-white md:mt-20 mt-6 dark:bg-gray-900 border-t-4 border-green-100">
      <div className="container px-6 py-12 mx-auto">
        <div className="md:flex md:-mx-3 md:items-center md:justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-green-500 md:mx-3 xl:text-4xl dark:text-white">
            Subscribe our newsletter to get update.
          </h1>
          <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
            <Link
              to={"/signup"}
              className="inline-flex items-center justify-center w-full px-4 py-4 text-sm text-white duration-300 bg-green-500 rounded-xl gap-x-3 hover:bg-green-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 "
            >
              <span className="text-lg">Sign Up Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <p className="font-semibold text-green-500 dark:text-white">
              Quick Link
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="/"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Home
              </a>

              <a
                href="/dashboard"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Who We Are
              </a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-green-500 dark:text-white">
              Exclusive Offers
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="/dashboard/premium-membership"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Premium Membership
              </a>
              <a
                href="/gig-section"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Checkout GIGS
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Finance &amp; Insurance
              </a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-green-500 dark:text-white">
              Services
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="/resume-templates/Resume_Templates"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Find Templates
                Find Templates
              </a>
              <a
                href="/drag-and-drop"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                {/* Proofreading &amp; Editing */}
                Build Resume
              </a>
              <a
                href="/job-section"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                Job Posts
              </a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-green-500 dark:text-white">
              Contact Us
            </p>
            <div className="flex flex-col items-start mt-5 space-y-2">
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                +880 768 473 4978
              </a>
              <a
                href="#"
                className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
              >
                info@careercanvas.com
              </a>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex items-center gap-2">
            <img
              className="w-16 h-16"
              // src="/public/LogoCareerCanvas.png"
              src={logo}
              alt=""
            />
            <p className="bg-gradient-to-r from-green-500 via-lime-500 to-emerald-500 bg-clip-text text-transparent text-4xl font-semibold">
              Career Canvas
            </p>
          </div>
          <p className="mt-4 text-sm text-green-500 sm:mt-0 dark:text-gray-300">
            © Copyright 2024. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
