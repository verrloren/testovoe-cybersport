'use client'

import { RefreshCcw } from "lucide-react";
import { Button } from "./button";
import { useQueryClient } from "@tanstack/react-query";
import { matchesApi } from "@/features/matches";

export function ButtonReload() {
  const queryClient = useQueryClient();

  const handleReload = () => {
    queryClient.invalidateQueries({
			queryKey: matchesApi.baseKey
		});
  };

  return (
    <Button onClick={handleReload} className="h-full" variant="pink">
      <RefreshCcw /> Обновить
    </Button>
  );
}