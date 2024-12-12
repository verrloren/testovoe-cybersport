import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '@/lib/types';

interface ProjectsStoreState {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  updateProjectName: (id: number, newName: string) => void;
  clearSelectedProject: () => void;
	isPopoverOpen: boolean;
	setIsPopoverOpen: (isOpen: boolean) => void;
}

export const useProjectsStore = create<ProjectsStoreState>()(
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

			isPopoverOpen: false,
			setIsPopoverOpen: (isOpen) => set({ isPopoverOpen: isOpen }),
    }),
    {
      name: 'project-storage',
    }
  )
);