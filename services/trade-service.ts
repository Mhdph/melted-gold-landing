import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BaseResponse, BasePaginationResponse } from "@/lib/response.interface";

const apiClient = new ApiClient("https://yellowgold.liara.run");

export interface TransactionData {
  id: string;
  weight: number;
  type: "buy" | "sell";
  livePrice: number;
  createdAt: string;
  status: string;
  description?: string;
}

export interface CreateTransactionRequest {
  weight: number;
  type: "buy" | "sell";
  livePrice: number;
  description?: string;
}

export interface CreateTransactionResponse {
  weight: number;
  type: "buy" | "sell";
  livePrice: number;
}

export const useGetTransactions = (page: number = 1, limit: number = 10) =>
  useQuery({
    queryKey: ["transactions", page, limit],
    queryFn: () =>
      apiClient.get<BasePaginationResponse<TransactionData[]>>(
        `/Transaction?filter={}&search={}&page=${page}&limit=${limit}`
      ),
  });

export const useCreateTransaction = () =>
  useMutation({
    mutationFn: (data: CreateTransactionRequest) =>
      apiClient.post<BaseResponse<CreateTransactionResponse>>(
        "/Transaction",
        data
      ),
  });
