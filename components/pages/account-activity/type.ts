export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "واریز" | "برداشت" | "انتقال";
  balance: number;
};
