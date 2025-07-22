import React from "react";

const StatsTable: React.FC = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-600">Users</p>
        <h2 className="text-2xl font-bold">1,234</h2>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-600">Revenue</p>
        <h2 className="text-2xl font-bold">$12,345</h2>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-600">Orders</p>
        <h2 className="text-2xl font-bold">567</h2>
      </div>
    </div>

    <div className="overflow-x-auto mt-6">
      <table className="table-auto w-full text-sm text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="px-4 py-2">Alice</td>
            <td className="px-4 py-2">alice@example.com</td>
            <td className="px-4 py-2 text-green-600">Active</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-4 py-2">Bob</td>
            <td className="px-4 py-2">bob@example.com</td>
            <td className="px-4 py-2 text-red-600">Inactive</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

export default StatsTable;
