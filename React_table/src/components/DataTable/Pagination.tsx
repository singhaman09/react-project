import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../UI/Icons";
import { PaginationConfig } from "../../types";

interface PaginationProps {
  pagination: PaginationConfig;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const { currentPage, rowsPerPage, totalPages } = pagination;

  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        <label htmlFor="rows-per-page" className="text-sm text-gray-700">
          Show
        </label>
        <select
          id="rows-per-page"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <span className="text-sm text-gray-700">entries per page</span>
      </div>

      <div className="text-sm text-gray-700">
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>

      <div className="flex items-center">
        <button
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon className="mr-2 w-4 h-4" />
          Previous
        </button>

        <div className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border-t border-b">
          Page {currentPage} of {totalPages}
        </div>

        <button
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ArrowRightIcon className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
