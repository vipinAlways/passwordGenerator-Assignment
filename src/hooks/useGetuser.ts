// hooks/useAuth.ts
"use client";

import { getCurrentUser } from "@/lib/getCurrentUser";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getCurrentUser,
  });
  

  return {
    user: data ? data.user : null,
    authenticated: data?.isAuthenticated ?? false,
    isLoading,
    isError,
  };
}
