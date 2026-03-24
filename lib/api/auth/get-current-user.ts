import { cache } from "react";
import { serverApiFetch } from "@/lib/api/fetch/server-api-fetch";
import type { AuthenticatedUser } from "@/lib/types/auth";

export const getCurrentUser = cache(async () => {
    return await serverApiFetch<AuthenticatedUser>("/auth/me");
});