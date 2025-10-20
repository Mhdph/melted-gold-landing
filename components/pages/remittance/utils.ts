import { Remittance } from "./types";

export const remittanceUnits = [
  {
    id: "1",
    date: "1403/10/15",
    amount: 50,
    unit: "گرم طلا",
    recipient: "علی احمدی",
    status: "تکمیل شده",
  },
  {
    id: "2",
    date: "1403/10/14",
    amount: 50000000,
    unit: "ریال",
    recipient: "مریم رضایی",
    status: "در انتظار",
  },
] as Remittance[];
