"use client";

import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';


export function Logo() {
  const router = useRouter();

  return (
    <motion.div
			className="flex items-center justify-center cursor-pointer hover:brightness-110 transition-all duration-300"
    >
			<h1
			className="text-3xl text-neutral-200 font-ibmPlexMono hover:brightness-110 pr-2 transition-colors"
			onClick={() => router.push('/')}
				>
				evrz
			</h1>


			
    </motion.div>
  );
}
