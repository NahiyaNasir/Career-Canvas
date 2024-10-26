// src/components/SubmitForm.js
import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from '../../../Providers/FormContext';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SubmitForm = () => {
  const { formData, submitFormData } = useContext(FormContext);
  const navigate = useNavigate();
  // Local state to handle form input
  const [formValues, setFormValues] = useState(formData);

  useEffect(() => {
    // Ensure languages is an array when initializing formValues
    setFormValues((prev) => ({
      ...prev,
      languages: Array.isArray(prev.languages) ? prev.languages : [prev.languages],
    }));
  }, [formData]);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleLanguagesChange = (e) => {
    const value = e.target.value;
    const languagesArray = value ? value.split(',').map(lang => lang.trim()) : [];
    setFormValues((prev) => ({
      ...prev,
      languages: languagesArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    await submitFormData(); // Calls the function to submit the data
    navigate('/dashboard/user-profile');
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-green-100 to-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-700 flex items-center mb-6">
        <FaCheckCircle className="mr-2" /> Submit Form
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information and Education Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <label className="block mb-2">
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={formValues.personalInfo.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your name"
            />
          </label>
          <label className="block mb-2">
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={formValues.personalInfo.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your email"
            />
          </label>
          <label className="block mb-2">
            <strong>Phone:</strong>
            <input
              type="tel"
              name="phone"
              value={formValues.personalInfo.phone}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your phone number"
            />
          </label>
          <label className="block mb-2">
            <strong>Website:</strong>
            <input
              type="url"
              name="website"
              value={formValues.personalInfo.website}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter your website URL"
            />
          </label>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Education</h3>
          {formValues.education.map((edu, index) => (
            <div key={index} className="border-b py-2">
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => {
                  const updatedEducation = [...formValues.education];
                  updatedEducation[index].degree = e.target.value;
                  setFormValues({ ...formValues, education: updatedEducation });
                }}
                className="p-2 border rounded w-full"
                placeholder="Degree"
              />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => {
                  const updatedEducation = [...formValues.education];
                  updatedEducation[index].institution = e.target.value;
                  setFormValues({ ...formValues, education: updatedEducation });
                }}
                className="p-2 border rounded w-full"
                placeholder="Institution"
              />
              <input
                type="text"
                value={edu.duration}
                onChange={(e) => {
                  const updatedEducation = [...formValues.education];
                  updatedEducation[index].duration = e.target.value;
                  setFormValues({ ...formValues, education: updatedEducation });
                }}
                className="p-2 border rounded w-full"
                placeholder="Duration"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormValues((prev) => ({
                ...prev,
                education: [...prev.education, { degree: '', institution: '', duration: '' }],
              }));
            }}
            className="mt-2 text-green-600 underline"
          >
            Add Education
          </button>
        </div>

        {/* Skills, Languages, and Projects Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Skills and Languages</h3>
          <label className="block mb-2">
            <strong>Skills:</strong>
            <input
              type="text"
              value={formValues.skills.join(", ")}
              onChange={(e) => setFormValues({ ...formValues, skills: e.target.value.split(',').map(skill => skill.trim()) })}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter skills separated by commas"
            />
          </label>
          <label className="block mb-2">
            <strong>Languages:</strong>
            <input
              type="text"
              value={formValues.languages}
              onChange={handleLanguagesChange}
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter languages separated by commas"
            />
          </label>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Projects</h3>
          {formValues.projects.map((project, index) => (
            <div key={index} className="border-b py-2">
              <input
                type="text"
                value={project.title}
                onChange={(e) => {
                  const updatedProjects = [...formValues.projects];
                  updatedProjects[index].title = e.target.value;
                  setFormValues({ ...formValues, projects: updatedProjects });
                }}
                className="p-2 border rounded w-full"
                placeholder="Project Title"
              />
              <input
                type="text"
                value={project.description}
                onChange={(e) => {
                  const updatedProjects = [...formValues.projects];
                  updatedProjects[index].description = e.target.value;
                  setFormValues({ ...formValues, projects: updatedProjects });
                }}
                className="p-2 border rounded w-full"
                placeholder="Project Description"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormValues((prev) => ({
                ...prev,
                projects: [...prev.projects, { title: '', description: '' }],
              }));
            }}
            className="mt-2 text-green-600 underline"
          >
            Add Project
          </button>
        </div>

        <button 
          type="submit" 
          className="mt-6 w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 hover:bg-green-500 transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitForm;
