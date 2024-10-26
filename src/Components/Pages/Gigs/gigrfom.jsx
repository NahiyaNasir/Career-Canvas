import { useContext, useState } from "react";
// import useAxiosPublic from "../../../Hooks/AxiosHooks/useAxiosPublic";
import toast from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API;
const CreateGig = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    userImage: null,
    projectImages: [],
    userName: "",
    userId: user.uid,
    projectDetail: "",
    skills: "",
    contactEmail: "",
    contactPhone: "",
    faqs: [{ question: "", answer: "" }], // Initialize with one FAQ
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (name === "userImage") {
        setFormData({ ...formData, userImage: files[0] });
      } else if (name === "projectImages") {
        setFormData({ ...formData, projectImages: Array.from(files) });
      }
    } else if (name.startsWith("faq")) {
      const index = name.split("-")[1];
      const faqs = [...formData.faqs];
      if (name.startsWith("faqQuestion")) {
        faqs[index].question = value;
      } else {
        faqs[index].answer = value;
      }
      setFormData({ ...formData, faqs });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const addFaq = () => {
    setFormData({
        ...formData,
        faqs: [...formData.faqs, { question: '', answer: '' }]
    });
};

  const uploadToImageBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const apiKey = image_hosting_key;

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      return response.data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload images to ImageBB
    const userImageUrl = await uploadToImageBB(formData.userImage);
    const projectImageUrls = await Promise.all(
      formData.projectImages.map((image) => uploadToImageBB(image))
    );

    if (!userImageUrl || projectImageUrls.some((url) => !url)) {
      toast.error("Image upload failed. Please try again.");
      return;
    }

    const gigData = {
      title: formData.title,
      userImage: userImageUrl,
      projectImages: projectImageUrls,
      userName: formData.userName,
      userId: formData.userId,
      projectDetail: formData.projectDetail,
      skills: formData.skills.split(","),
      contactInfo: {
        email: formData.contactEmail,
        phone: formData.contactPhone,
      },
      faq: formData.faqs,
    };

    try {
      const response = await fetch("http://localhost:8000/api/gigs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gigData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Gig created successfully");
        console.log("Gig created successfully:", data);
      } else {
        const errorText = await response.text();
        console.error("Error creating gig:", errorText);
        toast.error("Error creating gig");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the gig");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Create a New Gig
      </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Gig Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="userImage"
              className="block text-sm font-medium text-gray-700"
            >
              User Image
            </label>
            <input
              type="file"
              id="userImage"
              name="userImage"
              accept="image/*"
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="projectImages"
              className="block text-sm font-medium text-gray-700"
            >
              Project Images
            </label>
            <input
              type="file"
              id="projectImages"
              name="projectImages"
              accept="image/*"
              multiple
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="projectDetail"
              className="block text-sm font-medium text-gray-700"
            >
              Project Details
            </label>
            <textarea
              id="projectDetail"
              name="projectDetail"
              rows="4"
              value={formData.projectDetail}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700"
            >
              Skills (comma separated)
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Contact Information Section */}
          <div className="border-t border-gray-300 pt-4 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="contactPhone"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Phone (optional)
              </label>
              <input
                type="text"
                id="contactPhone"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="border-t border-gray-300 pt-4 mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              FAQ (optional)
            </h2>
            <div>
              {formData.faqs.map((faq, index) => (
                <div key={index} className="faq-item mb-4">
                  <label
                    htmlFor={`faqQuestion-${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Question
                  </label>
                  <input
                    type="text"
                    id={`faqQuestion-${index}`}
                    name={`faqQuestion-${index}`}
                    value={faq.question}
                    onChange={handleInputChange}
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your question"
                  />
                  <label
                    htmlFor={`faqAnswer-${index}`}
                    className="block text-sm font-medium text-gray-700 mt-2"
                  >
                    Answer
                  </label>
                  <textarea
                    id={`faqAnswer-${index}`}
                    name={`faqAnswer-${index}`}
                    value={faq.answer}
                    onChange={handleInputChange}
                    rows="2"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your answer"
                  ></textarea>
                </div>
              ))}
              <button type="button" onClick={addFaq} className="mt-4 text-green-600 hover:text-green-800">+ Add another FAQ</button>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Create Gig
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateGig;
