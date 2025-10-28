import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseResponse, BasePaginationResponse } from "@/lib/response.interface";

const apiClient = new ApiClient("https://yellowgold.liara.run");

export type TransactionType = "buy" | "sell";
export type TransactionStatus = "pending" | "approved" | "rejected";
export type UserStatus = "pending" | "approved" | "rejected";
export type FilterStatus = "all" | "pending" | "approved" | "rejected";

export interface User {
  id: string;
  mobile: string;
  phone: string;
  verify: boolean;
}

export interface Transaction {
  id: string;
  User: User;
  type: TransactionType;
  amount: number;
  accept: boolean;
  status?: string; // Add status field for backend compatibility
  createdAt: string;
  weight: number;
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
      apiClient.get<BasePaginationResponse<Transaction[]>>(
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

export const useGetUserTransactions = () =>
  useQuery({
    queryKey: ["user-transactions"],
    queryFn: () =>
      apiClient.get<BasePaginationResponse<Transaction[]>>(`/Transaction/user`),
  });

export const useApproveTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log("Approving transaction with ID:", id);
      const response = await apiClient.put(`/Transaction/${id}`, {
        status: "success",
      });
      console.log("Approve response:", response);
      return response;
    },
    onSuccess: (data, variables) => {
      console.log("Transaction approved successfully:", variables);
      // Invalidate all transaction-related queries
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user-transactions"] });
    },
    onError: (error, variables) => {
      console.error("Error approving transaction:", error, variables);
    },
  });
};

export const useRejectTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log("Rejecting transaction with ID:", id);
      const response = await apiClient.put(`/Transaction/${id}`, {
        status: "reject",
      });
      console.log("Reject response:", response);
      return response;
    },
    onSuccess: (data, variables) => {
      console.log("Transaction rejected successfully:", variables);
      // Invalidate all transaction-related queries
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user-transactions"] });
    },
    onError: (error, variables) => {
      console.error("Error rejecting transaction:", error, variables);
    },
  });
};
