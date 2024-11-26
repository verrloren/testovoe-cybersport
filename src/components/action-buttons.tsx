'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button"
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons"
import { AiOutlineEdit } from "react-icons/ai";
import { SheetComponent } from "./ui/sheet-component";
import { motion } from 'framer-motion';

export function ActionButtons() {

	const router = useRouter();

	return (

		<motion.div 
			initial={{ opacity: 0, y: 15 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay : 0.7 }}
		className="flex flex-row items-center gap-x-2">
			<Button
				onClick={() => router.push('/start')}
				className="w-12 h-12 py-2 px-2 bg-black rounded-full border 
				border-neutral-600 hover:border-neutral-200 transition-colors peer"
			>	
				<PlusIcon className="text-white peer-hover:text-white" />
			</Button>

			<Button
				className="w-12 h-12 py-2 px-2 bg-black rounded-full border 
				border-neutral-600 hover:border-neutral-200 transition-colors peer"
			>	
				<AiOutlineEdit size={16} className="text-white peer-hover:text-white" />
			</Button>
			<Button
				className="w-12 h-12 py-2 px-2 bg-black rounded-full border 
				border-neutral-600 hover:border-neutral-200 transition-colors peer"
			>	
				<TrashIcon className="text-white peer-hover:text-white" />
			</Button>
			{/* <Button
				className="w-12 h-12 py-2 px-2 bg-black rounded-full border 
				border-neutral-600 hover:border-neutral-200 transition-colors peer"
			>	
				<AiOutlineSetting className="text-white peer-hover:text-white" />
			</Button> */}
			<SheetComponent />
		</motion.div>
	)
}
