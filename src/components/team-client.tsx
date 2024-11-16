"use client";

import { NewMemberCard } from "./new-member-card";
import { TeamMemberCard } from "./team-member-card"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MemberType, TarotCardType, TeamType } from "@/lib/types";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";

interface TeamClientProps {
  taroCards: TarotCardType[];
	teams: TeamType[];
}

const teamSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
});

type TeamFormData = z.infer<typeof teamSchema>;


export function TeamClient({ taroCards, teams }: TeamClientProps) {

	const { register, handleSubmit, formState: { errors } } = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
  });
  const [teamName, setTeamName] = useState("");
	const [members, setMembers] = useState<MemberType[]>(teams[0]?.members || []);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
	

	const fetchMembers = async () => {
		try {
			const response = await fetch(`/api/team/${teams[0].id}/members`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to fetch members');
			}
			const data = await response.json();
			setMembers(data);
			router.refresh();
		} catch (error) {
			console.error('Error fetching members:', error);
		}
	};

  useEffect(() => {
    if (!userId) {
      router.push('/auth/login');
    }
  }, [userId, router]);

  const handleCreateTeam = async (data: TeamFormData) => {
		const capitalizedTeamName = capitalizeFirstLetter(data.teamName);

    if (userId) {
      try {
        await fetch("/api/team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: capitalizedTeamName, userId }),
        });

        // if (response.ok) {
        //   const newTeam = await response.json();
        //   setTeamState({
        //     ...newTeam,
        //     members: []
        //   });
        // } else {
        //   console.error('Failed to create team');
        // }
      } catch (error) {
        console.error("Error creating team:", error);
      } finally {
        router.refresh();
				toast.success('Team created!')
      }
    } else {
      console.error("User ID is undefined");
    }
  };

	// const teamsId = teams.map((team) => team.id).join(" & ");




  if (!teams || teams.length === 0) {
    return (
      <motion.div 
			initial={{ y: 50, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.4, delay: 1, ease: "easeInOut" }}
			className="w-full flex items-center justify-center">
        
        <form onSubmit={handleSubmit(handleCreateTeam)} className="w-full mt-32 flex 
				flex-col items-center justify-center gap-y-16">
          <Input
            type="text"
            value={teamName}
            {...register('teamName')}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="TeamName"
            className="w-full h-20 p-2 font-lancelot	text-bold border rounded
          bg-transparent border-none text-8xl text-white focus:outline-none
          placeholder:text-white text-center"
          />
          {errors.teamName && <p className="text-red-500 text-xs mt-1">{errors.teamName.message}</p>}
          <Button
            className="w-full  card-background-diff-direction
          rounded-2xl h-14 text-3xl font-lancelot text-white
          hover:brightness-125 transition-all duration-300"
            type="submit"
          >
            <p className="text-radial-gradient-middle">Create team</p>
          </Button>
        </form>
      </motion.div>
    );
  }

  return (
    <div className="w-full h-auto relative flex flex-row items-start mt-10">
      {teams ? (
        <div className="w-full h-auto">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2, ease: "easeInOut" }}
            className="text-5xl 	"
          >
            {teams.map((team) => team.name).join(" & ")}
          </motion.h1>

          <div
            className="w-full mt-8 h-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
						lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
						{members.map((member) => (
							<TeamMemberCard key={member.id} member={member}  />
						))}
            <NewMemberCard teamId={teams[0].id} taroCards={taroCards} onMemberAdded={fetchMembers} />
          </div>
        </div>
      ) : (
        <div>
				</div>
      )}
    </div>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}