"use server";
import { getProjectsAction } from "@/modules/projects/get-projects-action";
import Container from "@/components/container";
import { projectsApi } from "@/modules/projects/api";
import { styleGuidesApi } from "@/modules/styleguides/api";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/get-query-clients";
import { getStyleGuidesAction } from "@/modules/styleguides/get-style-guides-action";
import { ProjectsList } from "@/modules/projects/ui/projects-list";

import { ProjectsPageInfo } from "@/modules/projects/ui/projects-page-info";

export default async function HomePage() {
  const queryClient = getQueryClient();

  if (!queryClient.getQueryData([projectsApi.baseKey])) {
    await queryClient.prefetchQuery({
      queryKey: [projectsApi.baseKey],
      queryFn: getProjectsAction,
    });
  }

  if (!queryClient.getQueryData([styleGuidesApi.baseKey])) {
    await queryClient.prefetchQuery({
      queryKey: [styleGuidesApi.baseKey],
      queryFn: getStyleGuidesAction,
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="min-h-screen w-full bg-transparent relative overflow-x-hidden">
      {/* sphere */}
      {/* <div
        className="radial-ellipse-dashboard-black w-full aspect-square
        fixed right-0 -top-[20%] sm:-top-1/4 md:-top-1/4 lg:-top-[40%]
        xl:-top-[60%] "
      /> */}
			<div
        className="radial-ellipse-dashboard w-full aspect-square
				absolute left-0 -top-[10%] md:-top-1/3 lg:-bottom-1/3 -z-50
			  xl:top-[10%] "
      ></div>
      <Container>
        <HydrationBoundary state={dehydratedState}>
          <div className="w-full pt-40 md:pt-44 lg:pt-52 2xl:pt-96">
							<ProjectsPageInfo />
            <div
              className="w-full relative flex flex-col justify-center
							gap-y-6 md:gap-y-16 xl:gap-y-20 pb-20"
            >
              <ProjectsList />
            </div>
          </div>
        </HydrationBoundary>
      </Container>
    </main>
  );
}
