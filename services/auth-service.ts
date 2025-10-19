import ApiClient from "@/lib/apiClient";
import { BaseResponse } from "@/lib/response.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const apiClient = new ApiClient("https://yellowgold.liara.run/auth");

export const useGetLoginCode = (slug: string, enabled: boolean) =>
  useQuery({
    queryKey: ["auth", slug],
    queryFn: () => apiClient.get<any>(`/code/${slug}`),
    enabled,
  });

interface LoginParams {
  mobile: string;
  otpCode: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (params: LoginParams) =>
      apiClient.post<BaseResponse<any>>(`/login`, params),

    onError: () => {
      toast.error("Failed to login");
    },
  });
};
