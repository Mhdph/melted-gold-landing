export type RemittanceUnit = "گرم طلا" | "ریال";
export type RemittanceStatus = "تکمیل شده" | "در انتظار" | "لغو شده" | "ناموفق";
export type SortBy = "date" | "amount";
export type FilterUnit = "all" | "گرم طلا" | "ریال";

export interface Remittance {
  id: string;
  date: string;
  amount: number;
  unit: RemittanceUnit;
  recipient: string;
  status: RemittanceStatus;
  description?: string;
  fees?: number;
  exchangeRate?: number;
  transactionId?: string;
}

// API Response types
export interface Transfer {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  type: "remittance" | "transfer" | "withdrawal";
  fromUser: string;
  toUser?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  transactionId?: string;
  fees?: number;
  exchangeRate?: number;
}

export interface CreateTransferRequest {
  value: number;
  valueType: "gold" | "mony";
  userId: string;
  receiver: string;
  description?: string;
  fees?: number;
  exchangeRate?: number;
}

export interface TransferFilters {
  status?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}
