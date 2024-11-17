"use client";

import { z } from "zod";
import { Input } from "./ui/input";
import Image from "next/image";
import { TarotCardType } from "@/lib/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormErrorMessage } from "./ui/form-error-message";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { TeamType } from "../lib/types";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { DateInput } from "rsuite";

const schema = z.object({
  firstname: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  team: z.string().min(1, "Team is required"),
  date: z.date().refine((date) => !isNaN(date.getTime()), {
    message: "Invalid date",
  }),
});

type FormData = z.infer<typeof schema>;

interface TarotFormProps {
  taroCards: TarotCardType[];
  teams: TeamType[];
}

export function TarotForm({ taroCards, teams }: TarotFormProps) {

	const router = useRouter();
  const [cardError, setCardError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<TarotCardType | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });



  const onSubmit = async (intervieweeData: FormData) => {
    if (!selectedCard) {
      setCardError("Пожалуйста выберите карту");
      return;
    }
    setCardError(null);

    const fullName = `${intervieweeData.firstname} ${intervieweeData.surname}`;
    const data = {
      ...intervieweeData,
      name: fullName,
      card: selectedCard,
      teamId: intervieweeData.team,
    };

    try {
      const response = await fetch("/api/new-interviewee-tarot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

			const responseNewInterviewee = await response.json();
			console.log("interviewee created in db", intervieweeData)

      const fetchData = {
        id: responseNewInterviewee.id,
        teamId: responseNewInterviewee.teamId
      };
      const apiResponse = await fetch(
        "https://still-weekly-tortoise.ngrok-free.app/new_member/predict/taro",
        {
					method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "any_value",
            "API-key": "gn94bgy3ruodcmknf3ob2ieposqld",
          },
          body: JSON.stringify(fetchData),
        }
      );

      if (apiResponse.ok) {
        const { answer, percentage } = await apiResponse.json();
        console.log(answer, percentage);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create interviewee");
      }

      console.log(responseNewInterviewee);
      toast.success("Собеседуемый создан");
			router.push(`/tarot/result?id=${responseNewInterviewee.id}&teamId=${intervieweeData.team}`);
    } catch (error) {
      console.error("Error creating interviewee:", error);
      toast.error("Error creating interviewee");
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeInOut" }}
          className="w-full flex flex-col items-start gap-y-4"
        >
          <h1 className="font-bold text-5xl text-neutral-900	 pt-12 pb-4">
            Собеседуемый
          </h1>
          <Input
            {...register("firstname")}
            type="text"
            placeholder="Имя"
						className="w-full md:w-[80%] rounded-xl
						text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
						bg-white transition-colors duration-200 focus:outline-none
						placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
          />
          {errors.firstname && (
            <FormErrorMessage message={errors.firstname.message} />
          )}
          <Input
            {...register("surname")}
            type="text"
            placeholder="Фамилия"
						className="w-full md:w-[80%] rounded-xl
						text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
						bg-white transition-colors duration-200 focus:outline-none
						placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
          />
          {errors.surname && (
            <FormErrorMessage message={errors.surname.message} />
          )}

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DateInput
								placeholder="Дата рождения"
                {...field}
								className="w-full md:w-[80%] rounded-xl
								text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
								bg-white transition-colors duration-200 focus:outline-none
								placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
              />
            )}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}


          <Controller
            name="team"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Select
								value={field.value}
								onValueChange={(value) => field.onChange(value)}
							>
                <SelectTrigger
											className="w-full md:w-[80%] rounded-xl
											text-neutral-600 text-xl pl-4 py-2 border border-neutral-300
											bg-white transition-colors duration-200 focus:outline-none
											placeholder:text-neutral-400 focus:bg-white focus:border-[#666]"
                >
                  <SelectValue placeholder="Команда" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup
                    className="w-full ring-none border bg-white border-neutral-950 rounded-xl shadow-inner
      							font-lancelot text-800 text-xl pl-4 py-2
      							transition-colors duration-200 focus:outline-none
      							placeholder:text-neutral-400 focus:bg-neutral-950"
                  >
                    {teams.map((team) => (
                      <SelectItem
                        className="text-xl hover:text-neutral-black cursor-pointer"
                        key={team.id}
                        value={team.id}
                      >
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />


          {errors.team && <FormErrorMessage message={errors.team.message} />}
        </motion.div>

        {/* Tarot cards section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8, ease: "easeInOut" }}
          className="w-full flex items-start flex-col"
        >
          <h1 className="font-libreFranklin font-bold text-5xl text-white pt-12 pb-8">
            Выберите карту
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {taroCards.map((card, index) => (
              <motion.div
                key={index}
                onClick={() => handleCardSelect(card)}
                className={`relative cursor-pointer rounded-xl
                  ${
                    selectedCard?.id === card.id
                      ? "ring-4 ring-[#F46645] radial-gradient-border-select"
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
              </motion.div>
            ))}
          </div>
          <div className="mt-2">
            {cardError && <FormErrorMessage message={cardError} />}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="w-full flex justify-center mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1.2, ease: "easeInOut" }}
      >
					<Button
              className="w-full py-8 mt-8 bg-[#297878]
							rounded-2xl h-12 text-3xl text-white
							hover:brightness-125 transition-all duration-300 shadow-xl"
              type="submit"
            >
              Решить судьбу
            </Button>
      </motion.div>
    </form>
  );
}
