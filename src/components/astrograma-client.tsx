"use client";

// import { Chart } from "@astrodraw/astrochart";
import { useEffect, useState } from "react";
import Container from "./container";
import { IntervieweeType } from "@/lib/types";

export function AstrogramaClient({
  id,
  teamId,
  interviewee,
}: {
  id: string;
  teamId: string;
  interviewee: IntervieweeType;
}) {
  const [planets, setPlanets] = useState([]);
  const [cusps, setCusps] = useState([]);
  const [birthChartSVG, setBirthChartSVG] = useState("");
  // const [synastryChartSVG, setSynastryChartSVG] = useState("");

  const { name, dateOfBirth } = interviewee;
	

  const destructureDateOfBirth = (dateString: string) => {
    const date = new Date(dateString);

    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1, // Adding 1 because months are 0-indexed
      day: date.getUTCDate(),
      hour: date.getUTCHours(),
      minute: date.getUTCMinutes(),
    };
  };

	const { year, month, day, hour, minute } = destructureDateOfBirth(dateOfBirth);

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

  useEffect(() => {
    const fetchRapidBirthChart = async () => {
      const url = "https://astrologer.p.rapidapi.com/api/v4/birth-chart";
      const options = {
        method: "POST",
        headers: {
          "x-rapidapi-key":
            "ff0f4947c2msh9348f3f2a1ef925p1085cfjsn868fb2ce6f89",
          "x-rapidapi-host": "astrologer.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Convert body object to string
          subject: {
            name: name,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            longitude: 12.4963655,
            latitude: 41.9027835,
            city: "Roma",
            nation: "IT",
            timezone: "Europe/Rome",
            zodiac_type: "Tropic",
          },
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setBirthChartSVG(result.chart);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRapidBirthChart();
  }, []);

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

    console.log(data);

    // const chart = new Chart("paper", 600, 600);
    // const radix = chart.radix(data);
    // radix.aspects();
    // const transit = radix.transit(data)

    return (
      <div className="mt-12 md:mx-20 xl:mx-36">
        {/* <div id="paper" /> */}
        {birthChartSVG && (
          <div dangerouslySetInnerHTML={{ __html: birthChartSVG }} />
        )}
        {/* {synastryChartSVG && (
						<div dangerouslySetInnerHTML={{ __html: birthChartSVG }} />
					)} */}
      </div>
    );
  }
}
