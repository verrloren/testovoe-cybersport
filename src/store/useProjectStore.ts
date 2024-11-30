// store/useProjectStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '@/lib/types';

interface ProjectState {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  updateProjectName: (id: number, newName: string) => void;
  clearSelectedProject: () => void; 
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      selectedProject: null,
      setSelectedProject: (project) => set({ selectedProject: project }),
      updateProjectName: (id, newName) => 
        set((state) => {
          if (state.selectedProject?.id === id) {
            return {
              selectedProject: {
                ...state.selectedProject,
                name: newName
              }
            };
          }
          return state;
        }),
      clearSelectedProject: () => set({ selectedProject: null }), 
    }),
    {
      name: 'project-storage',
    }
  )
);