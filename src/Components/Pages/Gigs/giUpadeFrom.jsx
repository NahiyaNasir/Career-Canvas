import  { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateGig = ({ projectId }) => {
  const [formData, setFormData] = useState({
    title: '',
    userImage: null,
    projectImages: [],
    userName: '',
    projectDetail: '',
    skills: '',
    contactInfo: {
      email: '',
      phone: '',
    },
    faq: [{ question: '', answer: '' }],
  });

  // Fetch existing gig data
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const response = await axios.get(`/api/gigs/${projectId}`);
        const gig = response.data;
        setFormData({
          ...gig,
          skills: gig.skills.join(', '), // Convert array to comma-separated string
          contactInfo: gig.contactInfo,
        });
      } catch (error) {
        console.error('Error fetching gig:', error);
      }
    };

    fetchGig();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      projectImages: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('userImage', formData.userImage);
    formDataToSend.append('projectDetail', formData.projectDetail);
    formDataToSend.append('skills', formData.skills);
    formDataToSend.append('email', formData.contactInfo.email);
    formDataToSend.append('phone', formData.contactInfo.phone);
    formDataToSend.append('faq', JSON.stringify(formData.faq));

    formData.projectImages.forEach((file) => {
      formDataToSend.append('projectImages', file);
    });

    try {
      const response = await axios.put(`/api/gigs/${projectId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Gig updated successfully:', response.data);
      // Optionally, redirect or display a success message
    } catch (error) {
      console.error('Error updating gig:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Update Gig</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">User Image</label>
        <input
          type="file"
          name="userImage"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, userImage: e.target.files[0] })}
          className="mt-1 block w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project Images</label>
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="mt-1 block w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">User Name</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project Detail</label>
        <textarea
          name="projectDetail"
          value={formData.projectDetail}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Skills (comma-separated)</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Contact Email</label>
        <input
          type="email"
          name="email"
          value={formData.contactInfo.email}
          onChange={handleContactChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Contact Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.contactInfo.phone}
          onChange={handleContactChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Update Gig
      </button>
    </form>
  );
};

export default UpdateGig;
