"use client";

import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';


export function Logo() {
  const router = useRouter();

  return (
    <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
			className="flex items-center justify-center cursor-pointer hover:brightness-110 transition-all duration-300"
    >
			<h1
			className="text-3xl text-neutral-800 hover:brightness-110 pr-2 transition-colors"
			onClick={() => router.push('/')}
				>
				НАЙМИКС
			</h1>

			<div className="px-3 py-2 flex items-center justify-center bg-[#F46645] rounded-[8px]">
				<h1 className="text-white">ВАНГА</h1>
			</div>
			
    </motion.div>
  );
}
