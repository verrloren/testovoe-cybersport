'use client'

import { useProjectsStore } from "@/features/projects";

export function ProjectName({ projectName }: {projectName: string}) {

	const currentProject = useProjectsStore(state => state.selectedProject)

	return (
		<h5 className="text-white text-8xl font-semibold">{currentProject?.name ?? projectName}</h5>
	)
}
