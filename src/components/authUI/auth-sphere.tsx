"use client";
import { motion } from "framer-motion";

export function AuthSphere() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, delay: 0.2, ease: "easeIn" }}
      className="h-full w-full absolute top-0 left-0 -z-20"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
        className="noise w-full xl:w-[100vh] aspect-square -z-10 absolute 
		top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
		radial-ellipse  overflow-hidden"
      ></motion.div>
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: 1,
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          delay: 1,
          ease: "easeInOut",
        }}
        className="noise w-[30vw] xl:w-[20vw] aspect-square -z-10 absolute 
top-1/4 left-[10%] md:left-[20%] xl:left-1/4 transform -translate-x-1/2 -translate-y-1/2
radial-ellipse  overflow-hidden"
      ></motion.div>
    </motion.div>
  );
}
