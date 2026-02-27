import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./constant";

export interface Setting {
  id: string;
  createdAt: string;
  updatedAt: string;
  key: string;
  value: string;
  type: "boolean" | "number" | "string";
}

export interface UpdateSettingRequest {
  id: string;
  value: string;
}

export const useGetSettings = () =>
  useQuery({
    queryKey: ["settings"],
    queryFn: () => apiClient.get<Setting[]>("/Setting"),
  });

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSettingRequest) =>
      apiClient.put(`/Setting/${data.id}`, { value: data.value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};

export interface PriceMode {
  isManualMode: boolean;
  currentPrice: number;
  changePercent: string;
}

export const useGetPriceMode = () =>
  useQuery({
    queryKey: ["priceMode"],
    queryFn: () => apiClient.get<PriceMode>("/price/mode"),
  });

export interface UpdatePriceModeRequest {
  enabled: boolean;
}

export const useUpdatePriceMode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePriceModeRequest) =>
      apiClient.put("/price/manual-mode", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["priceMode"] });
    },
  });
};

export interface AdminStatus {
  adminStatus: boolean;
}

export const useGetAdminStatus = () =>
  useQuery({
    queryKey: ["adminStatus"],
    queryFn: () => apiClient.get<AdminStatus>("/price/admin-status"),
  });

export interface UpdateAdminStatusRequest {
  adminStatus: boolean;
}

export const useUpdateAdminStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAdminStatusRequest) =>
      apiClient.put("/price/admin-status", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminStatus"] });
    },
  });
};
