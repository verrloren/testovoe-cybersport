import { create } from 'zustand';

interface ProcessingProjectsState {
  processingProjects: number[];
  addProcessingProject: (projectId: number) => void;
  removeProcessingProject: (projectId: number) => void;
}

export const useProcessingProjectsStore = create<ProcessingProjectsState>((set) => ({
  processingProjects: [],
  addProcessingProject: (projectId) =>
    set((state) => ({
      processingProjects: [...new Set([...state.processingProjects, projectId])]
    })),
  removeProcessingProject: (projectId) =>
    set((state) => ({
      processingProjects: state.processingProjects.filter(id => id !== projectId)
    }))
}));
