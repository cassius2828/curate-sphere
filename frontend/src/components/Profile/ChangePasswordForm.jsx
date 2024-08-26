import { useState } from "react";
import Btn from "../CommonComponents/Btn";
import { updateUserPassword } from "../../services/profileService";
import useGlobalContext from "../../context/global/useGlobalContext";
import MessageModal from "../CommonComponents/MessageModal";
import { useNavigate } from "react-router";

export const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { currentPassword, newPassword, confirmPassword } = formData;
  const { user } = useGlobalContext();
  const [message, setMessage] = useState("");
  const [success, setSuccuess] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // return alert('not ready to test on regular profiles')
    if (currentPassword === newPassword) {
      return alert(
        "Please choose a different password than your current to update your password"
      );
    }
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match.");
    }
    try {
      const fetchUpdateUserPassword = async () => {
        const data = await updateUserPassword(
          currentPassword,
          newPassword,
          confirmPassword,
          user.user.id
        );

        if (data.message) {
          setMessage(data.message);
          setSuccuess(true);
        }
        if (data.error) {
          setMessage(data.error);
          setSuccuess(false);
        }
      };
      fetchUpdateUserPassword();
    } catch (err) {
      console.error(err);
      console.log(`Unable to use service file to update password`);
    }
  };
  const handleCancel = () => {
    console.log("cancel");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <form className=" mx-auto  p-12 rounded-md w-full md:w-1/2">
      {/* current Password */}
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
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
      </div>
      {/* new password */}
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
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
      </div>

      {/* Confirm Password */}
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
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      {/* Submit Button */}
      <div className="w-full flex justify-center items-center gap-12">
        <Btn handleAction={handleCancel} text="Cancel" />
        <Btn handleAction={handleSubmit} text="Update Password" />
      </div>
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
