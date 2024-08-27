import { useEffect, useState } from "react";
import Btn from "../CommonComponents/Btn";
import useGlobalContext from "../../context/global/useGlobalContext";
import { updateUserInfo } from "../../services/profileService";
import { getUser } from "../../services/authService";

export const ProfileForm = () => {
  const { user, setUser } = useGlobalContext();
  //   initalize formData state
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

      if (data.confirmEmailMessage.message) {
        // if email is sent successfully
        setMessage(data.confirmEmailMessage.message);
      } else if (data.confirmEmailMessage.error) {
        // email to confirm did not send successfully
        setError(data.confirmEmailMessage.error);
      } else if (data.message && !data.confirmEmailMessage.error) {
        // no confirmation email was sent (user email was not updated)
        setMessage(data.message);
      }
      
    } catch (err) {
      console.error(err);
      console.log(`Unable to submit formdata to backend to update user info`);
    }
  };
  const handleFileChange = (e) => {
    const { files, name } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };
  const handleCancel = () => {
    console.log("cancel");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
          />
        </div>
        {/* bio */}
        <div className="mb-5">
          <label
            htmlFor="bio"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Bio
          </label>
          <input
            type="textarea"
            rows="5"
            cols="50"
            id="bio"
            name="bio"
            maxLength={255}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your bio"
            value={formData.bio}
            onChange={handleChange}
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
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-center items-center gap-12">
          <Btn handleAction={handleCancel} text="Cancel" />
          <Btn handleAction={handleSubmit} text="Update" />
        </div>
      </form>
    </>
  );
};
