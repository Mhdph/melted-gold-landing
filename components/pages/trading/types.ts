export type TradeType = "خرید" | "فروش";
export type TradeStatus = "تکمیل شده" | "در انتظار";

export interface Trade {
  id: string;
  date: string;
  type: TradeType;
  amount: number;
  pricePerGram: number;
  totalValue: number;
  status: TradeStatus;
}
