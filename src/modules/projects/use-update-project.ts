import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "./api";
import { ProjectDto } from "@/lib/types";
import { editProjectAction } from "./edit-project-action";
import { useProjectsStore } from "./projects-store";

export const useUpdateProject = () => {

	const queryClient = useQueryClient();
	const updateProjectName = useProjectsStore(state => state.updateProjectName);
	type UpdateProjectVariables = {
		id: number;
		name: string;
	}
	

	const updateProjectMutation = useMutation({
		mutationFn: ({ id, name }: UpdateProjectVariables) => editProjectAction(id, name),
		onMutate: async newProject => {
			 // Cancel any outgoing refetches
			await queryClient.cancelQueries({
				queryKey: [projectsApi.baseKey, newProject.id],
			});
			 // Snapshot the previous value
			const previousProject = queryClient.getQueryData<ProjectDto>([projectsApi.baseKey, newProject.id]);
			// Optimistically update to the new value
			if(previousProject){
				queryClient.setQueryData([projectsApi.baseKey, newProject.id], newProject)
			}
			updateProjectName(newProject.id, newProject.name);
			return { previousProject, newProject };
		},
		onError: (_, __, context) => {
			// Roll back to the previous value
				if (context) {
					queryClient.setQueryData(
						['todos', context.newProject.id],
						context.previousProject,
					);
				}
		},
		onSettled: (newProject) => {
			queryClient.invalidateQueries({ queryKey: [projectsApi.baseKey, newProject] })
		}
	});

	const updateProject = (id: number, name: string) => {
		updateProjectMutation.mutate({ id, name });
	};

	return { updateProject };
}