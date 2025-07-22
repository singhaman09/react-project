import React from "react";
import { SortConfig, TableColumn } from "../../types";
import { ChevronUpIcon, ChevronDownIcon } from "../UI/Icons";

interface TableHeaderProps {
  columns: TableColumn[];
  sortConfig: SortConfig;
  onSort: (key: keyof TableColumn["key"]) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  sortConfig,
  onSort,
}) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
      <tr>
        {columns.map((column) => (
          <th
            key={String(column.key)}
            scope="col"
            className={`px-6 py-3 ${
              column.sortable ? "cursor-pointer select-none" : ""
            }`}
            onClick={() => column.sortable && onSort(column.key)}
          >
            <div className="flex items-center">
              {column.label}
              {column.sortable && sortConfig.key === column.key && (
                <span className="ml-1">
                  {sortConfig.direction === "ascending" ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
