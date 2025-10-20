export type TransactionType = "buy" | "sell";
export type TransactionStatus = "pending" | "approved" | "rejected";
export type FilterStatus = "all" | "pending" | "approved" | "rejected";

export interface Transaction {
  id: string;
  userName: string;
  userPhone: string;
  type: TransactionType;
  weight: number;
  price: number;
  totalAmount: number;
  date: string;
  status: TransactionStatus;
  paymentMethod: string;
}
