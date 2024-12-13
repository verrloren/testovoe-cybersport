/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { getStyleGuides } from "@/modules/projects/getStyleGuides";
// import { Project } from "@/lib/types";
import { ProjectsTable } from "@/modules/projects/components/projects-table";
import { getProjectsAction } from "@/modules/projects/get-projects-action";
import { ActionButtons } from "@/modules/projects/components/action-buttons";
import Container from "@/components/container";
import { ProjectsCombobox } from "@/modules/projects/components/projects-combobox";
import { projectsApi, styleGuidesApi } from "@/modules/projects/api";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/get-query-clients";
import { getStyleGuidesAction } from "@/modules/projects/get-style-guides-action";

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [projectsApi.baseKey],
    queryFn: getProjectsAction,
  });
  await queryClient.prefetchQuery({
    queryKey: [styleGuidesApi.baseKey],
    queryFn: getStyleGuidesAction,
  });

  return (
    <main className="min-h-screen w-full bg-transparent relative">
      {/* sphere */}
      <div
        className="radial-ellipse-dashboard w-full aspect-square
        fixed right-0 -top-[20%] sm:-top-1/4 md:-top-1/4 lg:-top-[40%]
        xl:-top-[60%] "
      />
      <Container>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div
            className="w-full relative pt-44 md:pt-52 lg:pt-60 2xl:pt-72 flex flex-col justify-center 
						gap-y-6 md:gap-y-16 xl:gap-y-20"
         	>
            <div className="w-full flex flex-col md:flex-row gap-y-16 items-center justify-center md:justify-between">
              <ProjectsCombobox />
              <ActionButtons />
            </div>

            <div className="h-full w-full">
              <ProjectsTable />
            </div>
						
          </div>
        </HydrationBoundary>
      </Container>
    </main>
  );
}
