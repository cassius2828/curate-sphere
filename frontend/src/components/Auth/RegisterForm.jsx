// React imports
import { useState } from "react";
import { useNavigate } from "react-router";
// Service and context imports
import { register } from "../../services/authService";
import useGlobalContext from "../../context/global/useGlobalContext";
// Component imports
import Btn from "../CommonComponents/Btn";

// Initial state for the form data
const initialFormData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

///////////////////////////
// RegisterForm Component
///////////////////////////
const RegisterForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");

  const { setUser } = useGlobalContext();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        return alert("Passwords must match.");
      }

      const user = await register(formData);
      console.log("User registered successfully");
      setUser(user);
      navigate("/"); // Navigate to the home page after registration
    } catch (err) {
      console.error("Registration error:", err);
      setMessage(err.message);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="flex flex-col items-center font-marcellus min-h-screen">
      <h1 className="text-3xl text-neutral-700 mb-12">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto border border-neutral-900 p-12 rounded-md"
      >
        {message && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 text-center">
            <span data-cy="error-message" className="text-2xl text-red-500">
              {message}
            </span>
          </div>
        )}
        {/* Username input field */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
          />
        </div>

        {/* Email input field */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address (e.g., user@example.com)."
          />
        </div>

        {/* Password input field */}
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
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password input field */}
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
            name="confirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit button */}
        <div className="w-full flex justify-center">
          <Btn handleAction={handleSubmit} text="Register" />
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
