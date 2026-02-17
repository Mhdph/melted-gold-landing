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
  dateFrom?: string;
  dateTo?: string;
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
export const useGetTransfers = (filters: TransferFilters = {}) => {
  const queryParams = new URLSearchParams();

  if (filters.status) queryParams.append("status", filters.status);
  if (filters.type) queryParams.append("type", filters.type);
  if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);
  if (filters.page) queryParams.append("page", filters.page.toString());
  if (filters.limit) queryParams.append("limit", filters.limit.toString());

  const queryString = queryParams.toString();
  const url = queryString ? `/transfer?${queryString}` : "/transfer";

  return useQuery({
    queryKey: ["transfers", filters],
    queryFn: () => apiClient.get<BasePaginationResponse<Transfer[]>>(url),
  });
};

// Get User Transfers (with pagination)
export const useGetUserTransfers = (filters: TransferFilters = {}) => {
  const queryParams = new URLSearchParams();

  if (filters.status) queryParams.append("status", filters.status);
  if (filters.type) queryParams.append("type", filters.type);
  if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);
  if (filters.page) queryParams.append("page", filters.page.toString());
  if (filters.limit) queryParams.append("limit", filters.limit.toString());

  const queryString = queryParams.toString();
  const url = queryString ? `/transfer/user?${queryString}` : "/transfer/user";

  return useQuery({
    queryKey: ["user-transfers", filters],
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
