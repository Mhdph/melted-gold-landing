import ApiClient from "@/lib/apiClient";
import { BaseResponse, BasePaginationResponse } from "@/lib/response.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "./constant";

// Transfer status enum
export enum TransferStatus {
  inProgress = "inProgress",
  reject = "reject",
  success = "success",
}

// Types for remittance/transfer data
export interface Transfer {
  id: string;
  value: number;
  valueType: "gold" | "mony";
  createdAt: string;
  receiver: string;
  status: TransferStatus;
}

export interface CreateTransferRequest {
  value: number;
  valueType: "gold" | "mony";
  receiver: string;
}

export interface TransferFilters {
  status?: string;
  type?: string;
  createdAt?: {
    gte?: string;
    lte?: string;
  };
  page?: number;
  limit?: number;
}

// Create Transfer
export const useCreateTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransferRequest) =>
      apiClient.post<BaseResponse<Transfer>>("/transfer", data),
    onError: () => {
      toast.error("خطا در ثبت حواله");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-transfers"] });
      toast.success("حواله با موفقیت ثبت شد");
    },
  });
};

// Get Transfers for Admin Panel (with pagination)
export const useGetTransfers = (
  page: number = 1,
  limit: number = 10,
  filter: string = "{}",
) => {
  const url = `/transfer?filter=${filter}&search={}&page=${page}&limit=${limit}`;

  return useQuery({
    queryKey: ["transfers", filter, page, limit],
    queryFn: () => apiClient.get<BasePaginationResponse<Transfer[]>>(url),
  });
};

// Get User Transfers (with pagination)
export const useGetUserTransfers = (
  page: number = 1,
  limit: number = 10,
  filter: string = "{}",
) => {
  const url = `/transfer?filter=${filter}&search={}&page=${page}&limit=${limit}`;

  return useQuery({
    queryKey: ["user-transfers", filter],
    queryFn: () => apiClient.get<BasePaginationResponse<Transfer[]>>(url),
  });
};

// Get Single Transfer
export const useGetTransfer = (id: string) => {
  return useQuery({
    queryKey: ["transfer", id],
    queryFn: () => apiClient.get<BaseResponse<Transfer>>(`/transfer/${id}`),
    enabled: !!id,
  });
};

// Update Transfer Status (Admin only)
export const useUpdateTransferStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TransferStatus }) =>
      apiClient.put<BaseResponse<Transfer>>(`/transfer/${id}`, {
        status,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transfers"] });
      queryClient.invalidateQueries({ queryKey: ["user-transfers"] });
    },
  });
};

// Get Transfer Statistics
export const useGetTransferStats = () => {
  return useQuery({
    queryKey: ["transfer-stats"],
    queryFn: () =>
      apiClient.get<
        BaseResponse<{
          totalTransfers: number;
          pendingTransfers: number;
          completedTransfers: number;
          totalAmount: number;
          totalFees: number;
        }>
      >("/transfer/stats"),
  });
};
