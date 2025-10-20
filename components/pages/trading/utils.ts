import { Trade } from "./types";

export const sampleTrades: Trade[] = [
  {
    id: "1",
    date: "1403/10/15 - 14:30",
    type: "خرید",
    amount: 10,
    pricePerGram: 2500000,
    totalValue: 25000000,
    status: "تکمیل شده",
  },
  {
    id: "2",
    date: "1403/10/13 - 16:45",
    type: "فروش",
    amount: 5,
    pricePerGram: 2450000,
    totalValue: 12250000,
    status: "تکمیل شده",
  },
];
