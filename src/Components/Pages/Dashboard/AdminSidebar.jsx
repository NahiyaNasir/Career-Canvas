import { useContext, useState } from "react";
import { FaFile, FaHome, FaUser } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-hot-toast";
import { RiAdminFill } from "react-icons/ri";
import useAdmin from "../../../Hooks/useAdmin";
import { MdCardMembership, MdRateReview } from "react-icons/md";
import { GiRunningNinja } from "react-icons/gi";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut, user } = useContext(AuthContext);
  const { isAdmin, loading, error } = useAdmin();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  if (loading)
    return (
      <div className="flex w-full items-center justify-center pt-20">
        <GiRunningNinja className="text-[2.8rem] animate-bounce h-16  w-16 md:h-36  md:w-36 text-green-500" />
      </div>
    );
  if (error) return <div className="flex w-full items-center justify-center pt-20">
    <GiRunningNinja className="text-[2.8rem] animate-bounce h-16  w-16 md:h-36  md:w-36 text-green-500" />
  </div>;

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("LogOut Successful!!");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-0 bg-gray-800 shadow-lg transition-transform transform md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:w-64 w-64 h-full z-30`}
      >
        <div className="p-6 h-full">

          {!isAdmin && user && <h1 className="text-2xl font-bold text-white">User Dashboard</h1>}
          {isAdmin && user && <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>}
          <nav className="mt-10">
            <ul>
              {!isAdmin && user && (
                <>
                  <li>
                    <Link
                      to={"/dashboard/premium-membership"}
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <MdCardMembership />
                      <span className="ml-3">Premium Membership</span>
                    </Link>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/review-resume"}
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <MdRateReview />
                      <span className="ml-3">Review Resume</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"/dashboard/myJobs"}
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <MdRateReview />
                      <span className="ml-3">Save Jobs</span>
                    </NavLink>
                  </li>
                  <li>
                    <Link
                      to="user-profile"
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <RiAdminFill />
                      <span className="ml-3">Your Resume</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/CreateGig"
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <FaFile />
                      <span className="ml-3">Create Gig</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="loginUserProfile"
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <RiAdminFill />
                      <span className="ml-3">Profile</span>
                    </Link>
                  </li>
                </>
              )}
              {user && isAdmin && (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 3a7 7 0 00-5.874 11.164A7.001 7.001 0 0010 17a7.001 7.001 0 005.874-2.836A7 7 0 0010 3zm0 10a3 3 0 110-6 3 3 0 010 6z" />
                      </svg>
                      <span className="ml-3">Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/manage-users"
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <FaUser />
                      <span className="ml-3">Manage Users</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/job-posting"
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <FaFile />
                      <span className="ml-3">Post Job</span>
                    </Link>
                  </li>



                  <li>
                    <Link
                      to="/dashboard/admin"
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <RiAdminFill />
                      <span className="ml-3">Make Admin</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/resume-review"
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 2a1 1 0 011 1v3a1 1 0 11-2 0V3a1 1 0 011-1zM2 10a1 1 0 011-1h3a1 1 0 110 2H3a1 1 0 01-1-1zm14-1a1 1 0 100 2h3a1 1 0 100-2h-3zM5.293 14.293a1 1 0 011.414 0L10 17.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                      <span className="ml-3">Review request</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/appliedJob"
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <RiAdminFill />
                      <span className="ml-3">Applied Job</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="loginUserProfile"
                      className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <RiAdminFill />
                      <span className="ml-3">Profile</span>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  onClick={handleLogOut}
                  className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 3a1 1 0 00-1 1v3H7a1 1 0 100 2h2v3a1 1 0 102 0v-3h2a1 1 0 100-2h-2V4a1 1 0 00-1-1z" />
                  </svg>
                  <span className="ml-3">Logout</span>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <FaHome></FaHome>
                  <span className="ml-3">Home</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      {/* Main Content Area */}
      <div className="w-full p-10 h-full flex flex-col">
        <div className="flex justify-end">
          <button
            className="md:hidden p-2 text-green-600 hover:bg-green-200"
            onClick={toggleSidebar}
          >
            {isOpen ? "Close Sidebar" : "Open Sidebar"}
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <Outlet /> {/* This will render child routes here */}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
