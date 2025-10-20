export type RemittanceUnit = "گرم طلا" | "ریال";
export type RemittanceStatus = "تکمیل شده" | "در انتظار";
export type SortBy = "date" | "amount";
export type FilterUnit = "all" | "گرم طلا" | "ریال";

export interface Remittance {
  id: string;
  date: string;
  amount: number;
  unit: RemittanceUnit;
  recipient: string;
  status: RemittanceStatus;
}
