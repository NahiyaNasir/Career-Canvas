// src/Context/FormContext.js
import { createContext, useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';
export const FormContext = createContext();
import useAxiosPublic from '../../Hooks/AxiosHooks/useAxiosPublic';

export const FormProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosPublic();
  const [formData, setFormData] = useState({
    templateId: '',
    personalInfo: {
      name: '',
      phone: '',
      email: '',
      linkedin: '',
      github: ''
    },
    careerObjective: '',
    education: [],
    skills: [],
    projects: [],
    languages: [],
  });

  // console.log(formData);

  const updatePersonalInfo = (data) => {
    setFormData((prev) => ({ ...prev, personalInfo: data }));
  };

  const updateCareerObjective = (data) => {
    setFormData((prev) => ({ ...prev, careerObjective: data }));
  };

  const updateEducation = (data) => {
    setFormData((prev) => ({ ...prev, education: data }));
  };

  const updateSkills = (data) => {
    setFormData((prev) => ({ ...prev, skills: data }));
  };

  const updateProjects = (data) => {
    setFormData((prev) => ({ ...prev, projects: data }));
  };

  const updateLanguages = (data) => {
    setFormData((prev) => ({ ...prev, languages: data }));
  };


  const setTemplateId = (id) => {
    setFormData((prev) => ({ ...prev, templateId: id }));
  };

  // Function to send all data to the server
  const submitFormData = async () => {
    // Get user context
    const formDataWithUserId = { ...formData, userId: user.uid }; // Add userId to formData
  console.log(formDataWithUserId);
    try {
      const response = await axiosInstance.post('/api/formdata', formDataWithUserId);
  
      // Show SweetAlert modal upon success
      Swal.fire({
        title: 'Success!',
        text: 'Form data submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      // Return the response data to the caller
      return response.data; // Send back the response data
    } catch (error) {
      console.error('Error submitting form data:', error.message);
  
      // Show SweetAlert error modal
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting the form data.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
  
      return null; // Return null or any error indicator
    }
  };
  
  // const submitFormData = async () => {
  //   // Prepare dummy data
  //   const dummyData = {
  //     templateId: 'template_123',
  //     personalInfo: {
  //       name: 'John Doe',
  //       phone: '123-456-7890',
  //       email: 'johndoe@example.com',
  //       linkedin: 'linkedin.com/in/johndoe',
  //       github: 'github.com/johndoe',
  //     },
  //     careerObjective: 'Seeking a challenging position in a reputable organization.',
  //     education: [
  //       {
  //         degree: 'Bachelor of Science in Computer Science',
  //         institution: 'University A',
  //         startDate: new Date('2018-09-01'),
  //         endDate: new Date('2022-05-30'),
  //         description: 'Focused on software development and algorithms.',
  //       },
  //       {
  //         degree: 'Master of Science in Software Engineering',
  //         institution: 'University B',
  //         startDate: new Date('2022-09-01'),
  //         endDate: new Date('2024-05-30'),
  //         description: 'Specialized in cloud computing and data management.',
  //       },
  //     ],
  //     skills: 'JavaScript,React,Node.js,MongoDB,Express',
  //     projects: [
  //       {
  //         title: 'Personal Portfolio',
  //         description: 'A portfolio website to showcase my work.',
  //         link: 'https://johndoe-portfolio.com',
  //       },
  //       {
  //         title: 'E-Commerce Platform',
  //         description: 'An online store built using MERN stack.',
  //         link: 'https://github.com/johndoe/e-commerce',
  //       },
  //     ],
  //     languages: 'English , Spanish',
  //   };

  //   // Add userId to dummy data
  //   const formDataWithUserId = { userId: user.uid ,...dummyData }; // Add userId to formData

  //   try {
  //     const response = await axiosInstance.post('/api/formdata', formDataWithUserId);
  //     console.log('Form data submitted successfully:', response.data);
  //     // Handle successful response here
  //   } catch (error) {
  //     console.error('Error submitting form data:', error);
  //     // Handle error response here
  //   }
  // };
  return (
    <FormContext.Provider value={{
      formData,
      updatePersonalInfo,
      updateCareerObjective,
      updateEducation,
      updateSkills,
      updateProjects,
      updateLanguages,

      setTemplateId,
      submitFormData
    }}>
      {children}
    </FormContext.Provider>
  );
};
