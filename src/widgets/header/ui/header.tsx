"use client";

import { useQuery } from "@tanstack/react-query";
import { ButtonReload } from "@/shared/ui/button-reload";
import { Logo } from "./logo";
import { ErrorClient } from "./error-client";
import { matchesApi } from "@/features/matches";
import { Container } from "@/shared";

export function Header() {
  const { error } = useQuery(matchesApi.getMatches());
  return (
    <div className="flex-between h-32">
      <Container>
        <Logo />
        {error && (
          <div className="flex-center gap-x-8 h-12">
            <ErrorClient error="Ошибка: не удалось загрузить информацию" />
            <ButtonReload />
          </div>
        )}
      </Container>
    </div>
  );
}
