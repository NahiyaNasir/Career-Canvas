import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold text-green-600 mb-4">Welcome to your dashboard</h1>
                <p className="text-gray-700 mb-6">
                    Welcome to your dashboard! Here you can manage your content and access various features.
                </p>

                {user?.role === 'admin' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
                            <h2 className="text-lg font-semibold">Total Users</h2>
                            <p className="text-3xl">1,250</p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-green-600 text-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
                            <h2 className="text-lg font-semibold">Total Sales</h2>
                            <p className="text-3xl">$15,000</p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-green-700 text-white rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105">
                            <h2 className="text-lg font-semibold">Pending Request</h2>
                            <p className="text-3xl">34</p>
                        </div>
                    </div>
                )}



            </div>
        </div>
    );
};

export default Dashboard;
