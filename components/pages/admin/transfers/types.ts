export interface Transfer {
  id: string;
  createdAt: string;
  updatedAt: string;
  receiver: string;
  value: string;
  valueType: "gold" | "mony";
}

export interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  hasNextPage: boolean;
}

export interface TransferFilters {
  status?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export type FilterStatus = "all" | "gold" | "mony";
