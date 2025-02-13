"use client";

import { Button } from "@/shared/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { motion } from 'framer-motion';

export function StyleguidesPageInfo() {
  return (
    <motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut"}}
		className="flex flex-col sm:flex-row items-center justify-between">
      <h3 className="text-5xl sm:text-6xl md:text-7xl 2xl:text-9xl text-white font-semibold pb-8 xl:pb-16">
        Style Guides
      </h3>
      <Link href="/new-styleguide">
        <Button
          className="mb-4 sm:mb-0 w-auto px-4 h-12 py-2 bg-neutral-100 
					hover:bg-white rounded-xl
							hover:border-white shadow-none transition-colors 
							text-neutral-950 text-base 2xl:text-2xl 2xl:px-8 2xl:py-6"
        >
          <AiOutlinePlus className="text-black" />
          Create Style Guide
        </Button>
      </Link>
    </motion.div>
  );
}
