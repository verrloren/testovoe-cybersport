/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateInput } from "rsuite";
import { TarotCardType } from "@/lib/types";
import { FormErrorMessage } from "./ui/form-error-message";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const newMemberSchema = z.object({
  firstname: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  date: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),
});

// interface NewMemberFormDataInterface {
// 	firstname: string;
// 	surname: string;
// 	date: string;
// 	card: TarotCardType;
// }

type NewMemberFormData = z.infer<typeof newMemberSchema>;

interface NewMemberModalProps {
  setShowModal: (value: boolean) => void;
  taroCards: TarotCardType[];
	teamId: string;
	onMemberAdded: () => void;
}

export function NewMemberModal({
  setShowModal,
  taroCards,
	teamId,
	onMemberAdded,
}: NewMemberModalProps) {
  const [selectedCard, setSelectedCard] = useState<TarotCardType | null>(null);
  const [cardError, setCardError] = useState<string | null>(null);

	const router = useRouter();

	const {
    register,
    handleSubmit,
		control,
    formState: { errors },
  } = useForm<NewMemberFormData>({
    resolver: zodResolver(newMemberSchema),
  });

  const createNewMember = async (memberData: NewMemberFormData) => {
    if (!selectedCard) {
      setCardError("Please select at least one tarot card.");
      return;
    }
    setCardError(null);

		const fullName = `${memberData.firstname} ${memberData.surname}`;
		const data = {
			...memberData,
			name: fullName,
			card: selectedCard,
			teamId
		}

    try {
      const response = await fetch(`/api/team/${teamId}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

			if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create member');
      }

			const responseData = await response.json();

      console.log(responseData);
      setShowModal(false);
			onMemberAdded();
			toast.success("Member created successfully");
			router.refresh();
    } catch (error) {
      console.error("Error creating new member:", error);
			toast.error("Error creating new member");
    }
  };
	
  const handleCardSelect = (card: TarotCardType) => {
    if (selectedCard?.id === card.id) {
      setSelectedCard(null);
    } else {
			setSelectedCard(card);
    }
  };

  return (
		<AnimatePresence>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed h-screen inset-0 bg-black bg-opacity-75 
			flex justify-center items-center 
			cursor-default backdrop-blur-sm z-30"
			// "fixed  w-[80%] h-[60%] 
			// bg-black bg-opacity-50 
			// 		flex justify-center items-center cursor-default"
    >
      <div
        // className="card-background-diff-direction h-full w-full 
				// px-2 rounded-3xl
				// flex flex-col justify-center gap-y-4"
				className="card-background-diff-direction w-[80%] h-[80%] rounded-3xl flex 
				flex-col justify-center gap-y-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit(createNewMember)}
          className="w-full h-full flex flex-col gap-y-4 relative items-center justify-center"
        >
          <Button
            onClick={() => setShowModal(false)}
            className="absolute w-10 h-10 top-4 right-6 text-neutral-700 bg-transparent
							rounded-full flex items-center justify-center p-2 hover:text-neutral-400 transition-colors cursor-pointer"
          >
            <IoMdClose size={24} />
          </Button>

          <div className="w-full flex flex-row h-full">
						<div className="w-full flex flex-col mt-12 ml-8 items-start gap-y-4">
						<h3 className="font-libreFranklin pb-4 font-bold text-4xl md:text-5xl text-white">
              Member details
            </h3>

								<div className="flex flex-col md:flex-row w-full gap-8">
									<div className="flex flex-col gap-4 w-[80%] xl:w-[80%] md:w-1/2">
										<Input
											type="text"
											placeholder="Name"
											{...register("firstname")}
											className="w-full md:w-full xl:w-[80%] border-none rounded-xl shadow-inner
																font-lancelot text-neutral-200 text-xl pl-4 py-2
																bg-[#0a0a0a] transition-colors duration-200 focus:outline-none
																placeholder:text-neutral-600 focus:bg-[#0e0e0e]"
										/>
										{errors.firstname && (
											<p className="text-red-500 text-xs mt-1">{errors.firstname.message}</p>
										)}
										<Input
											type="text"
											placeholder="Surname"
											{...register("surname")}
											className="w-full md:w-full border-none rounded-xl shadow-inner
																font-lancelot text-neutral-200 text-xl pl-4 py-2
																bg-[#0a0a0a] transition-colors duration-200 focus:outline-none
																placeholder:text-neutral-600 focus:bg-[#0e0e0e]"
										/>
										{errors.surname && (
											<p className="text-red-500 text-xs mt-1">
												{errors.surname.message}
											</p>
										)}
										<Controller
												name="date"
												control={control}
												render={({ field }) => (
													<DateInput
														{...field}
														className="w-full md:w-full border-none rounded-xl shadow-inner
															font-lancelot text-neutral-200 text-xl pl-4 py-2
															bg-[#0a0a0a] transition-colors duration-200 focus:outline-none
															placeholder:text-neutral-600 focus:bg-[#0e0e0e]"
													/>
												)}
											/>
										{errors.date && (
											<p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
										)}
									</div>
									
									
														{/*   	taro cards section		 */}
														<div className="w-full flex items-start flex-col">
									
									
															<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
																{taroCards.map((card) => (
																	<div
																		key={card.id}
																		onClick={() => handleCardSelect(card)}
																		className={`relative cursor-pointer rounded-xl
										${
																			selectedCard?.id === card.id
											? "ring-2 ring-white radial-gradient-border-select-modal"
																			: ""
																		}`}
									
																	>
																		<Image
																			width={100}
																			height={200}
																			src={card.url}
																			alt={card.name}
																			className="w-full h-full rounded-xl hover:brightness-110 transition-all duration-300"
																		/>
																	</div>
																))}
															</div>
															<div className="mt-2">
																{cardError && <FormErrorMessage message={cardError} />}
															</div>
														</div>
														</div>

														</div>
								</div>

          {/* <Button
            className="w-full py-10 absolute bottom-0 border-t border-neutral-900
							rounded-2xl h-12  font-lancelot text-white
							hover:brightness-150 transition-all duration-300"
            type="submit"
          >
            <p className="text-radial-gradient-light text-4xl">Create</p>
          </Button> */}

					<Button
              className="w-full py-10 card-background-diff-direction-modal-button
							rounded-3xl h-12 text-3xl font-lancelot text-white
							hover:brightness-125 transition-all duration-300 shadow-xl"
              type="submit"
            >
              <p className="text-radial-gradient-middle">Create member</p>
            </Button>
        </form>
      </div>
    </motion.div>
		</AnimatePresence>
  );
}
