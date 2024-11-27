"use client"

import * as React from "react"
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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function ProjectsCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

	const status = "error";

  return (
    <motion.div 
		initial={{ opacity: 0, y: 15 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5, delay: 0.6 }}
		className="flex justify-center items-center">

			<StatusIndicator status={status} />

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="ghost"
						role="combobox"
						aria-expanded={open}
						className="text-7xl font-poppins flex justify-center items-center text-white gap-x-4"
					>
						{value
							? frameworks.find((framework) => framework.value === value)?.label
							: "Projects"}
						<ChevronDown className={`text-white opacity-75 transition-transform duration-200 pl-0
									${open ? "rotate-180" : ""}`} />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="mt-8 border border-neutral-600 rounded-xl bg-black p-0">
					<Command>
						<CommandInput className="text-white placeholder:text-white font-poppins" placeholder="Search project..." />
						
								<CommandList >
							<CommandEmpty className="text-neutral-200 pl-4 py-2">No project found.</CommandEmpty>
							<CommandGroup >
								{frameworks.map((framework) => (
									<CommandItem
												className="text-neutral-400 font-poppins cursor-pointer hover:text-white transition-colors"
										key={framework.value}
										value={framework.value}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue)
											setOpen(false)
										}}
									>
										{framework.label}
										<Check
											className={cn(
												"ml-auto",
												value === framework.value ? "opacity-100" : "opacity-0"
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
