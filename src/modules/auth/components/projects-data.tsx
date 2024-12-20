import { ProjectsTable } from "@/modules/projects/components/projects-table";
import { getProjectsAction } from "@/modules/projects/get-projects-action";
import { getStyleGuidesAction } from "@/modules/projects/get-style-guides-action";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/get-query-clients";
import { projectsApi, styleGuidesApi } from "@/modules/projects/api";
import { ProjectsCombobox } from "@/modules/projects/components/projects-combobox";
import { ActionButtons } from "@/modules/projects/components/action-buttons";

// Separate async component for data fetching
export async function ProjectsData() {
  try {
    const queryClient = getQueryClient();
    
    // Prefetch data
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: [projectsApi.baseKey],
        queryFn: async () => {
          const data = await getProjectsAction();
          return data;
        },
      }),
      queryClient.prefetchQuery({
        queryKey: [styleGuidesApi.baseKey],
        queryFn: async () => {
          const data = await getStyleGuidesAction();
          return data;
        },
      }),
    ]);

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="w-full relative pt-44 md:pt-52 lg:pt-60 2xl:pt-72 flex flex-col justify-center gap-y-6 md:gap-y-16 xl:gap-y-20">
          <div className="w-full flex flex-col md:flex-row gap-y-16 items-center justify-center md:justify-between">
            <ProjectsCombobox />
            <ActionButtons />
          </div>
          <div className="h-full w-full">
            <ProjectsTable />
          </div>
        </div>
      </HydrationBoundary>
    );
  } catch (error) {
    console.error('Error loading data:', error);
    return <div>Error loading data</div>;
  }
}
