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

export const useOneGetUser = (id: string) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => apiClient.get<BasePaginationResponse<any[]>>(`/users/${id}`),
  });

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
