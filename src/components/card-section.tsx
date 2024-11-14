/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import ListingCard from "./listing-card";
import { imgURL } from "@/lib/data";

type HotelData = {
  title: string;
  body: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CardSection({ hotels }: any) {
  const [data, setData] = useState<HotelData>({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((val) => {
        setData(val);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message); // Convert error to string
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="text-3xl text-center mt-32">Loading...</div>;
  if (error) return <div>Error: {error}</div>; // Render error as string
  if (hotels.length === 0) return <div className="my-8">No hotels found</div>; 
  return (
    <div
      className="my-8 grid grid-cols-1 -z-50 sm:grid-cols-2
			md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4 "
    >
      {hotels.map((hotel: any, index: number) => (
				<ListingCard key={data.title} url={imgURL[index]} hotel={hotel} index={2} />
			))}

    </div>
  );
}
