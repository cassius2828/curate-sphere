import React, { useState } from "react";
import { login } from "../../services/authService";
import Btn from "../CommonComponents/Btn";
import { useNavigate } from "react-router";
import useGlobalContext from "../../context/useGlobalContext";

const initialFormData = {
  username: '',
  password: ''
}

const LoginForm = () => {
  const [formData, setFormData] = useState(initialFormData)
  const {setUser} = useGlobalContext();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData);
      console.log("user logged in successfully");
      setUser(user)
      navigate('/')
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleChange = (e) => {
    const {value, name} = e.target
    setFormData({...formData, [name]: value})
  }

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-3xl text-neutral-700 mb-12">Login</h1>
      <form className="max-w-sm mx-auto border border-neutral-900 p-12 rounded-md">
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@flowbite.com"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Remember me
          </label>
        </div>
        <Btn handleAction={handleSubmit} text={`login`} />
      </form>
    </section>
  );
};

export default LoginForm;
