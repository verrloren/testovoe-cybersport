"use client"
import { Hydrate, type DehydratedState } from "react-query"
type HydrationBoundaryProps = {
  children: React.ReactNode
  state: DehydratedState
}
export function HydrationBoundary({
  children,
  state
}: HydrationBoundaryProps) {
  return <Hydrate state={state}>{children}</Hydrate>
}