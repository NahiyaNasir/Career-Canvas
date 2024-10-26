import { useState,  } from 'react';
import { toast } from 'react-hot-toast';
import getAuthToken from '../../../../Hooks/getToken';
import useAxiosPublic from "../../../../Hooks/AxiosHooks/useAxiosPublic";

const AddAdmin = () => {
    const [email, setEmail] = useState('');
    const axios = useAxiosPublic();

    // Handle form submission
    const handleAddAdmin = async (e) => {
        e.preventDefault();
    
        // Check if the email is valid (basic check)
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
    
        try {
            const token = await getAuthToken();
    
            const response = await axios.put(
                "/api/users/role",
                {
                    email: email,
                    role: "admin",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
    
            if (!response.data) {
                throw new Error("Failed to change user role");
            }
    
            toast.success(`Successfully made ${email} an admin!`);
            setEmail('');
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error making admin: " + error.message);
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Add Admin</h2>
                <form onSubmit={handleAddAdmin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter admin email"
                        required
                        className="mb-4 p-2 border rounded w-full"
                    />
                    <button
                        type="submit"
                        className="w-full text-white bg-green-500 font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition"
                    >
                        Make Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAdmin;
