
"use client";

import { z } from "zod";
import { DateInput } from "rsuite";
import { Input } from "./ui/input";
import Image from "next/image";
import { TarotCardType } from "@/lib/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormErrorMessage } from "./ui/form-error-message";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { TeamType } from "../lib/types";
import { Button } from "./ui/button";

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
      setCardError("Please select at least one tarot card.");
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
      const response = await fetch("/api/new-interviewee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

			const fetchData = {
				"id": "d4e8c328-e55a-43af-879b-391dac96ea26",
				"teamId": "cm3hms7iz0000e63nasoyec1d"
			}
      const apiResponse = await fetch("https://2c9a-151-236-15-36.ngrok-free.app/new_member/predict", {
        method: "POST",
        headers: {
					"Content-Type": "application/json",
					"ngrok-skip-browser-warning": "any_value",
					"API-key": "gn94bgy3ruodcmknf3ob2ieposqld",
				cors: "no-cors"
        },
        body: JSON.stringify(fetchData),
			});

			if (apiResponse.ok) {
				const {answer, percentage} = await apiResponse.json();
				console.log(answer, percentage);
			}

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create interviewee");
      }

      const responseData = await response.json();
      console.log(responseData);
      toast.success("Interviewee created successfully");
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
      <div className="flex flex-col md:flex-row items-start">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: "easeInOut" }}
          className="w-full flex flex-col items-start gap-y-4"
        >
          <h1 className="font-libreFranklin font-bold text-5xl text-white pt-12 pb-4">
            Details
          </h1>
          <Input
            {...register("firstname")}
            type="text"
            placeholder="Name"
            className="w-full md:w-[85%] border bg-black border-neutral-950 rounded-xl shadow-inner
              font-lancelot text-neutral-200 text-xl pl-4 py-2
              transition-colors duration-200 focus:outline-none
              placeholder:text-neutral-500 focus:placeholder:text-neutral-200 focus:bg-neutral-950"
          />
          {errors.firstname && (
            <FormErrorMessage message={errors.firstname.message} />
          )}
          <Input
            {...register("surname")}
            type="text"
            placeholder="Surname"
            className="w-full md:w-[85%] border bg-black border-neutral-950 rounded-xl shadow-inner
              font-lancelot text-neutral-200 text-xl pl-4 py-2
              transition-colors duration-200 focus:outline-none
              placeholder:text-neutral-500 focus:placeholder:text-neutral-200 focus:bg-neutral-950"
          />
          {errors.surname && (
            <FormErrorMessage message={errors.surname.message} />
          )}

          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DateInput
                {...field}
                className="w-full md:w-[85%] border bg-black border-neutral-950 
                rounded-xl shadow-inner
                font-lancelot text-neutral-200 text-xl pl-4 py-2
                transition-colors duration-200 focus:outline-none
                placeholder:text-neutral-500 neutral-800 focus:bg-neutral-950"
              />
            )}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}

          <select
            {...register("team")}
            className="w-full md:w-[85%] border bg-black border-neutral-950 rounded-xl shadow-inner
              font-lancelot text-neutral-500 text-xl pl-4 py-2
              transition-colors duration-200 focus:outline-none
              placeholder:text-neutral-500 focus:bg-neutral-950"
          >
            <option value="">Select a team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
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
            Choose card
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {taroCards.map((card, index) => (
              <motion.div
                key={index}
                onClick={() => handleCardSelect(card)}
                className={`relative cursor-pointer rounded-xl
                  ${
                    selectedCard?.id === card.id
                      ? "ring-4 ring-black radial-gradient-border-select"
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
				className="w-full  card-background-diff-direction 
				rounded-2xl h-14 text-3xl font-lancelot text-white
				hover:brightness-125 transition-all duration-300"
        // className="my-10 bg-neutral-200 hover:bg-white transition-colors duration-300 
        // w-full h-full py-3
        // rounded-xl font-libreFranklin text-black text-2xl duration-400"
      >
        <p className="text-radial-gradient-middle">See fate</p>
			</Button>
      </motion.div>

    </form>
  );
}