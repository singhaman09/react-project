//Use Intl.Collator for locale-aware sorting.

import { User, SortConfig } from "../types";

export const getFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`;
};

export const sortData = (data: User[], sortConfig: SortConfig): User[] => {
  if (!sortConfig.key) return data;

  return [...data].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    if (sortConfig.key === "name") {
      aValue = getFullName(a).toLowerCase();
      bValue = getFullName(b).toLowerCase();
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
    }

    if (aValue < bValue) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });
};

export const filterData = (data: User[], filterText: string): User[] => {
  const searchTerm = filterText.toLowerCase().trim();
  if (!searchTerm) return data;

  return data.filter((user) => {
    const fullName = getFullName(user).toLowerCase();
    const email = user.email.toLowerCase();

    return fullName.includes(searchTerm) || email.includes(searchTerm);
  });
};

export const paginateData = (
  data: User[],
  currentPage: number,
  rowsPerPage: number
): User[] => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  return data.slice(startIndex, startIndex + rowsPerPage);
};

export const calculateTotalPages = (
  totalItems: number,
  rowsPerPage: number
): number => {
  return Math.ceil(totalItems / rowsPerPage);
};
