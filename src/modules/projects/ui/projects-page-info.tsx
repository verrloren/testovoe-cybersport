"use client";

import { Button } from "@/components/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { motion } from 'framer-motion';

export function ProjectsPageInfo() {
  return (
    <motion.div 
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: "easeInOut" }}
		className="flex flex-col sm:flex-row items-center justify-between">
      <h3 className="text-7xl lg:text-8xl 2xl:text-9xl text-white font-semibold pb-12 xl:pb-20">
        Projects
      </h3>
      <Link href="/new-project">
        <Button
          className="mb-4 sm:mb-0 w-auto px-4 h-12 py-2 bg-neutral-100 
					hover:bg-white rounded-xl
							hover:border-white shadow-none transition-colors 
							text-neutral-950 text-base 2xl:text-2xl 2xl:px-8 2xl:py-6"
        >
          <AiOutlinePlus className="text-black" />
          Create project
        </Button>
      </Link>
    </motion.div>
  );
}
