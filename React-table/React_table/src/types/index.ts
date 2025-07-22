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
  key: keyof User | null;
  direction: "ascending" | "descending";
}

export interface PaginationConfig {
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
}

export interface TableColumn {
  key: keyof User;
  label: string;
  sortable: boolean;
}
