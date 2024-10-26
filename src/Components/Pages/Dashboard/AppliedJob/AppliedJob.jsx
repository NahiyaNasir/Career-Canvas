import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../../Hooks/AxiosHooks/useAxiosPublic";

const AppliedJob = () => {
    const axios = useAxiosPublic();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/appliedJob')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [axios]);

    console.log(data);

    const handleApprove = async (applicantId) => {
        try {
            await axios.put(`/api/applicationPut/${applicantId}`, { status: 'approve' });
            setData(prevData => prevData.map(item => 
                item._id === applicantId ? { ...item, status: 'approve' } : item
            ));
            toast.success("Application Approved Successfully");
        } catch (error) {
            toast.error("Error Approving Application");
            console.error('Error updating data:', error);
        }
    };

    const handleReject = async (applicantId) => {
        try {
            await axios.put(`/api/applicationPut/${applicantId}`, { status: 'reject' });
            setData(prevData => prevData.map(item => 
                item._id === applicantId ? { ...item, status: 'reject' } : item
            ));
            toast.success("Application Rejected Successfully");
        } catch (error) {
            toast.error("Error Rejecting Application");
            console.error('Error updating data:', error);
        }
    };

    return (
        <div className="bg-white lg:w-auto p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">All Applicants</h3>

            <div className="">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-gray-600">
                                <th className="py-2 pr-10 lg:pr-0 text-left">#</th>
                                <th className="py-2 pr-10 lg:pr-0 text-left">Applicant Name</th>
                                <th className="py-2 pr-10 lg:pr-0 text-left">Job Title</th>
                                <th className="py-2 pr-10 lg:pr-0 text-left">Message</th>
                                <th className="py-2 pr-10 lg:pr-0 text-left">Application Date</th>
                                <th className="py-2 pr-10 lg:pr-0 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((applicant, index) => (
                                <tr key={applicant._id} className="border-t text-gray-800">
                                    <td className="py-2 pr-10 lg:pr-0">{index + 1}</td>
                                    <td className="py-2 pr-10 lg:pr-0">{applicant.name}</td>
                                    <td className="py-2 pr-10 lg:pr-0">{applicant.jobTitle}</td>
                                    <td className="py-2 pr-10 lg:pr-0">{applicant.details}</td>
                                    <td className="py-2 pr-10 lg:pr-0">{applicant.applicationDate}</td>
                                    <td className="space-x-1">
                                        <button
                                            onClick={() => handleApprove(applicant._id)}
                                            disabled={applicant.status === 'approve'}
                                            className={`p-2 rounded-lg ${applicant.status === 'approve' ? 'bg-green-500' : 'bg-blue-500'} ${applicant.status === 'approve' ? 'cursor-not-allowed' : ''}`}>
                                            {applicant.status === 'approve' ? 'Approved' : 'Approve'}
                                        </button>
                                        <button
                                            onClick={() => handleReject(applicant._id)}
                                            disabled={applicant.status === 'approve'}
                                            className={`p-2 rounded-lg ${applicant.status === 'reject' ? 'bg-red-500' : 'bg-purple-500'} ${applicant.status === 'approve' ? 'cursor-not-allowed' : ''}`}>
                                            {applicant.status === 'reject' ? 'Rejected' : 'Reject'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AppliedJob;
