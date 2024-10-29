import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../Hooks/AxiosHooks/useAxiosPublic';
import toast from 'react-hot-toast';

const ResumeReview = () => {
    const axios = useAxiosPublic();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [resumes, setResumes] = useState([]); // Initialize with an empty array
    const [error, setError] = useState(null);

    // Function to fetch resumes
    const fetchResumes = async () => {
        try {
            const response = await axios.get('/api/resumes');
            setResumes(response.data.data);
            console.log(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to load resumes.');
        }
    };

    // Fetch resumes on component mount
    useEffect(() => {
        fetchResumes();
    }, [axios]);

    const openModal = (user) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
        setRating(0);
        setText('');
    };

    const handleReviewSubmit = async () => {
        try {
            // Assume there's an API endpoint to submit the feedback
            const reviewData = {
                rating,
                text,
            };
            await axios.put(`/api/feedback/${selectedUser._id}`, reviewData);
            toast.success('Review submitted successfully');
            console.log('Review submitted successfully');
            await fetchResumes(); // Refetch resumes after submitting review
        } catch (err) {
            console.error('Error submitting review:', err);
        }
        closeModal();
    };


    return (
        <div className="p-8 bg-white min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-green-600 text-center">Resume Review</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600">User Email</th>
                            <th className="py-3 px-6 text-left text-gray-600">Resume PDF</th>
                            <th className="py-3 px-6 text-left text-gray-600">Status</th>
                            <th className="py-3 px-6 text-left text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumes.map((resume) => (
                            <tr key={resume.id} className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="py-3 px-6 border-b border-gray-300">{resume.userEmail}</td>
                                <td className="py-3 px-6 border-b border-gray-300">
                                    <a href={`https://careen-canvas-server.vercel.app/${resume.pdf}`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                        View Resume
                                    </a>
                                </td>
                                <td className="py-3 px-6 border-b border-gray-300">{resume.status}</td>
                                <td className="py-3 px-6 border-b border-gray-300">
                                    <button
                                        className="text-green-600 hover:text-green-800 underline focus:outline-none"
                                        onClick={() => openModal(resume)}
                                    >
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-green-600">Review {selectedUser.name}</h2>
                        <div className="flex justify-center mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    
                                    className={`cursor-pointer text-${star <= rating ? 'yellow-500' : 'gray-400'} text-3xl`}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            rows="4"
                            placeholder="Write your feedback here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600 transition duration-200"
                                onClick={handleReviewSubmit}
                            >
                                Submit Review
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeReview;
