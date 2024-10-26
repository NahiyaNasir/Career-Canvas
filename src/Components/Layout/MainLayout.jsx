import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the CSS for animations
import ChatBox from "../Pages/Home/ChatBox/ChatBox";
import { AuthContext } from "../Providers/AuthProvider";

const MainLayout = () => {
    const { user } = useContext(AuthContext);
    useEffect(() => {
        AOS.init({
            duration: 1000, // Set default duration for all animations
            once: true, // Animation happens only once as you scroll
        });
    }, []);

    return (
        <div className="bg-white mt-44">
            <Navbar />
            <div className="min-h-[calc(100vh-387px)] mx-auto">
                <Outlet />
            </div>
            {
                user && <ChatBox></ChatBox>
            }
            
            <Footer />
        </div>
    );
};

export default MainLayout;
