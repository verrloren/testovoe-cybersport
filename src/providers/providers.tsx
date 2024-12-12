'use client'

import { QueryClientProvider } from 'react-query'
import { useState } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'

import { useQueryClient } from '@/shared/use-query-client'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(useQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}