import React from "react";
import { FaCheck, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

const ButtonGroup: React.FC = () => {
  return (
    <div className="flex gap-4 justify-center">
      <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-2xl cursor-pointer">
        <FaCheck /> Primary
      </button>
      <button className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-2xl cursor-pointer">
        <FaInfoCircle /> Secondary
      </button>
      <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl cursor-pointer">
        <FaExclamationTriangle /> Danger
      </button>
    </div>
  );
};

export default ButtonGroup;
