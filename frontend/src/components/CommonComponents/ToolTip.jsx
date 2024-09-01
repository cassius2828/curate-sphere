const ToolTip = ({ text }) => {
  return (
    <div className="bg-gray-900 text-gray-100 p-3 text-lg min-h-24 rounded-sm  absolute -top-32 fade-in">
      <p>{text}</p>
    </div>
  );
};
export default ToolTip;
