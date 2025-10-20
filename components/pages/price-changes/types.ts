export interface PriceData {
  createdAt: string;
  buy: number;
  sell: number;
  percentageChange: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  hasNextPage: boolean;
}

export type TimeRange = "today" | "7days" | "30days";
