import React, { useState, useEffect, useMemo } from "react";
import { User, SortConfig, PaginationConfig, TableColumn } from "../../types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import SearchFilter from "./SearchFilter";
import LoadingSpinner from "./LoadingSpinner";
import {
  sortData,
  filterData,
  paginateData,
  calculateTotalPages,
} from "../../utils/helpers";
import { useDebounce } from "../../hooks/useDebounce";

const DataTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filterText, setFilterText] = useState<string>("");
  const debouncedFilterText = useDebounce<string>(filterText, 300);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  });

  const [pagination, setPagination] = useState<PaginationConfig>({
    currentPage: 1,
    rowsPerPage: 10,
    totalPages: 1,
  });

  const columns: TableColumn[] = [
    { key: "name" as keyof User, label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: false },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/users?limit=50");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const transformedUsers: User[] = data.users.map((user: any) => ({
          ...user,
          role: ["QA", "React", "Node", "SDET"][Math.floor(Math.random() * 4)],
          status: ["active", "inactive", "pending"][
            Math.floor(Math.random() * 3)
          ] as "active" | "inactive" | "pending",
        }));

        setUsers(transformedUsers);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSort = (key: keyof User) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          key,
          direction:
            prevConfig.direction === "ascending" ? "descending" : "ascending",
        };
      }
      return { key, direction: "ascending" };
    });
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleRowsPerPageChange = (rowsPerPage: number) => {
    setPagination((prev) => ({
      ...prev,
      rowsPerPage,
      currentPage: 1,
      totalPages: calculateTotalPages(filteredUsers.length, rowsPerPage),
    }));
  };

  const handleFilterChange = (value: string) => {
    setFilterText(value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const filteredUsers = useMemo(() => {
    return filterData(users, debouncedFilterText);
  }, [users, debouncedFilterText]);

  const sortedUsers = useMemo(() => {
    return sortData(filteredUsers, sortConfig);
  }, [filteredUsers, sortConfig]);

  const paginatedUsers = useMemo(() => {
    return paginateData(
      sortedUsers,
      pagination.currentPage,
      pagination.rowsPerPage
    );
  }, [sortedUsers, pagination.currentPage, pagination.rowsPerPage]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalPages: calculateTotalPages(filteredUsers.length, prev.rowsPerPage),
    }));
  }, [filteredUsers, pagination.rowsPerPage]);

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-medium">Error: {error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      <SearchFilter
        filterText={filterText}
        onFilterChange={handleFilterChange}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <TableHeader
                columns={columns}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
              <TableBody data={paginatedUsers} isLoading={isLoading} />
            </table>
          </div>

          <Pagination
            pagination={pagination}
            totalItems={filteredUsers.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}
    </div>
  );
};

export default DataTable;
