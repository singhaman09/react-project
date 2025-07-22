import React from "react";

const BlogPost: React.FC = () => (
  <div className="bg-white p-6 rounded-lg shadow-md grid md:grid-cols-4 gap-6">
    <div className="md:col-span-1 sticky top-4">
      <h4 className="font-bold mb-2">Author</h4>
      <p className="text-sm">Aman Rathore - Dev</p>
    </div>
    <div className="md:col-span-3 prose">
      <h1>Blog on Tailwind</h1>
      <p className="text-justify">Utility of Tailwind Css</p>
      <div className="flex gap-2 mt-4">
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
          #Tailwind
        </span>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
          #Dashboard
        </span>
      </div>
    </div>
  </div>
);

export default BlogPost;
