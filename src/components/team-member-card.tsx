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
      className="h-auto relative flex flex-row items-start justify-between"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.6, delay: 1.4, ease: "easeInOut" }}
    >


        <div className="w-full flex flex-col bg-[#297878] -z-10 border border-[#666] rounded-2xl absolute hover:brightness-110 transition-all">
					<h5 className="text-center text-xl font-bold text-white my-2 group-hover:brightness-150 transition-all duration-300">
            {member.name}
          </h5>

        <Image
          src={member.taroCard.url}
          width={300}
          height={500}
          alt="team member"
          className="w-full rounded-br-2xl rounded-bl-2xl"
        /> 
				
        </div>

    </motion.div>
  )
}