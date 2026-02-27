import { BasePaginationResponse, BaseResponse } from "@/lib/response.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { IProducts } from "@/components/pages/admin/products/type";
import { apiClient } from "./constant";

export interface TransferFilters {
  status?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export const useGetProducts = (filters: TransferFilters = {}) => {
  const queryParams = new URLSearchParams();

  if (filters.status) queryParams.append("status", filters.status);
  if (filters.type) queryParams.append("type", filters.type);
  if (filters.dateFrom) queryParams.append("dateFrom", filters.dateFrom);
  if (filters.dateTo) queryParams.append("dateTo", filters.dateTo);
  if (filters.page) queryParams.append("page", filters.page.toString());
  if (filters.limit) queryParams.append("limit", filters.limit.toString());

  const queryString = queryParams.toString();
  const url = queryString ? `/product?${queryString}` : "/product";

  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => apiClient.get<BasePaginationResponse<any[]>>(url),
  });
};

interface CreateTransferRequest {
  name: string;
  sellAmountPartnerShip: number;
  sellAmountGeneral: number;
  buyAmountPartnerShip: number;
  buyAmountGeneral: number;
  isDealActive: boolean;
}

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransferRequest) =>
      apiClient.post<BaseResponse<IProducts>>("/product", data),
    onError: () => {
      toast.error("خطا در ثبت محصول");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("محصول با موفقیت اضافه شد");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CreateTransferRequest }) =>
      apiClient.put<BaseResponse<IProducts>>(`/product/${id}`, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
