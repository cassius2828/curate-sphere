import {React, useState} from "react";
import { register } from "../../services/authService";
import Btn from "../CommonComponents/Btn";
import { useNavigate } from "react-router";
import useGlobalContext from "../../context/global/useGlobalContext";


const initialFormData = {
  username: '',
  password: '',
  confirmPassword: ''
}

const RegisterForm = () => {
  const [formData, setFormData] = useState(initialFormData)
  const {setUser} = useGlobalContext();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        return alert('Passwords must match.')
      }
      const user = await register(formData);
      console.log("user registered successfully");
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
      <h1 className="text-3xl text-neutral-700 mb-12">Register</h1>
      <form className="max-w-sm mx-auto border border-neutral-900 p-12 rounded-md">
        {/* username */}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@flowbite.com"
            value={formData.username}
            onChange={handleChange}

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
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={handleChange}
            value={formData.password}
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
            name="confirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={handleChange}
            value={formData.confirmPassword}
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
