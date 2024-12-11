import { jsonApiInstance } from "@/shared/projects/api-instance";
import { UseQueryOptions } from "react-query";

export type UserDto = {
	id: number; 
	login: string; 
	password: string 
};

export const authApi = {
  baseKey: "users",
  getUserById: (id: number): UseQueryOptions<UserDto> => {
    return {
      queryKey: [authApi.baseKey, "byId", id],
      queryFn: (meta) =>
        jsonApiInstance<UserDto>(`/users/${id}`, {
          signal: meta.signal,
          json: null,
        }),
    };
  },
  loginUser: ({ login, password }: { login: string; password: string }) =>
    jsonApiInstance<UserDto[]>(`/users?login=${login}&password=${password}`, {
      json: null,
    }).then((r) => r[0] as UserDto | undefined),
};
