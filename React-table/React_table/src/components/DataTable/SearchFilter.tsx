import React from "react";
import { SearchIcon } from "../UI/Icons";

interface SearchFilterProps {
  filterText: string;
  onFilterChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  filterText,
  onFilterChange,
}) => {
  return (
    <div className="mb-4 relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          placeholder="Search by name or email..."
          value={filterText}
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
