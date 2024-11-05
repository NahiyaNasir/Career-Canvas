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
        <div className="container mx-auto m-12">
            {/* Search Input */}
            <div className="flex items-center justify-center p-8">
                <div className="relative w-full max-w-lg">
                    <label htmlFor="searchInput" className="block text-3xl  text-green-700 mb-2 text-center font-serif">
                        Search for Gigs
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Find your ideal gig..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full pl-5 pr-16 py-3 text-xl text-gray-800 border-2 border-green-500 rounded-full shadow-md focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600 transition-all duration-300"
                        />
                        <button
                            className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-12 text-white bg-green-600 rounded-full shadow-lg transform translate-x-2 translate-y-1 hover:bg-green-700 focus:outline-none transition-all duration-200 ease-in-out">
                            🔍
                        </button>
                    </div>
                </div>
            </div>

            {/* Filter Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg transition duration-300 hover:shadow-xl" data-aos="fade-up" data-aos-delay="500">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Skills Selection */}
                    <div>
                        <label htmlFor="skillsSelect" className="block font-medium text-gray-700 text-lg mb-2">Select Skills</label>
                        <select
                            id="skillsSelect"
                            value={selectedSkills}
                            onChange={(e) => setSelectedSkills(e.target.value)}
                            className="block w-full border-2 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out"
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
                        <label htmlFor="ratingSelect" className="block font-medium text-gray-700 text-lg mb-2">Select Rating</label>
                        <select
                            id="ratingSelect"
                            value={selectedRating}
                            onChange={(e) => setSelectedRating(e.target.value)}
                            className="block w-full border-2 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out"
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
                        <label htmlFor="startDate" className="block font-medium text-gray-700 text-lg mb-2">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="block w-full border-2 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label htmlFor="endDate" className="block font-medium text-gray-700 text-lg mb-2">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="block w-full border-2 border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out"
                        />
                    </div>
                </div>


            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-6 gap-4" >
                {gigsCards.length === 0
                    ? Array.from({ length: 12 }, (_, index) => (
                        <div key={index} className="bg-gray-200 animate-pulse rounded-lg p-4">
                            <div className="h-48 bg-gray-300 rounded-md mb-4"></div>
                            <div className="h-6 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        </div>
                    ))
                    : gigsCards.map(gigCard => (
                        <GigCard key={gigCard._id} gigCard={gigCard}></GigCard>
                    )
                    
                    )
                    }
            </div>
          
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-green-500 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <span className='text-green-800 font-bold  p-2'>Page {currentPage} of {totalPages}</span>
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
