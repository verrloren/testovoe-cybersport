'use client'
import { motion } from 'framer-motion';

export function NpxInfo() {
	return (
		<>
			<motion.h3
			initial={{ opacity: 0, x: 30 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.4, delay: 1.4, ease: "easeInOut" }}
			className="text-8xl font-poppins text-neutral-200 mb-2">OR</motion.h3>
			<div className='flex flex-col items-start'>
				<motion.p
				initial={{ opacity: 0, x: 30 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4, delay: 1.6, ease: "easeInOut" }}
				className="text-neutral-600 text-lg font-ibmPlexMono">~ npx evrz login</motion.p>
				<motion.p
				initial={{ opacity: 0, x: 30 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4, delay: 1.8, ease: "easeInOut" }}
				className="text-neutral-600 text-lg font-ibmPlexMono">~ npx evrz analize</motion.p>
			</div>
		</>
	)
}
