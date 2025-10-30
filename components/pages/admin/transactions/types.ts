import { User } from "../users/types";

export type TransactionType = "buy" | "sell";
export type TransactionStatus = "pending" | "approved" | "rejected";
export type FilterStatus = "all" | "pending" | "approved" | "rejected";

export interface Transaction {
  id: string;
  User: User;
  type: TransactionType;
  amount: number;
  accept: boolean;
  status?: string; // Add status field for backend compatibility
  createdAt: string;
  weight: number;
}
