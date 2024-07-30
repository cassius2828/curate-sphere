const Btn = ({
  handleAction,
  bgColor = "neutral",
  textColor = "white",
  text,
}) => {
  return (
    <button
      onClick={(e) => handleAction(e)}
      type="submit"
      className={`text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 `}
    >
      {text}
    </button>
    //   <button
    //   onClick={(e) => handleAction(e)}
    //   type="submit"
    //   className={`text-${textColor} bg-${bgColor}-700 hover:bg-${bgColor}-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 `}
    // >
    //   {text}
    // </button>
  );
};
export default Btn;
