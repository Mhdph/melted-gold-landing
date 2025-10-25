import ApiClient from "@/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BaseResponse, BasePaginationResponse } from "@/lib/response.interface";

const apiClient = new ApiClient("https://yellowgold.liara.run");

export const useGetUsers = (page: number = 1, limit: number = 10) =>
  useQuery({
    queryKey: ["users", page, limit],
    queryFn: () =>
      apiClient.get<BasePaginationResponse<any[]>>(
        `/user?filter={}&search={}&page=${page}&limit=${limit}`
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
