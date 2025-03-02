'use server';
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { Container, getQueryClient, PageContainer } from "@/shared";
import { TableComponent } from "@/widgets/header/ui/table-component";
import { matchesApi } from "@/features/matches/api/api";
import { useGetMatches } from "@/features/matches/actions/use-get-matches";

export default async function HomePage() {
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: [matchesApi.baseKey],
    queryFn: useGetMatches,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <PageContainer>
      <Container>
        <div className="w-full">
            <HydrationBoundary state={dehydratedState}>
              <div className="flex-center-col w-full gap-y-4 pb-10">
								<TableComponent />
							</div>
            </HydrationBoundary>
        </div>
      </Container>
    </PageContainer>
  );
}
