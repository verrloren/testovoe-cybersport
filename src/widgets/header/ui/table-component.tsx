"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { matchesApi } from "@/features/matches/api/api";
import { ClientLoader } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Match } from "@/shared/model/types";

function getStatusBg(status: string) {
  switch (status) {
    case "Ongoing":
      return "bg-green";
    case "Finished":
      return "bg-pink";
    case "Scheduled":
    default:
      return "bg-orange";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "Ongoing":
      return "Live";
    case "Finished":
      return "Finished";
    case "Scheduled":
    default:
      return "Match preparing";
  }
}

export function TableComponent() {
  const { data: matches, error, isLoading } = useQuery(matchesApi.getMatches());

  if (isLoading) return <ClientLoader />;
  if (error) return <div>Error loading matches</div>;

  return (
    <>
      {matches?.map((match: Match, i) => (
        <Collapsible key={i} className="w-full bg-dark rounded py-4">
          <CollapsibleTrigger className="w-full">
            <div className="flex justify-between items-center px-8 py-2">
              {/* First Team  */}
              <div className="w-1/3 flex flex-row items-center justify-start gap-x-2">
								<Image width={24} height={24} src="/images/team-icon.svg" alt="team-icon" />
                <p className="text-white font-semibold text-xl">
                  {match.awayTeam.name}
                </p>
              </div>

              {/* Score and Status in the middle */}
              <div className="w-1/3 text-center">
                <p className="text-white text-2xl">
                  {match.awayScore} : {match.homeScore}
                </p>
                <div
                  className={`mx-auto mt-1 px-2 py-1 text-white rounded ${getStatusBg(
                    match.status
                  )}`}
                  style={{ width: "fit-content" }}
                >
                  {getStatusLabel(match.status)}
                </div>
              </div>

              {/* Second Team  */}
              <div className="w-1/3 flex flex-row items-center justify-end gap-x-2">
                <p className="text-white font-semibold text-xl">
                  {match.homeTeam.name}
                </p>
								<Image width={24} height={24} src="/images/team-icon.svg" alt="team-icon" />
              </div>
            </div>
          </CollapsibleTrigger>



          <CollapsibleContent className="px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-x-4">
              {/* TEAM DETAILS */}
              {[ 
                { team: match.awayTeam },
                { team: match.homeTeam },
              ].map(({ team }, idx) => (
                <div key={idx} className="w-full sm:w-1/2">
									{/* PLAYERS */}
                  <div className="w-full h-14 flex flex-col sm:flex-row gap-x-2">
                    {team.players.map((player, j) => (
                      <div key={j} className="w-full flex items-center bg-darkGrey px-3 rounded-[4px] text-sm">
                        <div className="flex items-center gap-x-1">
													<Image
														src="/images/avatar_global.svg"
														width={24}
														height={24}
														alt="avatar"
													/>
													<span className=" text-white text-sm">{player.username}</span>
												</div>
                        <span className="ml-auto text-white">
												<span className="text-[#fafafa]/40 ">Убийств: </span> {player.kills}
                        </span>
                      </div>
                    ))}
                  </div>
									{/* TEAM DETAILS */}
                  <div className="bg-darkGrey flex items-center justify-between h-14 text-white px-20 my-2 rounded-[4px] text-sm">
                    <div><span className="text-[#fafafa]/40 pr-1">Points:</span> +{team.points}</div>
                    <div><span className="text-[#fafafa]/40 pr-1">Место:</span> {team.place}</div>
                    <div><span className="text-[#fafafa]/40 pr-1">Всего убийств:</span> {team.total_kills}</div>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </>
  );
}