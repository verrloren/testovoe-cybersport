"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

interface LogoProps {
  isActive: boolean;
}

export function Logo({ isActive }: LogoProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ scale: isActive ? 1.1 : 1 }}
      animate={{ scale: isActive ? 1 : 1.1 }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: 1.8 }}
    >
      <Image
        src="/images/logo.svg"
        className={`rounded-full cursor-pointer ring-[3px] ring-black hover:scale-110 duration-500 transition-transform `}
        alt="logo"
        width={80}
        height={80}
        onClick={() => router.push("/")}
        priority
      />
    </motion.div>
  );
}
