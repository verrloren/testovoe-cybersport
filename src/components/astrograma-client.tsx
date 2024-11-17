"use client";

import { Chart } from "@astrodraw/astrochart";
import { useEffect, useState } from "react";
import {  ResultType, TeamType } from "@/lib/types";

export function AstrogramaClient({
  id,
  teamId,
  result,
  interviewee,
}: {
  id: string;
  teamId: string;
  result: ResultType;
  interviewee: {
		name: string;
		dateOfBirth: Date;
		countryOfBirth: string;
		cityOfBirth: string;
		team: TeamType;
	},
  team: TeamType;
}) {
  const [planets, setPlanets] = useState([]);
  const [cusps, setCusps] = useState([]);

  const percent = Math.floor(Number(result.compatibilityAstroPercent) * 100);


  useEffect(() => {
    const fetchBackendAPI = async () => {
      const fetchData = {
        id,
        teamId,
      };
      try {
        const apiResponse = await fetch(
          "https://still-weekly-tortoise.ngrok-free.app/astrological_position",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "any_value",
              "API-key": process.env.NEXT_PUBLIC_API_KEY as string,
            },
            body: JSON.stringify(fetchData),
          }
        );

        if (apiResponse.ok) {
          const { planets, cusps } = await apiResponse.json();
          setPlanets(planets);
          setCusps(cusps);
        }
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchBackendAPI();
  }, [id, teamId]);

  

  if (planets.length === 0 || cusps.length === 0) {
    return (
      <div className="w-full h-40 items-center justify-center">
        <p className="text-center text-3xl mt-24">Вангуем...</p>
      </div>
    );
  }
  if (cusps.length === 12) {
    const data = {
      planets: planets,
      cusps: cusps,
    };


    const chart = new Chart("paper", 600, 600, {
			MARGIN: 100
		});
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    const radix = chart.radix(data);
    radix.aspects();

    return (
      <div className="mt-12 w-full h-[50rem] md:mx-20 xl:mx-36 flex flex-row">
        <div className="fixed top-0 left-0" id="paper" />

        <div className="absolute 	xl:max-w-[50rem] left-[45%] flex flex-col items-center gap-y-2">
          <h1 className="text-neutral-950 font-bold text-9xl mb-8">
            {interviewee.name}
          </h1>

          <div className="w-full flex flex-row gap-x-4 items-start">
            <div className="w-full flex flex-col items-start text-start">
              <h1 className="text-neutral-500 text-lg font-light">
                Дата рождения:{" "}
                {interviewee.dateOfBirth.toISOString().slice(0, 10)}
              </h1>
              <h1 className="text-neutral-500 text-lg font-light">
                Город рождения: {interviewee.cityOfBirth}
              </h1>
            </div>
            <div className="w-full flex flex-col items-start">
              <h1 className="text-neutral-500 text-lg font-light">
                Страна Рождения: {interviewee.countryOfBirth}
              </h1>
              <h1 className="text-neutral-500 text-lg font-light ">
                Команда: {interviewee.team.name}
              </h1>
            </div>
          </div>
          <h1 className="text-neutral-800 text-lg mt-4">
            {result.compatibilityAstroDescription}
          </h1>
          <div className="w-full py-6 bg-[#297878] mt-8 flex justify-center items-center rounded-2xl">
            <h1 className="text-white font-bold text-5xl ">
              Совместимость {percent}%
            </h1>
          </div>
        </div>
      </div>
    );
  }
}
