import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "./api";
import { ProjectDto } from "@/shared/model/types";
import { useProjectsStore } from "./projects-store";
import { deleteProjectAction } from "./delete-project-action";
import toast from "react-hot-toast";

export const useDeleteProjectMutation = () => {

	const queryClient = useQueryClient();
	const clearSelectedProject = useProjectsStore(state => state.clearSelectedProject);

	const deleteProjectMutation = useMutation({
		mutationFn: (id: number) => deleteProjectAction(id),
		onMutate: async projectId => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({
				queryKey: [projectsApi.baseKey],
			});
			 // Snapshot the previous value
			const previousProjects = queryClient.getQueryData<ProjectDto[]>([projectsApi.baseKey]);
			// Optimistically update to the new value
			if(previousProjects){
				queryClient.setQueryData<ProjectDto[]>([projectsApi.baseKey], 
					old => old ? old.filter(project => project.id !== projectId) : []
				)
				clearSelectedProject(previousProjects[0]);
				toast.success("Project deleted successfully");
			}

			return { previousProjects, projectId };
		},
    onError: (error, projectId, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(
          [projectsApi.baseKey],
          context.previousProjects
        );
      }
    },

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [projectsApi.baseKey] })
		}
	});

	const deleteProject = async (id: number) => {
		const result = await deleteProjectMutation.mutateAsync(id);
		if (!result?.success) {
      throw new Error(result?.response || 'Failed to delete project');
    }
    return result;
	};

	return { deleteProject, error: deleteProjectMutation.error };
}