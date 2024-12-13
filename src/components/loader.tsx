"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Spin } from "antd";

export function SuspenseLoader({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div className="fixed inset-0 bg-black flex justify-center items-center">
              <div className="text-white font-bold text-7xl">
                There was an error: <pre>{error.message}</pre>
                <button
                  onClick={() => {
                    resetErrorBoundary();
                    reset();
                  }}
                >
                  Try again
                </button>
              </div>
            </div>
          )}
        >
          <Suspense
            fallback={
              <div className="fixed inset-0 bg-black flex justify-center items-center">
     						<Spin fullscreen />
              </div>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}