import { useQuery } from '@tanstack/react-query';
import { projectsApi } from './api';
import { useProcessingProjectsStore } from "./processing-projects-store";

export const useProjectStatus = (projectId: number) => {
  const removeProcessingProject = useProcessingProjectsStore(state => state.removeProcessingProject);

  return useQuery({
    queryKey: ['project-status', projectId],
    queryFn: () => projectsApi.checkProjectStatus(projectId),
    enabled: !!projectId,
    refetchInterval: 5000, // Poll every 5 seconds
    refetchIntervalInBackground: true,
    retry: true,
    retryDelay: 5000,
    staleTime: 0,
    select: (data) => {
      if (data.status === 'success' || data.status === 'error') {
        removeProcessingProject(projectId);
      }
      return data;
    }
  });
};