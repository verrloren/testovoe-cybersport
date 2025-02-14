"use client";
import { motion } from "framer-motion";

export function StyleGuideName({ styleGuideName }: { styleGuideName: string }) {
  return (
    <motion.h5
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
      className="text-white text-8xl font-semibold"
    >
      {styleGuideName}
    </motion.h5>
  );
}
