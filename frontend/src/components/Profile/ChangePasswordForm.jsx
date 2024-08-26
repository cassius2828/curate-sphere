import { useState } from "react";
import Btn from "../CommonComponents/Btn";

export const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleSubmit = () => {
    console.log("suybiut");
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
        <Btn handleAction={handleSubmit} text="Submit" />
      </div>
    </form>
  );
};
