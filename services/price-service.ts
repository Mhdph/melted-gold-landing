import ApiClient from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { BaseResponse, BasePaginationResponse } from "@/lib/response.interface";

import { API_URL } from "./constant";

const apiClient = new ApiClient(`${API_URL}`);
export interface PriceData {
  createdAt: string;
  buy: number;
  sell: number;
  percentageChange: string;
}

export const useGetPrices = (page: number = 1, limit: number = 10) =>
  useQuery({
    queryKey: ["prices", page, limit],
    queryFn: () =>
      apiClient.get<BasePaginationResponse<PriceData[]>>(
        `/price?filter={}&search={}&page=${page}&limit=${limit}`,
      ),
  });
