import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolTip from "../../CommonComponents/ToolTip";
import { useState } from "react";

export const ArtDetailActionBtn = ({ icon, handleAction, tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <li
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="p-3 w-12 flex justify-center items-center border border-gray-500 cursor-pointer relative"
    >
      {showTooltip && <ToolTip text={tooltipText} />}
      <FontAwesomeIcon onClick={handleAction} size="lg" icon={icon} />
    </li>
  );
};
