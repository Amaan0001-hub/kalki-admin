import { apiClient } from "@/lib/api-client";

export interface SearchAllUsersPayload {
  AuthLogin: string;
  Fname: string;
  Active: string;
  Mobile: string;
  Email: string;
  Kid: string;
  Walletid: string;
  FromDate: string;
  ToDate: string;
}

export const adminUsersService = {
  search: (payload: SearchAllUsersPayload) =>
    apiClient.post<unknown, SearchAllUsersPayload>("/admin/users/search", payload),
};
