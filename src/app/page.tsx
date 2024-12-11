/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getProjects } from "@/modules/projects/getProjects";
// import { getStyleGuides } from "@/modules/projects/getStyleGuides";
// import { ActionButtons } from "@/modules/projects/components/action-buttons";
import Container from "@/components/container";
// import { ProjectsTable } from "@/modules/projects/components/projects-table";
import { ProjectsCombobox } from "@/modules/projects/components/projects-combobox";
// import { Project } from "@/lib/types";
import { dehydrate, QueryClient } from "react-query";
import { HydrationBoundary } from "@/components/hydration-boundary";
import { projectsApi } from "@/modules/projects/api";


export default async function HomePage() {
  // const projectsResponse = await getProjects();
  // const styleGuidesResponse = await getStyleGuides();
  // const styleGuides = styleGuidesResponse?.response;


  // console.log(projectsResponse);
  // console.log(styleGuides);

  // if (!projectsResponse?.success) {
  //   return <div>Failed to load projects</div>;
  // }

  // const transformedProjects: Project[] = projectsResponse.response.map(
  //   (project: Project) => ({
  //     id: project.id,
  //     name: project.name,
  //     project_status: project.project_status || "warning",
  //     last_edit_date: project.last_edit_date,
  //     code_reviews: project.code_reviews || [],
  //   })
  // );

	const queryClient = new QueryClient()
  
	await queryClient.prefetchQuery({
		queryKey: [projectsApi.baseKey],
		queryFn: getProjects,
	})


  return (
      <main className="min-h-screen w-full relative">
        {/* sphere */}
        <div
          className="radial-ellipse-dashboard w-full aspect-square
			fixed right-0 -top-[20%] sm:-top-1/4 md:-top-1/4 lg:-top-[40%]
			  xl:-top-[60%] "
        ></div>

        <Container>
          <div
            className="w-full relative pt-44 md:pt-52 lg:pt-60 2xl:pt-72 flex flex-col justify-center 
			gap-y-6 md:gap-y-16 xl:gap-y-20"
          >
            <div className="w-full flex flex-col md:flex-row gap-y-16 items-center justify-center md:justify-between">
              <HydrationBoundary state={dehydrate(queryClient)} >
								<ProjectsCombobox />
							</HydrationBoundary>
              {/* <ProjectsCombobox projects={transformedProjects} /> */}
              {/* <ActionButtons styleGuides={styleGuides} /> */}
            </div>

            <div className="h-full w-full">
              {/* <ProjectsTable /> */}
            </div>
          </div>
        </Container>
      </main>
  );
}
