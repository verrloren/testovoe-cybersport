import { QueryClient } from 'react-query';
import { useMemo } from 'react';

export const useQueryClient = () => {
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5,
      },
    },
  }), []);

  return queryClient;
};
