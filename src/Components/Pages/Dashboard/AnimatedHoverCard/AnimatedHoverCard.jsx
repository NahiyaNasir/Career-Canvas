import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../../Hooks/AxiosHooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AnimatedHoverCard = () => {
    const [savedJobs, setSavedJobs] = useState([]); // Initialize an empty array to store saved jobs
    const { user } = useContext(AuthContext);
    const axios = useAxiosPublic();

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const response = await axios.get(`/api/getSavedJobs/${user.email}`);
                setSavedJobs(response.data.jobs);
            } catch (e) {
                console.error("Failed to fetch saved jobs", e);
            }
        };

        // Call fetchSavedJobs once the component mounts
        if (user) {
            fetchSavedJobs();
        }
    }, [user, axios]);  // Include dependencies correctly

    return (
        <>
            {
                savedJobs.length > 0 ? (
                    <div className="overflow-x-auto">
                        <h2 className="text-3xl font-bold text-green-500">Saved Jobs</h2>
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Job Name</th>
                                    <th>Company Name</th>
                                    <th>Salary</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    savedJobs.map((job, index) => (
                                        <tr className="hover" key={index}>
                                            <th>{index + 1}</th>
                                            <td>{job.jobTitle}</td>
                                            <td>{job.company}</td>
                                            <td>{job.salaryRange}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <>
                        <p className="text-4xl text-center text-green-500">No saved jobs</p>
                        <Link to={"/"} className="text-white bg-green-300 p-5 rounded-lg">See jobs</Link>
                    </>

                )
            }
        </>
    );
};

export default AnimatedHoverCard;
