'use client'

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import { SheetComponent } from "./sheet-component";
import { motion } from 'framer-motion';
import { SheetEdit } from "./sheet-edit";
import { DeleteProjectDialog } from "@/modules/projects/components/delete-project-dialog";
import { ButtonMD } from "./button-md";



export function ActionButtons() {

	const router = useRouter();

	return (

		<motion.div 
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay : 0.7 }}
		className="flex flex-row items-center gap-x-2">
			
			{/* PDF */}
			<ButtonMD />

			{/* ADD */}
			<Button
				onClick={() => router.push('/start')}
				className="w-12 h-12 py-2 px-2 bg-black hover:bg-black rounded-full border 
				border-neutral-800 hover:border-neutral-200 transition-colors peer"
			>	
				<PlusIcon className="text-white peer-hover:text-white" />
			</Button>

			{/* EDIT */}
			<SheetEdit />

			{/* DELETE */}
			<DeleteProjectDialog />
			
			{/* SETTINGS */}
			<SheetComponent  />
		</motion.div>
	)
}
