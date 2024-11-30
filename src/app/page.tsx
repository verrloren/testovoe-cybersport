import { getProjects } from "@/action/getProjects";
import { getStyleGuides } from "@/action/getStyleGuides";
import { ActionButtons } from "@/components/action-buttons";
import Container from "@/components/container";
import { ProjectsTable } from "@/components/projects-table";
import { ProjectsCombobox } from "@/components/ui/projects-combobox";
// import { projects } from "@/lib/data";
// import { redirect } from "next/navigation";

export default async function HomePage() {

	const projectsResponse = await getProjects();
	const styleGuides = await getStyleGuides();

	console.log(projectsResponse);
	console.log(styleGuides);

	
	if (!projectsResponse) {
		return <div>Failed to load projects</div>;
	}


  const transformedProjects = projectsResponse.success 
    ? projectsResponse.response.map((project) => ({
        id: project.id,
        label: project.name,
        status: project.project_status || 'default',
        code: project.code,
        logs: [{
          id: '1',
          header: 'Project Files',
          code: project.code,
          status: project.project_status || 'default'
        }],
        codeReview: 'Code review will be available soon.',
        recommendations: 'Recommendations will be available soon.'
      }))
    : [];


  return (
		<>
		<main className="min-h-screen w-full relative">

			{/* sphere */}
			<div className="radial-ellipse-dashboard w-full aspect-square
			fixed right-0 -top-[20%] sm:-top-1/4 md:-top-1/4 lg:-top-[40%]
			  xl:-top-[60%] "></div>

			<Container>
				
			<div className="w-full relative pt-44 2xl:pt-72 flex flex-col justify-center 
			gap-y-6 md:gap-y-16 xl:gap-y-20">
			
				<div className="w-full flex flex-col md:flex-row gap-y-16 items-center justify-center md:justify-between">
					<ProjectsCombobox projects={transformedProjects} />
					<ActionButtons styleGuides={styleGuides} />
				</div>

				 <div className="h-full w-full">
						{transformedProjects.length > 0 && (
							<ProjectsTable projects={transformedProjects} />
						)}
				</div> 


			</div>

			</Container>
    </main>
		</>
  );
}


