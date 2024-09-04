import { useEffect } from "react";

const Alert = ({ message, success, setMessage, onClose }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 1000);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-white p-8  rounded-lg shadow-lg  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fade-in-out">
      <span
        className={`${
          success ? "text-green-500" : "text-red-500"
        } text-2xl text-center w-full`}
      >
        {message}
      </span>
    </div>
  );
};
export default Alert;
