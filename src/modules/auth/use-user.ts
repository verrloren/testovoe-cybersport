import { useQuery } from "@tanstack/react-query";
import { authApi } from "./api";
import { useUserId } from "./user-user-id";

export function useUser() {
	const userId = useUserId();
	return useQuery({
		...authApi.getUserById(userId!),
		enabled: Boolean(userId),
	})
}
