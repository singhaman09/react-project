export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  role: string;
  status: "active" | "inactive" | "pending";
}

export interface SortConfig {
  key: keyof User | "name";
  direction: "ascending" | "descending";
}

export interface PaginationConfig {
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
}

export interface TableColumn {
  key: keyof User | "name";
  label: string;
  sortable: boolean;
}
