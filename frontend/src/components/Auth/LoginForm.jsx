// React imports
import { useState } from "react";
import { useNavigate } from "react-router";
// Service and context imports
import { login } from "../../services/authService";
import useGlobalContext from "../../context/global/useGlobalContext";
// Component imports
import Btn from "../CommonComponents/Btn";

// Initial state for the form data
const initialFormData = {
  username: "",
  password: "",
};

///////////////////////////
// LoginForm Component
///////////////////////////
const LoginForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  // State for feedback messages and success status
  const [message, setMessage] = useState("");

  const { setUser } = useGlobalContext();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData);
      setUser(user);
      navigate("/"); // Navigate to the home page after login
    } catch (err) {
      console.error("Login error:", err);
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
      <h1 className="text-3xl text-neutral-700 mb-12">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="w-3/5 max-w-[30rem] mx-auto border border-neutral-900 p-12 rounded-md"
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
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="ExampleUser123"
            value={formData.username}
            onChange={handleChange}
            required
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

        {/* Submit button */}
        <Btn handleAction={handleSubmit} text="Login" />
      </form>
    </section>
  );
};

export default LoginForm;
