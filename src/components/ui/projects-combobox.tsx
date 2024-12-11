"use client"

import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { StatusIndicator } from "./status-indicator"
import { useEffect, useState } from "react";
import { Project } from "@/lib/types";
import { useStore } from "@/store/store";

interface ProjectComboboxProps {
	projects: Project[];
}


export function ProjectsCombobox({ projects }: ProjectComboboxProps) {
	const { selectedProject, setSelectedProject } = useStore();
  const [open, setOpen] = useState(false)
	const [value, setValue] = useState(selectedProject?.name || projects[0]?.name || "");


  useEffect(() => {
    if (selectedProject) {
      setValue(selectedProject.name);
    }
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      const projectExists = projects.some(p => p.id === selectedProject.id);
      if (!projectExists && projects.length > 0) {
        setSelectedProject(projects[0]);
        setValue(projects[0].name);
      }
    } else if (projects.length > 0) {
      setSelectedProject(projects[0]);
      setValue(projects[0].name);
    }
  }, [projects, selectedProject, setSelectedProject]);


	const status = (selectedProject?.code_reviews?.length ?? 0) > 0 ? "error" : "success";


  return (
    <motion.div 
		initial={{ opacity: 0, y: 15 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5, delay: 0.6 }}
		className="flex justify-center items-center">

			<StatusIndicator size="lg" status={status} />

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						role="combobox"
						aria-expanded={open}
						className="text-7xl 2xl:text-8xl font-poppins flex justify-center items-center text-white gap-x-4"
					>

						{value || "Projects"}
						<ChevronDown className={`text-white opacity-75 transition-transform duration-200 pl-0
									${open ? "rotate-180" : ""}`} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="mt-8 border border-neutral-800 rounded-xl bg-black p-0">
					<Command>
						<CommandInput className="text-white placeholder:text-white font-poppins" placeholder="Search project..." />
						
								<CommandList >
							<CommandEmpty className="text-neutral-200 pl-4 py-2">No project found.</CommandEmpty>
							<CommandGroup >
								{projects.map((project) => (
									<CommandItem
										className="text-neutral-400 font-poppins flex items-center cursor-pointer hover:text-white transition-colors"
										key={project.id}
										onSelect={() => {
											setValue(project.name);
											setSelectedProject(project);
											setOpen(false);
										}}
									>
									{/* <CommandItem
										className="text-neutral-400 font-poppins cursor-pointer hover:text-white transition-colors"
										key={project.label}
										value={project.label}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue)
											setOpen(false)
										}}
									> */}
									
										{project.name}
									
										<Check
											className={cn(
												"ml-auto",
												value === project.name ? "opacity-100" : "opacity-0"
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			

		</motion.div>
  )
}
