"use client";

import { Chart } from "@astrodraw/astrochart";
import { useEffect, useState, useRef } from "react";
import { IntervieweeType, ResultType, TeamType } from "@/lib/types";

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
  const chartRef = useRef<Chart | null>(null);
  const [planets, setPlanets] = useState([]);
  const [cusps, setCusps] = useState([]);

  const percent = Math.floor(Number(result.compatibilityAstroPercent) * 100);
  // const [birthChartSVG, setBirthChartSVG] = useState("");
  // const [synastryChartSVG, setSynastryChartSVG] = useState("");

  // const { name, dateOfBirth, countryOfBirth, cityOfBirth } = interviewee;

  // const destructureDateOfBirth = (dateString: string) => {
  //   const date = new Date(dateString);

  //   return {
  //     year: date.getUTCFullYear(),
  //     month: date.getUTCMonth() + 1,
  //     day: date.getUTCDate(),
  //     hour: date.getUTCHours(),
  //     minute: date.getUTCMinutes(),
  //   };
  // };);

  // const { year, month, day, hour, minute } = destructureDateOfBirth(dateOfBirth.toString()

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
              "API-key": "gn94bgy3ruodcmknf3ob2ieposqld",
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

  // useEffect(() => {
  //   const fetchRapidBirthChart = async () => {
  //     const url = "https://astrologer.p.rapidapi.com/api/v4/birth-chart";
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "x-rapidapi-key":
  //           "ff0f4947c2msh9348f3f2a1ef925p1085cfjsn868fb2ce6f89",
  //         "x-rapidapi-host": "astrologer.p.rapidapi.com",
  //         "Content-Type": "application/json",
  // 				"lang": "RU"
  //       },
  //       body: JSON.stringify({
  //         // Convert body object to string
  //         subject: {
  //           name: name,
  //           year: year,
  //           month: month,
  //           day: day,
  //           hour: hour,
  //           minute: minute,
  //           longitude: 12.4963655,
  //           latitude: 41.9027835,
  //           city: cityOfBirth as string,
  //           nation: "RU",
  //           timezone: "Europe/Rome",
  //           zodiac_type: "Tropic",
  //         },
  //       }),
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       console.log(result);
  //       setBirthChartSVG(result.chart);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchRapidBirthChart();
  // }, []);

  // useEffect(() => {
  //   const fetchRapidSynastry = async () => {
  //     const url = "https://astrologer.p.rapidapi.com/api/v4/synastry-chart";
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "x-rapidapi-key":
  //           "ff0f4947c2msh9348f3f2a1ef925p1085cfjsn868fb2ce6f89",
  //         "x-rapidapi-host": "astrologer.p.rapidapi.com",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         first_subject: {
  //           name: "Paul",
  //           year: 1994,
  //           month: 10,
  //           day: 11,
  //           hour: 9,
  //           minute: 11,
  //           longitude: 12.4963655,
  //           latitude: 41.9027835,
  //           city: "Roma",
  //           nation: "IT",
  //           timezone: "Europe/Rome",
  //           zodiac_type: "Tropic",
  //         },
  //         second_subject: {
  //           name: "Sarah",
  //           year: 1998,
  //           month: 11,
  //           day: 10,
  //           hour: 9,
  //           minute: 0,
  //           longitude: 12.4963655,
  //           latitude: 41.9027835,
  //           city: "Roma",
  //           nation: "IT",
  //           timezone: "Europe/Rome",
  //           zodiac_type: "Tropic",
  //         },
  //       }),
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       console.log('synastry',result);
  // 			setSynastryChartSVG(result.chart);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchRapidSynastry();
  // }, []);

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
    //@ts-ignore
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
