// React and Router Imports
import { useState } from "react";
import { useNavigate } from "react-router";
// Component and Service Imports
import Btn from "../CommonComponents/Btn";
import MessageModal from "../CommonComponents/Modals/MessageModal";
import { updateUserPassword } from "../../services/profileService";
// Context Hook Import
import useGlobalContext from "../../context/global/useGlobalContext";
const initialFormData = {
  currentPassword: {
    input: "",
    isValid: true,
  },
  newPassword: {
    input: "",
    isValid: true,
  },
  confirmPassword: {
    input: "",
    isValid: true,
  },
};
// Change Password Form Component
export const ChangePasswordForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  // Destructure form data for easier access
  const { currentPassword, newPassword, confirmPassword } = formData;

  // Global user context
  const { user } = useGlobalContext();

  // State for feedback messages and success status
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // React Router's navigate hook
  const navigate = useNavigate();

  ///////////////////////////
  // Handle form submission
  ///////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate password inputs
    if (
      !currentPassword.input ||
      !newPassword.input ||
      !confirmPassword.input
    ) {
      setMessage("Please fill in all fields");
      setSuccess(false);
      return;
    }

    if (currentPassword.input === newPassword.input) {
      setMessage(
        "Please choose a different password than your current one to update your password"
      );
      setSuccess(false);
      return;
    }
    if (newPassword.input !== confirmPassword.input) {
      setMessage("Passwords do not match");
      setSuccess(false);
      return;
    }

    ///////////////////////////
    // Function to update the user's password
    ///////////////////////////
    const fetchUpdateUserPassword = async () => {
      try {
        const data = await updateUserPassword(
          currentPassword.input,
          newPassword.input,
          confirmPassword.input,
          user.user.id
        );

        // Handle response from the password update request
        if (data.message) {
          setMessage(data.message);
          setSuccess(true);
        } else if (data.error) {
          setMessage(data.error);
          setSuccess(false);
        }
      } catch (err) {
        console.error(err);
        console.log("Unable to use service file to update password");
      }
    };

    fetchUpdateUserPassword();
  };

  ///////////////////////////
  // Handle form field changes
  ///////////////////////////
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...formData, [name]: { ...prev[name], input: value } };
    });
    if (value.length === 0) {
      setFormData((prev) => {
        return { ...formData, [name]: { ...prev[name], isValid: false } };
      });
    } else if (value.length > 0 && formData[name].isValid === false) {
      setFormData((prev) => {
        return { ...formData, [name]: { ...prev[name], isValid: true } };
      });
    }
  };

  ///////////////////////////
  // Handle cancel button action
  ///////////////////////////
  const handleCancel = () => {
    setFormData(initialFormData);
    navigate("/");
  };
  ///////////////////////////
  // Handle reset input fields
  ///////////////////////////
  const handleResetInputFields = () => {
    setFormData(initialFormData);
    setMessage("");
    setSuccess(false);
  };

  return (
    <>
      {message && success ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-center">
          <span data-cy="success-message" className="text-2xl text-green-500">
            {message}
          </span>
          <button
            onClick={handleResetInputFields}
            data-cy="reset-password-fields"
            className="relative text-xl border-2 border-gray-800 text-gray-800 p-3 capitalize"
          >
            reset input fields
          </button>
        </div>
      ) : message && !success ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-center">
          <span data-cy="error-message" className="text-2xl text-red-500">
            {message}
          </span>
          <button
            onClick={handleResetInputFields}
            data-cy="reset-password-fields"
            className="relative text-xl border-2 border-gray-800 text-gray-800 p-3 capitalize"
          >
            reset input fields
          </button>
        </div>
      ) : (
        <></>
      )}

      <form className="mx-auto p-12 rounded-md w-full md:w-1/2">
        {/* Current Password */}
        <div className="mb-5">
          <label
            htmlFor="currentPassword"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className={`${
              currentPassword.isValid
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "border-red-500 focus:ring-red-500 focus:border-red-500"
            }bg-gray-50 border  text-gray-900 text-xl rounded-lg block w-full p-2.5`}
            placeholder="Enter your Current Password"
            value={currentPassword.input}
            onChange={handleChange}
            required
          />
        </div>

        {/* New Password */}
        <div className="mb-5">
          <label
            htmlFor="newPassword"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className={`${
              newPassword.isValid
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "border-red-500 focus:ring-red-500 focus:border-red-500"
            }bg-gray-50 border  text-gray-900 text-xl rounded-lg block w-full p-2.5`}
            placeholder="Enter your new password"
            value={newPassword.input}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm New Password */}
        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-xl font-medium text-gray-900"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`${
              confirmPassword.isValid
                ? "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                : "border-red-500 focus:ring-red-500 focus:border-red-500"
            }bg-gray-50 border  text-gray-900 text-xl rounded-lg block w-full p-2.5`}
            placeholder="Confirm your password"
            value={confirmPassword.input}
            onChange={handleChange}
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full flex justify-center items-center gap-12">
          <Btn handleAction={handleCancel} text="Cancel" />
          <Btn handleAction={handleSubmit} text="Change Password" />
        </div>

        {/* Feedback Modal */}
        {/* {message && (
          <MessageModal
            message={message}
            setMessage={setMessage}
            success={success}
            onClose={() =>
              setFormData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
            }
          />
        )} */}
      </form>
    </>
  );
};
