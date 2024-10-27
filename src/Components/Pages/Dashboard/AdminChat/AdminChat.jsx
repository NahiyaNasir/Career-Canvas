import { useEffect, useState } from "react";
import useAxiosPublic from "../../../../Hooks/AxiosHooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AdminChat = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axios = useAxiosPublic();

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/PrimiumAllUser');
                if (response.status === 200) {
                    setAllUsers(response.data);
                }
                setError(null);
            } catch (error) {
                setError('Failed to fetch users', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [axios]);



    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r border-gray-300">
                {/* Sidebar Header */}
                <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-green-600 text-white">
                    <h1 className="text-2xl font-semibold">Chat Web</h1>
                    <div className="btn ">
                        <Link to='/dashboard'>Deshboard</Link>
                    </div>
                </header>

                {/* Loading and Error States */}
                {loading && <p className="p-4 text-center">Loading users...</p>}
                {error && <p className="p-4 text-center text-red-500">{error}</p>}

                {/* Contact List */}
                <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                    {allUsers.map((user, index) => (
                        <div key={index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                                <img src={`https://placehold.co/200x/ffa8e4/ffffff.svg?text=User&font=Lato`} alt="User Avatar" className="w-12 h-12 rounded-full" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{user.displayName}</h2>
                                <p className="text-gray-600">{user.massage || 'Hello!'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1">
                {/* Chat Header */}
                <header className="bg-white p-4 text-gray-700">
                    <h1 className="text-2xl font-semibold">{'User Name'}</h1>
                </header>

                {/* Chat Messages */}
                <div className="h-screen overflow-y-auto p-4 pb-36">
                    {/* Messages */}
                    <div className="flex mb-4 cursor-pointer">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=User&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p className="text-gray-700">Hey Bob, how's it going?</p>
                        </div>
                    </div>

                    <div className="flex justify-end mb-4 cursor-pointer">
                        <div className="flex max-w-96 bg-green-500 text-white rounded-lg p-3 gap-3">
                            <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                            <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=Admin&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                        </div>
                    </div>
                </div>


                <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                    <div className="flex items-center">
                        <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-green-500" />
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AdminChat;
