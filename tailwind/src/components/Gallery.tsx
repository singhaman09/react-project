import React from "react";
import i1 from "../assets/1.jpg";
import i2 from "../assets/2.jpg";
import i3 from "../assets/3.jpg";
import i4 from "../assets/4.jpg";
const Gallery: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[i1, i2, i3, i4].map((id) => (
      <img
        key={id}
        src={id}
        className=" cursor-pointer w-full h-40 object-cover hover:shadow-lg rounded transition hover:scale-105"
        alt="Gallery"
      />
    ))}
  </div>
);

export default Gallery;
