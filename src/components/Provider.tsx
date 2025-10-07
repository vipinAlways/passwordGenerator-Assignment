"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";

function Provider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 200);
  }, [mounted]);
  if (mounted) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }
}

export default Provider;
