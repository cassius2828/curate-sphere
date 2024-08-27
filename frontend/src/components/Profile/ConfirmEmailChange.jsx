import { useState } from "react";
import { confirmEmailChange } from "../../services/profileService";
import { Link } from "react-router-dom";

const ConfirmEmailChange = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const userId = queryParams.get("userId");
  const handleConfirmEmail = async () => {
    try {
      const data = await confirmEmailChange(userId, email);
      console.log(data);
      if (data.message) {
        setMessage(data.message);
      }
      if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      console.error(err);
      console.log(`Could not user service file to confirm email change`);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {message && (
        <div className="relative flex justify-center text-center w-full md:w-[40rem] bg-gray-200 mb-12 h-40 p-4 rounded-md">
          <Link to={`/profiles/${userId}`}>
            <span className="absolute top-0 right-3 text-2xl">x</span>
            <span className="text-2xl text-green-500  w-full ">{message}</span>
          </Link>
        </div>
      )}
      {error && (
        <div className="relative flex justify-center text-center w-full md:w-[40rem] bg-gray-200 mb-12 h-40 p-4 rounded-md">
          <Link to={`/profiles/${userId}`}>
            <span className="absolute top-0 right-3 text-2xl">x</span>
            <span className="text-2xl text-red-500  w-full ">{error}</span>
          </Link>
        </div>
      )}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Confirm Email Change
      </h1>
      <div className="flex space-x-4">
        <Link to={`/profiles/${userId}`}>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            type="button"
          >
            Cancel Email Change
          </button>
        </Link>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          type="button"
          onClick={() => {
            handleConfirmEmail();
          }}
        >
          Confirm Email Change
        </button>
      </div>
    </div>
  );
};

export default ConfirmEmailChange;
