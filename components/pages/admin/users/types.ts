export type UserStatus = "pending" | "approved" | "rejected";
export type FilterStatus = "all" | "pending" | "approved" | "rejected";

export interface User {
  id: string;
  mobile: string;
  phone: string;
  verify: boolean;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  hasNextPage: boolean;
}
