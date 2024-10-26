import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-hot-toast";
import logo from "/public/LogoCareerCanvas.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("LogOut Successful!!"))
      .catch((error) => console.log(error.message));
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-lg  fixed top-0 left-0 right-0 z-50 text-[1rem]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <span className="font-bold text-xl text-gray-800">Career Canvas</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-green-600 font-bold" : "text-gray-600"}>
              Home
            </NavLink>
            <NavLink to="/ai-chat" className={({ isActive }) => isActive ? "text-green-600 font-bold" : "text-gray-600"}>
              CC Ai
            </NavLink>
            <NavLink to="/job-section" className={({ isActive }) => isActive ? "text-green-600 font-bold" : "text-gray-600"}>
              Job Posts
            </NavLink>
            <NavLink to="/gig-section" className={({ isActive }) => isActive ? "text-green-600 font-bold" : "text-gray-600"}>
              GiGs
            </NavLink>
            <NavLink to="/resume-templates/Resume_Templates" className={({ isActive }) => isActive ? "text-green-600 font-bold" : "text-gray-600"}>
              Virual resume
            </NavLink>
            <NavLink to="/google-doc" className={({ isActive }) => isActive ? "text-green-600 font-bold" : "text-gray-600"}>
              Self build
            </NavLink>
            <NavLink to="/drag-and-drop" className={({ isActive }) => isActive ? "text-green-600 font-bold" : "text-gray-600"}>
              DD
            </NavLink>

            {/* User Menu */}
            {user && (
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center text-gray-600 hover:text-green-600"
                >
                  {user.displayName}
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M5.5 7L10 12l4.5-5h-9z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                    <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to="/dashboard/user-profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-8 6h8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="px-4 py-2 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "block text-green-600 font-bold" : "block text-gray-700"}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/ai-chat"
              className={({ isActive }) => isActive ? "block text-green-600 font-bold" : "block text-gray-700"}
              onClick={() => setIsMenuOpen(false)}
            >
              CC Ai
            </NavLink>
            <NavLink
              to="/job-section"
              className={({ isActive }) => isActive ? "block text-green-600 font-bold" : "block text-gray-700"}
              onClick={() => setIsMenuOpen(false)}
            >
              Job Posts
            </NavLink>
            <NavLink
              to="/gig-section"
              className={({ isActive }) => isActive ? "block text-green-600 font-bold" : "block text-gray-700"}
              onClick={() => setIsMenuOpen(false)}
            >
              GiGs
            </NavLink>
            <NavLink
              to="/resume-templates/Resume_Templates"
              className={({ isActive }) => isActive ? "block text-green-600 font-bold" : "block text-gray-700"}
              onClick={() => setIsMenuOpen(false)}
            >
              Virtual Resume
            </NavLink>
            <NavLink
              to="/google-doc"
              className={({ isActive }) => isActive ? "block text-green-600 font-bold" : "block text-gray-700"}
              onClick={() => setIsMenuOpen(false)}
            >
              Self build
            </NavLink>
            <NavLink
              to="/drag-and-drop"
              className={({ isActive }) => isActive ? "block text-green-600 font-bold" : "block text-gray-700"}
              onClick={() => setIsMenuOpen(false)}
            >
              DD
            </NavLink>

            {/* User Menu for Mobile */}
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:bg-gray-100 rounded px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/user-profile"
                  className="block text-gray-700 hover:bg-gray-100 rounded px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-700 hover:bg-gray-100 rounded px-4 py-2"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


