'use client'

import { useState } from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import toast from "react-hot-toast";
import { motion } from 'framer-motion';
import { Input } from "./input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { IoMdClose } from "react-icons/io";

const teamSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
});

type TeamFormData = z.infer<typeof teamSchema>;

export function CreateTeamButton() {

	const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
  });

	// const [stateToParent, setStateToParent] = useState(false);
	const [teamName, setTeamName] = useState("");
	const [showModal, setShowModal] = useState(false);
	const router = useRouter();
	const { data: session } = useSession();
  const userId = session?.user?.id;

	

	const handleCreateTeam = async (teamData: TeamFormData) => {

		const capitalizedTeamName = capitalizeFirstLetter(teamData.teamName);

    const data = {
			userId,
      name: capitalizedTeamName,
    };

    try {
        const response = await fetch("/api/team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

				if (response.ok) {
					toast.success("Команда создана!");
					router.refresh();
				}

				if (!response.ok) {
					toast.error("Команда не создана!");
				}
      } catch (error) {
				console.error("Error creating team:", error);
      } finally {
      }

      setShowModal(false);

      router.refresh();
    }
    

  if (showModal) {
    return (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 1, ease: "easeInOut" }}
        className="w-full relative flex items-center justify-center"
      >
				<Button
           onClick={() => setShowModal(false)}
           className="absolute w-10 h-10 top-4 right-6 text-neutral-700 bg-transparent shadow-none
						rounded-full flex items-center justify-center p-2 hover:text-neutral-400 transition-colors cursor-pointer"
         >
           <IoMdClose size={24} />
         </Button>
        <form
          onSubmit={handleSubmit(handleCreateTeam)}
          className="w-full mt-32 flex 
				flex-col items-center justify-center gap-y-16"
        >
          <Input
            type="text"
            value={teamName}
            {...register("teamName")}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Название Команды"
            className="w-full h-32 p-2 py-4 text-bold border rounded
          bg-transparent border-none shadow-none text-8xl text-black focus:outline-none
          placeholder:text-black text-center"
          />
          +
          {errors.teamName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.teamName.message}
            </p>
          )}
          <Button
            className="w-full py-8 mt-8 bg-[#297878]
							rounded-2xl h-12 text-3xl text-white
							hover:brightness-125 transition-all duration-300 shadow-xl"
            type="submit"
          >
            Создать команду
          </Button>
        </form>
      </motion.div>
    );
	}

  return (
    <motion.div
		className="absolute top-8 px-6 right-6 text-neutral-700 bg-transparent z-20"
		initial={{ y: 50, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		transition={{ duration: 0.4, delay: 1.4, ease: "easeInOut" }}
		>
			<Button
				onClick={() => setShowModal(prev => !prev)}
				className="rounded-xl flex items-center justify-center px-4 py-6 hover:text-neutral-900 shadow-none hover:border-neutral-500 
				transition-colors cursor-pointer border border-neutral-300 text-lg"
			>
				Создать команду
			</Button>
		</motion.div>
  );
}


function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
