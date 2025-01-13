import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "./api";
import { ProjectDto } from "@/shared/model/types";
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
    
    onMutate: async ({ id, name }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [projectsApi.baseKey],
      });

      // Snapshot previous projects
      const previousProjects = queryClient.getQueryData<ProjectDto[]>([projectsApi.baseKey]);

      // Optimistically update projects list
      if (previousProjects) {
        const updatedProjects = previousProjects.map(project => 
          project.id === id ? { ...project, name } : project
        );
        queryClient.setQueryData([projectsApi.baseKey], updatedProjects);
      }

      // Update local state
      updateProjectName(id, name);

      return { previousProjects };
    },
		onError: (_, __, context) => {
			// Roll back to the previous value
				if (context?.previousProjects) {
					queryClient.setQueryData([projectsApi.baseKey], context.previousProjects)
				}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [projectsApi.baseKey] })
		}
	});

	const updateProject = (id: number, name: string) => {
		updateProjectMutation.mutate({ id, name });
	};

	return { updateProject };
}