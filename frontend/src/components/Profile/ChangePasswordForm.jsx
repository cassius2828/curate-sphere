// React and Router Imports
import { useState } from "react";
import { useNavigate } from "react-router";
// Component and Service Imports
import Btn from "../CommonComponents/Btn";
import MessageModal from "../CommonComponents/Modals/MessageModal";
import { updateUserPassword } from "../../services/profileService";
// Context Hook Import
import useGlobalContext from "../../context/global/useGlobalContext";

// Change Password Form Component
export const ChangePasswordForm = () => {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Destructure form data for easier access
  const { currentPassword, newPassword, confirmPassword } = formData;

  // Global user context
  const { user } = useGlobalContext();

  // State for feedback messages and success status
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // React Router's navigate hook
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password inputs
    if (currentPassword === newPassword) {
      return alert(
        "Please choose a different password than your current one to update your password"
      );
    }
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    // Function to update the user's password
    const fetchUpdateUserPassword = async () => {
      try {
        const data = await updateUserPassword(
          currentPassword,
          newPassword,
          confirmPassword,
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

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle cancel button action
  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    navigate("/");
  };

  return (
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your Current Password"
          value={currentPassword}
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter your new password"
          value={newPassword}
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-center items-center gap-12">
        <Btn handleAction={handleCancel} text="Cancel" />
        <Btn handleAction={handleSubmit} text="Update Password" />
      </div>

      {/* Feedback Modal */}
      {message && (
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
      )}
    </form>
  );
};