"use client";

import { z } from "zod";
import { Input } from "./ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const schema = z.object({
  firstname: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  countryOfBirth: z.string().min(1, "Country is required"),
  cityOfBirth: z.string().min(1, "City is required"),
  date: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format"
    })
    .refine((val) => new Date(val) <= new Date(), {
      message: "Date cannot be in the future"
    })
    .refine((val) => new Date(val).getFullYear() >= 1900, {
      message: "Date cannot be before 1900"
    }),
  team: z.string().min(1, "Team is required"),
});

type FormData = z.infer<typeof schema>;

interface TarotFormProps {
  teams: TeamType[];
}

export function AstroForm({ teams }: TarotFormProps) {

	const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });



  const onSubmit = async (intervieweeData: FormData) => {

    const fullName = `${intervieweeData.firstname} ${intervieweeData.surname}`;
    const data = {
      ...intervieweeData,
      name: fullName,
      teamId: intervieweeData.team,
    };


    try {
			
      const response = await fetch("/api/new-interviewee-astro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

			

			const responseNewInterviewee = await response.json();

			const fetchData = {
        id: responseNewInterviewee.id,
        teamId: responseNewInterviewee.teamId
      };
			const apiResponse = await fetch(
        "https://still-weekly-tortoise.ngrok-free.app/new_member/predict/astro",
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
				const prediction = await apiResponse.json();
        console.log(prediction);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create interviewee");
      }

      toast.success("Собеседуемый создан");
			router.push(`/astro/result?id=${responseNewInterviewee.id}&teamId=${intervieweeData.team}`);
    } catch (error) {
      console.error("Error creating interviewee:", error);
      toast.error("Error creating interviewee");
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
						className="w-full rounded-xl
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
						className="w-full rounded-xl
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
        defaultValue="" // Add default value here
        render={({ field: { onChange, value } }) => (
          <input
            type="datetime-local"
            value={value}
            onChange={onChange}
            className="w-full rounded-xl
              text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
              bg-white transition-colors duration-200 focus:outline-none
              placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
            step="60"
            min="1900-01-01T00:00"
            max={new Date().toISOString().slice(0, 16)}
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
									className="w-full rounded-xl
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

					<Input
            {...register("countryOfBirth")}
            type="text"
            placeholder="Страна рождения. Формат: RU"
						className="w-full rounded-xl
						text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
						bg-white transition-colors duration-200 focus:outline-none
						placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
          />
          {errors.countryOfBirth && (
            <FormErrorMessage message={errors.countryOfBirth.message} />
					)}

					<Input
            {...register("cityOfBirth")}
            type="text"
            placeholder="Город рождения"
						className="w-full rounded-xl
						text-neutral-950 text-xl pl-4 py-2 border border-neutral-300
						bg-white transition-colors duration-200 focus:outline-none
						placeholder:text-neutral-600 focus:bg-white focus:border-[#666]"
          />
          {errors.cityOfBirth && (
            <FormErrorMessage message={errors.cityOfBirth.message} 
						/>
          )}
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
