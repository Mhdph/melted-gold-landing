import { BasePaginationResponse, BaseResponse } from "@/lib/response.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "./constant";

export const useGetUsers = (page: number = 1, limit: number = 10) =>
  useQuery({
    queryKey: ["users", page, limit],
    queryFn: () =>
      apiClient.get<BasePaginationResponse<any[]>>(
        `/user?filter={}&search={}&page=${page}&limit=${limit}`,
      ),
  });

export interface UserProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  mobile: string;
  name: string;
  lastName: string;
  verify: boolean;
  role: string[];
  type: string;
  isDeleted: boolean;
  isProfileComplete: boolean;
}

export const useOneMyUserInfo = () =>
  useQuery({
    queryKey: ["user", "me"],
    queryFn: () => apiClient.get<UserProfile>(`/user/me/profile`),
  });

export interface UpdateProfileRequest {
  name: string;
  lastName: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      apiClient.put<BaseResponse<UserProfile>>(`/user/me/profile`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      toast.success("پروفایل با موفقیت به‌روزرسانی شد");
    },
    onError: (error: any) => {
      toast.error("خطا در به‌روزرسانی پروفایل", {
        description: error?.response?.data?.message || "لطفاً دوباره تلاش کنید",
      });
    },
  });
};

export interface PriceNotification {
  enabled: boolean;
}

export const useGetPriceNotification = () =>
  useQuery({
    queryKey: ["priceNotification"],
    queryFn: () => apiClient.get<PriceNotification>(`/user/me/price-notification`),
  });

export interface UpdatePriceNotificationRequest {
  enabled: boolean;
}

export const useUpdatePriceNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePriceNotificationRequest) =>
      apiClient.put<BaseResponse<PriceNotification>>(
        `/user/me/price-notification`,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["priceNotification"] });
      toast.success("تنظیمات نوتیفیکیشن قیمت به‌روزرسانی شد");
    },
    onError: (error: any) => {
      toast.error("خطا در به‌روزرسانی نوتیفیکیشن", {
        description: error?.response?.data?.message || "لطفاً دوباره تلاش کنید",
      });
    },
  });
}; 

export const useApproveUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      apiClient.put<BaseResponse<any>>(`/user/${id}`, { verify: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useChangeUserStatus = () => {
  return useMutation({
    mutationFn: ({ status }: { status: boolean }) =>
      apiClient.put<BaseResponse<any>>(`/setting/user`, { status }),
  });
};

interface ChangeRolePayload {
  type: string;
}

export const useChangeUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, type }: { userId: string; type: string }) =>
      apiClient.put(`/user/${userId}`, { type } as ChangeRolePayload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("نقش کاربر با موفقیت تغییر یافت");
    },

    onError: (error: any) => {
      toast.error("خطا در تغییر نقش کاربر", {
        description: error?.response?.data?.message || "لطفاً دوباره تلاش کنید",
      });
    },
  });
};
