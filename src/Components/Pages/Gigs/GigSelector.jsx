import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/AxiosHooks/useAxiosPublic';
import GigCard from './GigCard';

const GigSelector = () => {
    const [searchInput, setSearchInput] = useState('');
    const [selectedSkills, setSelectedSkills] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const axiosPublic = useAxiosPublic();
    const [gigsCards, setGigsCards] = useState([]);
    const [availableSkills, setAvailableSkills] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 12;

    // Fetch all gigs initially
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPublic.get('/api/gig');
                setGigsCards(res.data);

                const skillsSet = new Set();
                res.data.forEach(gig => {
                    if (gig.skills) {
                        gig.skills.forEach(skill => skillsSet.add(skill));
                    }
                });

                setAvailableSkills([...skillsSet]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [axiosPublic]);

    // Auto-submit when any filter input changes
    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                const response = await axiosPublic.get('/api/getByFilter', {
                    params: {
                        title: searchInput,
                        skills: selectedSkills,
                        rating: selectedRating,
                        startDate: startDate,
                        endDate: endDate,
                        page: currentPage,
                        limit: itemsPerPage,
                    },
                });

                setGigsCards(response.data.gigs); // Assuming the API response contains a 'gigs' array
                setTotalPages(response.data.totalPages); // Assuming the API returns total pages
            } catch (error) {
                console.error('Error fetching filtered gigs:', error);
            }
        };

        fetchFilteredData();
    }, [searchInput, selectedSkills, selectedRating, startDate, endDate, currentPage, axiosPublic]);

    // Pagination button handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl  font-bold mb-6 text-green-600">Select a Gig</h1>

            {/* Filter Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-md">
                {/* Search Input */}
                <div>
                    <label htmlFor="searchInput" className="block font-medium text-gray-700 text-xl ">Search for Gigs</label>
                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Type to search..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="mt-1 text-xl block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                {/* Skills Selection */}
                <div>
                    <label htmlFor="skillsSelect" className="block font-medium text-gray-700 text-xl ">Select Skills</label>
                    <select
                        id="skillsSelect"
                        value={selectedSkills}
                        onChange={(e) => setSelectedSkills(e.target.value)}
                        className="mt-1 text-xl  block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Select skills</option>
                        {availableSkills.map((skill, index) => (
                            <option key={index} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Rating Selection */}
                <div>
                    <label htmlFor="ratingSelect" className="block font-medium text-gray-700 text-xl ">Select Rating</label>
                    <select
                        id="ratingSelect"
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(e.target.value)}
                        className="mt-1 text-xl  block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">Select a rating</option>
                        {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>
                                {rating} Star{rating > 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Start Date */}
                <div>
                    <label htmlFor="startDate" className="block font-medium text-gray-700 text-xl ">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block text-xl  w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label htmlFor="endDate" className="block font-medium text-gray-700 text-xl ">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 text-xl  block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

            {/* Display Gig Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 mt-6">
                {gigsCards.map(gigCard => (
                    <GigCard key={gigCard._id} gigCard={gigCard}></GigCard>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-green-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-green-500 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default GigSelector;
