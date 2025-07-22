import React from "react";

const PricingTable: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white shadow-md p-4 rounded-lg text-center hover:scale-105 transition cursor-pointer">
        <h3 className="font-bold text-xl mb-2">Basic</h3>
        <p className="text-2xl font-semibold">$9/mo</p>
      </div>
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg p-4 rounded-lg text-center hover:scale-105 transition cursor-pointer">
        <h3 className="font-bold text-xl mb-2">Recommended</h3>
        <p className="text-2xl font-semibold">$19/mo</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg text-center hover:scale-105 transition cursor-pointer">
        <h3 className="font-bold text-xl mb-2">Plus</h3>
        <p className="text-2xl font-semibold">$29/mo</p>
      </div>
    </div>
  );
};

export default PricingTable;
