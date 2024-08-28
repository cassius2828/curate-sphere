// React Imports
import { useEffect, useState } from "react";
// Component Imports
import Btn from "../CommonComponents/Btn";
// Context and Service Imports
import useGlobalContext from "../../context/global/useGlobalContext";
import { updateUserInfo } from "../../services/profileService";
import { getUser } from "../../services/authService";

export const ProfileForm = () => {
  // Context and State Initialization
  const { user, setUser } = useGlobalContext();

  // Initialize formData state with user info
  const initialFormData = {
    username: user.user.username,
    email: user.user.email,
    bio: user.user.bio,
    headerImg: "",
    profileImg: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { username, email, bio, headerImg, profileImg } = formData;

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const multiFormData = new FormData();
    multiFormData.append("username", username);
    multiFormData.append("email", email);
    multiFormData.append("bio", bio);
    multiFormData.append("headerImg", headerImg);
    multiFormData.append("profileImg", profileImg);

    try {
      const data = await updateUserInfo(multiFormData, user.user.id);
      // Handle email confirmation message
      if (data.confirmEmailMessage.message) {
        setMessage(data.confirmEmailMessage.message);
      } else if (data.confirmEmailMessage.error) {
        setError(data.confirmEmailMessage.error);
      } else if (data.message && !data.confirmEmailMessage.error) {
        setMessage(data.message);
      }
      // Update user token if available
      if (data.token) {
        setUser(getUser());
      }
    } catch (err) {
      console.error(
        "Unable to submit form data to backend to update user info",
        err
      );
    }
  };

  // Handle file input changes for images
  const handleFileChange = (e) => {
    const { files, name } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Debugging useEffect to check user state
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      {message && (
        <span className="text-green-500 text-2xl text-center">{message}</span>
      )}
      {error && (
        <span className="text-red-500 text-2xl text-center">{error}</span>
      )}

      <form className="mx-auto p-12 rounded-md w-full md:w-1/2">
        {/* Username Input */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your username"
            value={username}
            onChange={handleChange}
          />
        </div>

        {/* Email Input */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@example.com"
            value={email}
            onChange={handleChange}
          />
        </div>

        {/* Bio Input */}
        <div className="mb-5">
          <label
            htmlFor="bio"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Bio
          </label>
          <input
            type="textarea"
            id="bio"
            name="bio"
            maxLength={255}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your bio"
            value={bio}
            onChange={handleChange}
          />
        </div>

        {/* Header Image Input */}
        <div className="mb-5">
          <label
            htmlFor="headerImg"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Header Image
          </label>
          <input
            type="file"
            id="headerImg"
            name="headerImg"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={handleFileChange}
          />
        </div>

        {/* Profile Image Input */}
        <div className="mb-5">
          <label
            htmlFor="profileImg"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Profile Image
          </label>
          <input
            type="file"
            id="profileImg"
            name="profileImg"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={handleFileChange}
          />
        </div>

        {/* Form Buttons */}
        <div className="w-full flex justify-center items-center gap-12">
          <Btn
            handleAction={() => setFormData(initialFormData)}
            text="Cancel"
          />
          <Btn handleAction={handleSubmit} text="Update" />
        </div>
      </form>
    </>
  );
};
