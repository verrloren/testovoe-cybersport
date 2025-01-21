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
			transition={{ duration: 0.4 }}
		className="flex flex-col sm:flex-row items-center justify-between">
      <h3 className="text-7xl lg:text-8xl text-white font-semibold pb-8 xl:pb-16">
        Projects
      </h3>
      <Link href="/new-project">
        <Button
          className="w-auto px-4 h-12 py-2 bg-neutral-100 hover:bg-white rounded-xl
							hover:border-white shadow-none transition-colors text-neutral-950 text-base"
        >
          <AiOutlinePlus className="text-black" />
          Create project
        </Button>
      </Link>
    </motion.div>
  );
}
