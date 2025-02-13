'use client'

import { motion } from 'framer-motion';
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";

import { Button } from "@/shared"
import { EditProjectSheet, ButtonMD, DeleteProjectDialog } from "@/features/projects";



export function ActionButtons({ redirect, rounded, bg }: { redirect?: boolean, rounded?: string, bg?: string }) {

	const router = useRouter();

	return (

		<motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6, delay : 0.15, ease: "easeInOut" }}
		className="flex flex-row items-center gap-x-2">
			
			{/* PDF */}
			<ButtonMD />

			{/* ADD */}
			<Button
				onClick={() => router.push('/start')}
				className="w-12 h-12 py-2 px-2 bg-black/90 hover:bg-black/90 rounded-full border border-black/90 
					hover:border-white shadow-none transition-colors"
			>	
				<AiOutlinePlus className="text-white" />
			</Button>

			{/* EDIT */}
			<EditProjectSheet bg={bg} rounded={rounded} />

			{/* DELETE */}
			<DeleteProjectDialog bg={bg} rounded={rounded} redirect={redirect} />
			
			{/* SETTINGS */}
			{/* <SheetComponent  /> */}
		</motion.div>

	)
}