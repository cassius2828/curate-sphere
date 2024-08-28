const MessageModal = ({ message, success, setMessage, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 modal">
      <div className="flex flex-col items-center justify-center gap-4 bg-white p-8 h-96 rounded-lg shadow-lg w-3/4 md:w-1/2 max-w-[50rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          className="absolute top-0 right-3 text-4xl modal-close"
          onClick={() => {
            onClose();
            setMessage("");
          }}
        >
          &times;
        </button>{" "}
        <span
          className={`${
            success ? "text-green-500" : "text-red-500"
          } text-2xl text-center w-full`}
        >
          {message}
        </span>
      </div>
    </div>
  );
};
export default MessageModal;
