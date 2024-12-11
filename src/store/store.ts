import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '@/lib/types';

interface StoreState {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  updateProjectName: (id: number, newName: string) => void;
  clearSelectedProject: () => void;

	userId: number | null;
	setUserId: (id:number) => void;
	clearUserId: () => void;
}

export const useStore = create<StoreState>()(
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

			userId: null,
			setUserId: (id) => set({ userId: id }),
			clearUserId: () => set({ userId: null }),
    }),
    {
      name: 'project-storage',
    }
  )
);