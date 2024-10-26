import { useState } from "react";
import JobDetails from "./JobDetails";

const JobsCard = ({ job }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const {
    jobTitle,
    jobDescription,
    skills,
    salaryRange,
    company,
    location,
    employmentType,
    remoteOption,
    experience,
  } = job;

  const toggleDetails = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSelectedJob(job);
    } else {
      setSelectedJob(null);
    }
  };

  const closeDetails = () => {
    setIsOpen(false);
    setSelectedJob(null);
  };

  return (
    <>
      <div
        onClick={toggleDetails}
        className="border p-5 m-2 rounded-lg shadow-md hover:shadow-xl  hover:border-b-8 hover:border-green-600 transition-all duration-300 bg-white h-56"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
          <h1 className="text-xl md:text-xl font-semibold text-gray-800 hover:text-green-600 transition duration-200 border-b-2 border-green-500">{jobTitle}</h1>
          <p className="text-gray-500 text-sm md:text-base">{location}</p>
        </div>

        <div className="text-gray-700 text-base mb-4 break-words whitespace-pre-wrap">
          {jobDescription}
        </div>

        <div className="flex flex-wrap space-x-2 mb-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-green-400 text-xs text-white md:text-sm px-3 py-1 rounded-full mb-2 transition duration-200 hover:bg-green-200"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-gray-600 text-sm md:text-base">
          <p className="">
            {employmentType} - <span className="font-semibold text-green-500">{remoteOption}</span>
          </p>
          <p>
            Experience: <span className="font-semibold">{experience ? `${experience} Years` : "No Experience Needed"}</span>
          </p>
          <p>Company: <span className="font-semibold">{company}</span></p>
          <p className="text-green-600 font-bold mt-2 md:mt-0">{salaryRange} tk</p>
        </div>
      </div>

      {isOpen && selectedJob && (
        <JobDetails
          toggleDetails={toggleDetails}
          closeDetails={closeDetails}
          isOpen={isOpen}
          job={selectedJob}
        />
      )}
    </>
  );
};

export default JobsCard;
