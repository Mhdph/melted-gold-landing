export type RemittanceUnit = "گرم طلا" | "ریال";
export type RemittanceStatus = "تکمیل شده" | "در انتظار" | "لغو شده" | "ناموفق";
export type SortBy = "date" | "amount";
export type FilterUnit = "all" | "گرم طلا" | "ریال";

export interface Remittance {
  id: string;
  date: string;
  value: number;
  valueType: string;
  receiver: string;
}

// API Response types
export interface Transfer {
  id: string;
  date: string;
  value: number;
  valueType: "gold" | "mony";
  receiver: string;
}

export interface CreateTransferRequest {
  value: number;
  valueType: "gold" | "mony";
  receiver: string;
}

export interface TransferFilters {
  status?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}
