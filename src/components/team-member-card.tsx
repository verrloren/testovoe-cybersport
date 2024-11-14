'use client'

import Image from "next/image"
import { motion } from 'framer-motion'
import { MemberType } from "@/lib/types";

interface TeamMemberCardProps {
	member: MemberType;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <motion.div
      className="h-auto flex flex-row items-start justify-between"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.6, delay: 1.4, ease: "easeInOut" }}
    >
      <div
        className="relative flex flex-col items-center w-52 h-auto group cursor-pointer"
      >
        <div className="w-[95%] h-60 flex justify-center -z-10 card-background rounded-2xl absolute">
					<h5 className="font-lancelot text-radial-gradient-light text-lg mt-1 group-hover:brightness-150 transition-all duration-300">
            {member.name}
          </h5>
        </div>

        <Image
          src={member.taroCard.url}
          width={300}
          height={500}
          alt="team member"
          className="rounded-3xl w-52 mt-9 shadow-xl"
        /> 
      </div>
    </motion.div>
  )
}