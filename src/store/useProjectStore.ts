// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { Project } from '@/lib/types';

// interface ProjectState {
//   selectedProject: Project | null;
//   setSelectedProject: (project: Project | null) => void;
// }

// export const useProjectStore = create<ProjectState>()(
//   persist(
//     (set) => ({
//       selectedProject: null,
//       setSelectedProject: (project) => set({ selectedProject: project }),
//     }),
//     {
//       name: 'project-storage',
//     }
//   )
// );
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '@/lib/types';

interface ProjectState {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  updateProjectName: (id: number, newName: string) => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      selectedProject: null,
      setSelectedProject: (project) => set({ selectedProject: project }),
      updateProjectName: (id, newName) => 
        set((state) => ({
          selectedProject: state.selectedProject?.id === id 
            ? { ...state.selectedProject, name: newName }
            : state.selectedProject
        })),
    }),
    {
      name: 'project-storage',
    }
  )
);