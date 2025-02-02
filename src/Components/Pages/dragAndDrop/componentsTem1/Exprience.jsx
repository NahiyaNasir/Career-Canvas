import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // FontAwesome edit icon

const Exprience = ({ exprience, setExperience }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(exprience); // Initialize with exprience from props
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

        if (wordCount <= 100) {
            setFormData(value);
            setError('');
        } else {
            setError('exprience cannot exceed 100 words.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (error) return;
        setExperience(formData);
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <div
                className="group"
                onDoubleClick={() => setIsModalOpen(true)}
            >
                <h1 className='text-4xl font-bold border-b-2 border-black pb-2'>
                    exprience
                    <span className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaEdit
                            className="cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </span>
                </h1>
                <p className='pt-2'>{exprience}</p>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
                    <div className="bg-white w-4/5 max-w-3xl p-6 rounded-md shadow-lg flex flex-col md:flex-row max-h-screen overflow-y-auto">
                        <div className="md:w-1/2 pr-4">
                            <h2 className="text-2xl font-bold mb-4">Edit exprience</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <textarea
                                    value={formData}
                                    onChange={handleChange}
                                    rows={4}
                                    className="border p-2 w-full rounded"
                                    placeholder="Write your exprience here..."
                                />
                                {error && <p className="text-red-500">{error}</p>}
                                <button type="submit" className="bg-green-500 w-full text-white py-2 px-4 rounded" disabled={!!error}>
                                    Save
                                </button>
                            </form>
                        </div>

                        {/* Instructions */}
                        <div className="md:w-1/2 pl-4 border-l mt-5">
                            <h2 className="text-2xl font-bold mb-4 ">Instructions</h2>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Summarize your professional experience concisely.</li>
                                <li>Highlight your key skills and achievements.</li>
                                <li>Keep the language professional and clear.</li>
                                <li>Ensure there are no spelling or grammatical errors.</li>
                                <li>Click "Save" to update your exprience.</li>
                                <li>exprience cannot exceed 100 words.</li>
                            </ul>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-white text-xl"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

export default Exprience;
