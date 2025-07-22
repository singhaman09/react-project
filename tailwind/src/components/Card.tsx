import React from "react";
import icon1 from "../assets/bg.jpg";
const Card: React.FC = () => (
  <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
    <img src={icon1} alt="Nature" />
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Island</h2>
      <p className="text-gray-600">This is a Maldives Tropical Island.</p>
      <a href="https://www.istockphoto.com/photo/maldives-island-gm1442179368-481642124">
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Learn More
        </button>
      </a>
    </div>
  </div>
);

export default Card;
