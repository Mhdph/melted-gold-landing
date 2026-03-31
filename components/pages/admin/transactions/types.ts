import { User } from "../users/types";

export type TransactionType = "buy" | "sell";
export type TransactionStatus = "inProgress" | "approved" | "rejected";
export type FilterStatus = "all" | "inProgress" | "approved" | "rejected";

export interface Transaction {
  id: string;
  user: User;
  type: TransactionType;
  amount: number;
  accept: boolean;
  status?: string; // Add status field for backend compatibility
  createdAt: string;
  weight: number;
}
