import { useState } from "react";
import Btn from "../CommonComponents/Btn";

const initialFormData = {
  username: "", // For the username input
  email: "", // For the email input
  headerImg: null, // For the file input (header image)
  profileImage: null, // For the file input (profile image)
  currentPassword: "",
  newPassword: "", // For the password input
  confirmPassword: "", // For the confirm password input
};

export const ProfileForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const handleSubmit = () => {
    console.log("submit");
  };
  const handleFileChange = (e) => {};
  const handleCancel = () => {
    console.log("cancel");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form className=" mx-auto  p-12 rounded-md w-full md:w-1/2">
      {/* Username */}
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
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
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
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Header Image */}
      <div className="mb-5">
        <label
          htmlFor="headerImage"
          className="block mb-2 text-xl font-medium text-gray-900"
        >
          Header Image
        </label>
        <input
          type="file"
          id="headerImage"
          name="headerImage"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={handleFileChange}
          required
        />
      </div>

      {/* Profile Image */}
      <div className="mb-5">
        <label
          htmlFor="profileImage"
          className="block mb-2 text-xl font-medium text-gray-900"
        >
          Profile Image
        </label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          onChange={handleFileChange}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="w-full flex justify-center items-center gap-12">
        <Btn handleAction={handleCancel} text="Cancel" />
        <Btn handleAction={handleSubmit} text="Submit" />
      </div>
    </form>
  );
};
