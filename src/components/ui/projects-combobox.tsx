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
import { PopoverAnchor } from "@radix-ui/react-popover";

interface ProjectComboboxProps {
	projects: Project[];
}


export function ProjectsCombobox({ projects }: ProjectComboboxProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(projects[0]?.label.toLowerCase() || "")

	const status = projects.find((project) => project.label.toLowerCase() === value)?.status || "default";

	useEffect(() => {
    const selectedProject = projects.find((project) => project.label.toLowerCase() === value);
    if (selectedProject) {
      document.dispatchEvent(new CustomEvent('projectSelected', { detail: selectedProject }));
    }
  }, [value, projects]);

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
						{value
							? projects.find((project) => project.label.toLowerCase() === value)?.label
							: "Projects"}
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
										className="text-neutral-400 font-poppins cursor-pointer hover:text-white transition-colors"
									key={project.label}
										value={project.label.toLowerCase()}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue)
											setOpen(false)
										}}
									>
										{project.label}
										<Check
											className={cn(
												"ml-auto",
												value === project.label.toLowerCase() ? "opacity-100" : "opacity-0"
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
