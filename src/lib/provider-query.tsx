'use client'; // Este componente precisa ser cliente por usar useState

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10 * (60 * 1000),
            gcTime: 15 * (60 * 1000),
            refetchOnWindowFocus: false,
        }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
