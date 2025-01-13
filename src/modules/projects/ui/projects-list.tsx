"use client";

import { ProjectDto } from "@/shared/model/types";
import { useQuery } from "@tanstack/react-query";
import { getProjectsAction } from "../get-projects-action";
import { projectsApi } from "../api";
import { DotsVerticalIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { GitBranch, GitCommit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteProjectDialog } from "./delete-project-dialog";
import { EditProjectSheet } from "./edit-project-sheet";
import Link from "next/link";
import { useProjectsStore } from "../projects-store";

export function ProjectsList() {
  const selectProject = useProjectsStore((state) => state.setSelectedProject);

  const { data: projects = [], isLoading } = useQuery<ProjectDto[]>({
    queryKey: [projectsApi.baseKey],
    queryFn: getProjectsAction,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
		select: (data) => {
      return [...data].sort((a, b) => {
        // First, sort by pending status
        if (a.project_status === "pending" && b.project_status !== "pending") return -1;
        if (a.project_status !== "pending" && b.project_status === "pending") return 1;
        
        // Then sort by last_edit_date
        return new Date(b.last_edit_date).getTime() - new Date(a.last_edit_date).getTime();
      });
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen grid grid-cols-4 gap-x-4 gap-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`relative min-w-40 min-h-48 border  rounded-2xl 
				hover:border-neutral-400 transition-colors px-8 py-8 
				${ project.project_status === "pending" ? "bg-[#080808]": "bg-neutral-950"}
				${ project.project_status === "pending" ? "border-none": "border-neutral-800"}
				${ project.project_status === "pending" ? "brightness-75": "border-neutral-800"}
				`}
          // onClick={() => router.push(`/${project.id}`)}
        >
          {/* project name */}
          <div className="flex flex-row items-center gap-x-2">
            <Link
							href={project.project_status !== "pending" ? `/${project.id}` : ""}
							onClick={(e) => {
								if (project.project_status === "pending") {
									e.preventDefault(); // Prevent the redirect
									return;
								}
								selectProject(project);
							}}
              className={`text-white text-3xl
								${project.project_status === "pending" ? "hover:no-underline " : "hover:underline "}
								${project.project_status === "pending" ? "cursor-default " : "cursor-pointer"}
							`}
            >
              {project.name}
            </Link>
            <div
              className={`w-2 h-2 mt-1 rounded-full ${
                project.project_status === "pending"
                  ? "bg-yellow-600"
                  : "bg-green-600"
              }`}
            ></div>
          </div>

          <div className="w-full flex items-start gap-x-8 mt-2">
            {/* git section  */}
            <div className="pt-4 flex flex-col items-start gap-y-2">
              <div className="w-full h-6 bg-neutral-900 rounded-xl flex justify-center items-center">
                <p className="flex items-center  gap-x-2 text-sm text-neutral-400">
                  <GitHubLogoIcon height={14} width={14} />
                  repository
                </p>
              </div>
              <p className="flex items-center gap-x-2 text-sm text-neutral-600">
                <GitCommit size={18} />
                last commit
              </p>
              <p className="flex items-center gap-x-2 text-sm text-neutral-600">
                <GitBranch size={14} />
                current branch
              </p>
            </div>

            {/* current styleguide  */}
            <div className="pt-4 flex flex-col items-start gap-y-2">
              <h5 className="text-neutral-400">Styleguide</h5>
            </div>
          </div>

          <div className="absolute top-6 right-4 ">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <DotsVerticalIcon
                  width={18}
                  height={18}
                  className="text-neutral-400 hover:text-white transition-colors"
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-neutral-950 w-full border border-neutral-800  rounded-xl">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <EditProjectSheet
                    projectId={project.id}
                    projectName={project.name}
                    bg="dark"
                    border="none"
                    wfull="wfull"
                    text="Edit"
                    rounded="md"
                  />
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <DeleteProjectDialog
                    projectId={project.id}
                    bg="dark"
                    border="none"
                    wfull="wfull"
                    text="Delete"
                    rounded="md"
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
