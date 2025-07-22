import React, { useMemo } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/footer';

import icon1 from '../assets/bottle.jpg';
import icon2 from '../assets/cosmetics.jpeg';
import icon3 from '../assets/perfume.png';
import icon4 from '../assets/steel.jpeg';

// useMemo
const home = () => {
  const productList = useMemo(() => (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 ">
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2">Product 1</h3>
        <img src={icon1} alt="Product 1" className="w-full h-48 object-contain rounded-md mb-4" />
        <p className="text-gray-600">White Skincare Products.</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2">Product 2</h3>
        <img src={icon2} alt="Product 2" className="w-full h-48 object-contain rounded-md mb-4" />
        <p className="text-gray-600">White Cosmetic Bottles.</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2">Product 3</h3>
        <img src={icon3} alt="Product 3" className="w-full h-48 object-contain rounded-md mb-4" />
        <p className="text-gray-600">Glass Perfume Bottles</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-2">Product 4</h3>
        <img src={icon4} alt="Product 4" className="w-full h-48 object-contain rounded-md mb-4" />
        <p className="text-gray-600">Metallic Stainless Steel Products</p>
      </div>
    </div>
  ), []);

  return (
    <div className='overflow-y-hidden flex flex-col min-h-screen'>
      <Header />
      <div className="bg-blue-300 py-30 border-1 flex-grow">
        <h2 className="text-center font-bold text-4xl text-black mb-10">Products</h2>
        {productList}
      </div>
      <Footer />
    </div>
  );
};

export default home;
