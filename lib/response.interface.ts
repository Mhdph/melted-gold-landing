/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sort } from "./sort.type";

export interface BaseResponse<T extends any> {
  success: boolean;
  message: string;
  data: T;
}

export interface BasePaginationResponse<T> {
  success: boolean;
  message: string;
  data: {
    results: T;
    total: number;
    sort: Sort;
  };
}
