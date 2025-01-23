"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';


export function Logo() {

  return (
    <motion.div
			className="flex items-center justify-center cursor-pointer hover:brightness-110 transition-all duration-300"
    >
			<Link
			href="/"
			className="text-2xl 2xl:text-2xl text-white/40 font-ibmPlexMono hover:text-white/70 pr-2 
			transition-colors"
				>
				evrz
			</Link>


			
    </motion.div>
  );
}
