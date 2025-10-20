export type UserStatus = "pending" | "approved" | "rejected";
export type FilterStatus = "all" | "pending" | "approved" | "rejected";

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  registeredAt: string;
  status: UserStatus;
}
