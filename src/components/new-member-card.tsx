'use client'

import { motion } from 'framer-motion'
import { useState } from "react";

import { NewMemberModal } from "./new-member-modal";
import { TarotCardType } from "@/lib/types";
import { QuestionMarkIcon } from '@radix-ui/react-icons';
import Image from 'next/image';



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
      className="h-auto relative z-20 w-full flex flex-row items-start justify-between"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.6, delay: 1.4, ease: "easeInOut" }}
    >
      <motion.div
				onClick={() => setShowModal(prev => !prev)}
        className="relative flex flex-col items-center w-full h-auto group cursor-pointer"
        variants={cardVariants}
      >


				<div className="w-full flex flex-col bg-[#297878] -z-10 border border-[#666] rounded-2xl absolute hover:brightness-110 transition-all">
					<h5 className="text-center text-xl font-bold text-white my-2 group-hover:brightness-150 transition-all duration-300">
            Новый член
          </h5>

					<div className="w-full relative bg-white border-t border-[#666] rounded-br-2xl rounded-bl-2xl flex justify-center items-center">
						<div className='w-full h-full'>
						<QuestionMarkIcon className='w-40 h-40 text-neutral-300 z-10 absolute left-1/2 -translate-x-1/2 -translate-y-1/2' />
						</div>
						<Image
							src="/images/tarot-cards/the-fool.jpg"
							width={300}
							height={500}
							alt="team member"
							className="w-full rounded-br-2xl h-full rounded-bl-2xl invisible bg-cover"
						/>

					</div>

        {/* <Image
          src="/images/tarot-cards/the-fool.jpg"
          width={300}
          height={500}
          alt="team member"
          className="w-full rounded-br-2xl rounded-bl-2xl opacity-0"
        /> 
				 */}
        </div>

				

				{showModal && (
					<NewMemberModal teamId={teamId} taroCards={taroCards} setShowModal={setShowModal} onMemberAdded={onMemberAdded} />
				)}


      </motion.div>
    </motion.div>
  )
}