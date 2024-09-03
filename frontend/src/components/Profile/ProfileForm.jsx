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
    username: {
      input: user.user.username,
      isValid: true,
    },
    email: {
      input: user.user.email,
      isValid: true,
    },
    bio: {
      input: user.user.bio,
      isValid: true,
    },
    headerImg: "",
    profileImg: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { username, email, bio, headerImg, profileImg } = formData;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.input || !email.input) {
      setMessage("");
      return setError("Username and email fields cannot be left empty");
    }
    if (!emailRegex.test(email.input)) {
      setMessage("");
      return setError(
        "Please submit a valid email address. (e.g example@gmail.com)"
      );
    }
    const multiFormData = new FormData();
    multiFormData.append("username", username.input);
    multiFormData.append("email", email.input);
    multiFormData.append("bio", bio.input);
    multiFormData.append("headerImg", headerImg);
    multiFormData.append("profileImg", profileImg);

    try {
      const data = await updateUserInfo(multiFormData, user.user.id);
      // Handle email confirmation message
      if (data.confirmEmailMessage.message) {
        setMessage(data.confirmEmailMessage.message);
        setError("");
      } else if (data.confirmEmailMessage.error) {
        setMessage("");
        setError(data.confirmEmailMessage.error);
      } else if (data.message && !data.confirmEmailMessage.error) {
        setMessage(data.message);
        setError("");
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

  ///////////////////////////
  // Handle file input changes for images
  ///////////////////////////
  const handleFileChange = (e) => {
    const { files, name } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  ///////////////////////////
  // Handle text field changes
  ///////////////////////////
  const handleChange = (e) => {
    const { name, value } = e.target;
    // validates email
    if (name === "email") {
      const isEmailValid = emailRegex.test(value);
      setFormData((prev) => {
        return { ...formData, [name]: { isValid: isEmailValid, input: value } };
      });
    } else {
      // validates username
      setFormData((prev) => {
        return { ...formData, [name]: { ...prev[name], input: value } };
      });
      if (value.length === 0) {
        setFormData((prev) => {
          return { ...formData, [name]: { ...prev[name], isValid: false } };
        });
        // if the value is more than one and isValid was previously false then change to true
        // otherwise do not bother running function
      } else if (value.length > 0 && formData[name].isValid === false) {
        setFormData((prev) => {
          return { ...formData, [name]: { ...prev[name], isValid: true } };
        });
      }
    }
  };

  return (
    <>
      {message && (
        <span className="text-green-500 text-2xl text-center px-12">
          {message}
        </span>
      )}
      {error && (
        <span className="text-red-500 text-2xl text-center px-12">{error}</span>
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
            className={`${
              username.isValid
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "border-red-500 focus:ring-red-500 focus:border-red-500"
            }bg-gray-50 border  text-gray-900 text-xl rounded-lg block w-full p-2.5`}
            placeholder="Enter your username"
            value={username.input}
            onChange={handleChange}
            pattern="{3,0}"
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
            className={`${
              email.isValid
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "border-red-500 focus:ring-red-500 focus:border-red-500"
            }bg-gray-50 border  text-gray-900 text-xl rounded-lg block w-full p-2.5`}
            placeholder="name@example.com"
            value={email.input}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address (e.g., user@example.com)."
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
            className={`
            border-gray-300 focus:ring-blue-500 focus:border-blue-500
            bg-gray-50 border  text-gray-900 text-xl rounded-lg block w-full p-2.5`}
            placeholder="Enter your bio"
            value={bio.input}
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
            className={`"border-gray-300 focus:ring-blue-500 focus:border-blue-500
            bg-gray-50 border  text-gray-900 text-xl rounded-lg block w-full p-2.5`}
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
            className={`
                border-gray-300 focus:ring-blue-500 focus:border-blue-500
          bg-gray-50 border  text-gray-900 text-xl rounded-lg block w-full p-2.5`}
            onChange={handleFileChange}
          />
        </div>

        {/* Form Buttons */}
        <div
          data-cy="profile-form-action-btns"
          className="w-full flex justify-center items-center gap-12"
        >
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
