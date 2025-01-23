import { getProjectsAction } from "@/modules/projects/get-projects-action";
import Container from "@/components/container";
import { projectsApi } from "@/modules/projects/api";
import { styleGuidesApi } from "@/modules/styleguides/api";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/get-query-clients";
import { getStyleGuidesAction } from "@/modules/styleguides/get-style-guides-action";
import SpherePurple from "@/components/sphere-purple";
import ProjectsPageInfo from "@/modules/projects/ui/projects-page-info";
import ProjectsList from "@/modules/projects/ui/projects-list";


export default async function HomePage() {
  const queryClient = getQueryClient();

	Promise.all([
		queryClient.prefetchQuery({
			queryKey: [projectsApi.baseKey],
			queryFn: getProjectsAction,
		}),
		queryClient.prefetchQuery({
			queryKey: [styleGuidesApi.baseKey],
			queryFn: getStyleGuidesAction,
		}),
	]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="min-h-screen w-full bg-transparent relative overflow-x-hidden">
      <SpherePurple />

      <Container>
          <div className="w-full pt-40 md:pt-44 lg:pt-52 2xl:pt-72">
            <ProjectsPageInfo />
            <div
              className="w-full relative flex flex-col justify-center
							gap-y-6 md:gap-y-16 xl:gap-y-20 pb-20"
            >
							<HydrationBoundary state={dehydratedState}>
              	<ProjectsList />
     			  	</HydrationBoundary>
            </div>
          </div>
      </Container>
    </main>
  );
}
