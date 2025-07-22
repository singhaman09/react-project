import React from "react";
import { User } from "../../types";
import { getFullName } from "../../utils/helpers";

interface TableBodyProps {
  data: User[];
  isLoading: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <tbody>
        <tr>
          <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
            Loading data...
          </td>
        </tr>
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
            No data found matching your search criteria.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((user) => (
        <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {getFullName(user)}
          </td>
          <td className="px-6 py-4">{user.email}</td>
          <td className="px-6 py-4">{user.role}</td>
          <td className="px-6 py-4">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                user.status === "active"
                  ? "bg-green-100 text-green-800"
                  : user.status === "inactive"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {user.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
