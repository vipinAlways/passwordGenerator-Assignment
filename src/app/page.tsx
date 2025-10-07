"use client";
import { useAuth } from "@/hooks/useGetuser";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { authenticated, isLoading } = useAuth();
  const router = useRouter();

  

  useEffect(() => {
    if (!isLoading && !authenticated) {
      router.push("/api/auth/login");
    }
  }, [authenticated, isLoading, router]);

  return <div></div>;
};

export default page;
