import { BasePaginationResponse, BaseResponse } from "@/lib/response.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./constant";
import { User } from "@/components/pages/admin/users/types";

export type TransactionType = "buy" | "sell";
export type TransactionStatus = "pending" | "approved" | "rejected";
export type UserStatus = "pending" | "approved" | "rejected";
export type FilterStatus = "all" | "pending" | "approved" | "rejected";

export interface Transaction {
  id: string;
  user: User;
  type: TransactionType;
  amount: number;
  accept: boolean;
  status: TransactionStatus; // Add status field for backend compatibility
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

export const useGetTransactions = (
  page: number = 1,
  limit: number = 10,
  filter: string = "{}",
) =>
  useQuery({
    queryKey: ["transactions", page, limit, filter],
    queryFn: () =>
      apiClient.get<BasePaginationResponse<Transaction[]>>(
        `/Transaction?filter=${filter}&search={}&page=${page}&limit=${limit}`,
      ),
  });

export const useCreateTransaction = () =>
  useMutation({
    mutationFn: (data: CreateTransactionRequest) =>
      apiClient.post<BaseResponse<CreateTransactionResponse>>(
        "/Transaction",
        data,
      ),
  });

interface TransactionFilters {
  page?: number;
  limit?: number;
  createdAt?: {
    gte?: string;
    lte?: string;
  };
}

export const useGetUserTransactions = (filters: TransactionFilters = {}) => {
  const queryParams = new URLSearchParams();

  if (filters.page) queryParams.append("page", filters.page.toString());
  if (filters.limit) queryParams.append("limit", filters.limit.toString());

  if (filters.createdAt) {
    queryParams.append(
      "filter",
      JSON.stringify({
        createdAt: {
          gte: filters.createdAt.gte,
          lte: filters.createdAt.lte,
        },
      }),
    );
  }

  const url = queryParams.toString()
    ? `/Transaction/user?${queryParams.toString()}`
    : `/Transaction/user`;

  return useQuery({
    queryKey: ["user-transactions", filters],
    queryFn: () => apiClient.get<BasePaginationResponse<Transaction[]>>(url),
  });
};

export const useApproveTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.put(`/Transaction/${id}`, {
        status: "success",
      });
      return response;
    },
    onSuccess: (data, variables) => {
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
      const response = await apiClient.put(`/Transaction/${id}`, {
        status: "reject",
      });
      return response;
    },
    onSuccess: (data, variables) => {
      // Invalidate all transaction-related queries
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user-transactions"] });
    },
    onError: (error, variables) => {
      console.error("Error rejecting transaction:", error, variables);
    },
  });
};
