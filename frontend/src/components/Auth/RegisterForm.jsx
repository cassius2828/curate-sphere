import React from "react";
import { register } from "../../services/authService";
import Btn from "../CommonComponents/Btn";

const RegisterForm = () => {
  let formData = {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(formData);
      console.log("user registered successfully");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-3xl text-neutral-700 mb-12">Register</h1>
      <form className="max-w-sm mx-auto border border-neutral-900 p-12 rounded-md">
        {/* username */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Username
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@flowbite.com"
            required
          />
        </div>{" "}
        {/* password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        {/* confirm passowrd */}
        <div className="mb-5">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="w-full flex justify-center">
          <Btn handleAction={handleSubmit} text="submit" />
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
