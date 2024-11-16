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
      setCardError("Выберите карту");
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
			toast.success("Участник создан!");
			router.refresh();
    } catch (error) {
      console.error("error", error);
			toast.error("Ошибка создания участника");
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
      className="fixed h-screen inset-0 bg-opacity-75 
			flex justify-center items-center 
			cursor-default backdrop-blur-sm z-30"
    >
      <div
				className="bg-white border border-[#666] w-[80%] h-[80%] rounded-3xl
				flex-col justify-center gap-y-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit(createNewMember)}
          className="w-full h-auto flex flex-col gap-y-4 relative items-center justify-center"
        >
          <Button
            onClick={() => setShowModal(false)}
            className="absolute w-10 h-10 top-4 right-6 text-neutral-700 bg-transparent shadow-none
							rounded-full flex items-center justify-center p-2 hover:text-neutral-400 transition-colors cursor-pointer"
          >
            <IoMdClose size={24} />
          </Button>

          <div className="w-full flex flex-row h-auto">
						<div className="w-full flex flex-col mt-12 ml-8 items-start gap-y-4">
						<h3 className=" pb-4 font-bold text-4xl md:text-5xl text-black">
              Участник команды
            </h3>

								<div className="flex flex-col md:flex-row w-full gap-8">
									<div className="flex flex-col gap-4 w-[80%] xl:w-[80%] md:w-1/2">
										<Input
											type="text"
											placeholder="Имя"
											{...register("firstname")}
											className="w-full md:w-full rounded-xl
																text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
																bg-white transition-colors duration-200 focus:outline-none
																placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
										/>
										{errors.firstname && (
											<p className="text-red-500 text-xs mt-1">{errors.firstname.message}</p>
										)}
										<Input
											type="text"
											placeholder="Фамилия"
											{...register("surname")}
											className="w-full md:w-full rounded-xl
																text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
																bg-white transition-colors duration-200 focus:outline-none
																placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
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
														placeholder="Дата рождения"
														className="w-full md:w-full rounded-xl
														text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
														bg-white transition-colors duration-200 focus:outline-none
														placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
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
											? "ring-2 ring-[#F46645] radial-gradient-border-select-modal"
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


					<Button
              className="w-[95%] mt-20 py-10 bg-[#297878]
							rounded-3xl h-12 text-3xl text-white
							hover:brightness-125 transition-all duration-300 shadow-xl"
              type="submit"
            >
              Создать
            </Button>
        </form>
      </div>
    </motion.div>
		</AnimatePresence>
  );
}
