import { useEffect } from "react";

const FixedAlert = ({ message, success, onClose }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 2000);
  }, []);
  return (
    <div  className="flex flex-col items-center justify-center gap-4 bg-white p-8  rounded-lg shadow-lg  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fade-in-outFixedAlert">
      <span data-cy="alert"
        className={`${
          success ? "text-green-500" : "text-red-500"
        } text-2xl text-center w-full`}
      >
        {message}
      </span>
    </div>
  );
};
export default FixedAlert;
