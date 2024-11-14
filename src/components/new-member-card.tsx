'use client'

import Image from "next/image"
import { motion } from 'framer-motion'
import { useState } from "react";

import { NewMemberModal } from "./new-member-modal";
import { TarotCardType } from "@/lib/types";



const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface NewMemberCardProps {
	taroCards: TarotCardType[]
	teamId: string;
	onMemberAdded: () => void;
}

export function NewMemberCard({ taroCards, teamId, onMemberAdded }: NewMemberCardProps ) {

	const [showModal, setShowModal] = useState(false);


  return (
    <motion.div
      className="h-auto flex flex-row items-start justify-between"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.6, delay: 0.8, ease: "easeInOut" }}
    >
      <motion.div
				onClick={() => setShowModal(prev => !prev)}
        className="relative flex flex-col items-center w-52 h-auto group cursor-pointer"
        variants={cardVariants}
      >
        <div 
				className="w-[95%] h-60 flex justify-center -z-10 card-background rounded-2xl absolute">
          <h5 className="font-lancelot text-radial-gradient-light text-lg mt-1 group-hover:brightness-150 transition-all duration-300">
						New member
          </h5>
        </div>

				{showModal && (
					<NewMemberModal teamId={teamId} taroCards={taroCards} setShowModal={setShowModal} onMemberAdded={onMemberAdded} />
				)}

        <Image
          src="/images/tarot-cards/cardback.svg"
          width={300}
          height={500}
          alt="new member"
          className="rounded-3xl w-52 mt-9 shadow-xl"
        />
      </motion.div>
    </motion.div>
  )
}