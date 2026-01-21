'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, FC, PropsWithChildren, memo } from 'react';

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default memo(QueryProvider);
