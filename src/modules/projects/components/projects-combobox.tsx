"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StatusIndicator } from "./status-indicator";
import { useQuery } from "react-query";
import { getProjects } from "../getProjects";
import { projectsApi } from "../api";
import { ProjectDto } from "@/lib/types";
import { useProjectsStore } from "../projects-store";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export function ProjectsCombobox() {
  const selectedProject = useProjectsStore((state) => state.selectedProject);
  const setSelectedProject = useProjectsStore(
    (state) => state.setSelectedProject
  );
  const isPopoverOpen = useProjectsStore((state) => state.isPopoverOpen);
  const setIsPopoverOpen = useProjectsStore((state) => state.setIsPopoverOpen);

  const { data: projects = [], isLoading } = useQuery<ProjectDto[]>({
    queryKey: [projectsApi.baseKey],
    queryFn: getProjects,
    onSuccess: (data) => {
      if (data.length > 0) {
        if (
          !selectedProject ||
          !data.some((p) => p.id === selectedProject.id)
        ) {
          setSelectedProject(data[0]);
        }
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const status =
    (selectedProject?.code_reviews?.length ?? 0) > 0 ? "error" : "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex justify-center items-center"
    >
      <StatusIndicator size="lg" status={status} />

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={isPopoverOpen}
            className="text-7xl 2xl:text-8xl font-poppins flex justify-center items-center 
						text-white gap-x-4 hover:bg-transparent hover:text-white focus:outline-none focus:border-none"
          >
            {selectedProject?.name || "Select Project"}

            <motion.div
              animate={{ rotate: isPopoverOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon width={12} height={12} className="" />
            </motion.div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="mt-8 border-none rounded-2xl p-0">
          <Command className="bg-black border border-neutral-800  rounded-xl">
            <CommandInput
              className="text-white placeholder:text-neutral-400 font-poppins"
              placeholder="Search project..."
            />

            <CommandList>
              <CommandEmpty className="text-neutral-200 pl-4 py-2">
                No project found.
              </CommandEmpty>
              <CommandGroup>
                {projects.map((project) => (
                  <CommandItem
                    className="text-neutral-400 font-poppins flex items-center cursor-pointer 
										hover:text-white transition-colors"
                    key={project.id}
                    onSelect={() => {
                      setSelectedProject(project);
                      setIsPopoverOpen(false);
                    }}
                  >
                    {project.name}
                    {selectedProject?.id === project.id && (
                      <CheckIcon className="h-4 w-4 text-white ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </motion.div>
  );
}
