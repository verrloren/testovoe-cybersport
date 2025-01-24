import Container from "@/components/container";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/get-query-clients";
import { getStyleGuidesAction } from "@/modules/styleguides/get-style-guides-action";
import { StyleGuidesList } from "@/modules/styleguides/ui/style-guides-list";
import { styleGuidesApi } from "@/modules/styleguides/api";
import { StyleguidesPageInfo } from "@/modules/projects/ui/styleguides-page-info";
import SpherePurple from "@/components/sphere-purple";




export default async function StyleGuidesPage() {
  const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
      queryKey: [styleGuidesApi.baseKey],
      queryFn: getStyleGuidesAction,
			staleTime: 1000 * 60 * 5, // 5 minutes
    });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="min-h-screen w-full bg-transparent relative overflow-x-hidden">
			<SpherePurple />
      <Container>
        <HydrationBoundary state={dehydratedState}>
          <div className="w-full pt-40 md:pt-44 lg:pt-52 2xl:pt-72">
							<StyleguidesPageInfo />
            <div
						className="w-full relative flex flex-col justify-center
							gap-y-6 md:gap-y-16 xl:gap-y-20 pb-20"
            >
							<StyleGuidesList />
            </div>
          </div>
        </HydrationBoundary>
      </Container>
    </main>
  );
}
