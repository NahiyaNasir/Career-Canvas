import { Outlet } from "react-router-dom";


const Main = () => {
    return (
        // <div className="p-16 bg-gradient-to-r from-white to-green-100">
        <div className="md:p-16 bg-blue-100">
            <Outlet></Outlet>
        </div>

    );
};

export default Main;