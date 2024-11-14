import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardFooter,

  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Image from "next/image";
import usePreviewModal from "@/hooks/use-preview-modal";
import { CardImage } from "./ui/card-image";

interface ListingCardProps {
  hotel: {
    hotel_name: string;
    room_name: string;
    meal: string;
    price: number;
    yandex_price: number;
    yandex_name: string;
    price_diff: number;
    percentage_price_diff: number;
    checkin: string | number | null;
    checkout: string | number | null;
  };
  index: number;
	url: string;
}

function ListingCard({ hotel, index, url }: ListingCardProps) {
  const previewModal = usePreviewModal();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: index % 2 === 0 ? 25 : -25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
        },
      }}
      viewport={{ once: true }}
    >
      <Card
        onClick={() => previewModal.onOpen(hotel)}
        className="overflow-hidden cursor-pointer h-auto -z-50 group shadow-none"
      >
				<div className="relative h-56 w-full">
					<CardImage key={url} url={url} />
				</div>

        <CardHeader>
          <CardTitle className="z-10 text-2xl text-neutral-900 dark:text-neutral-50">
					{hotel.hotel_name}
          </CardTitle>
          <CardDescription className="z-10 text-sm dark:text-neutral-400 text-neutral-600">
						<span className="text-neutral-600 dark:text-neutral-400">{hotel.room_name}</span> <br />
            {/* {hotel.yandex_name} · {hotel.meal} meal plan */}
          </CardDescription>
        </CardHeader>

        <CardFooter className="z-10 text-xl dark:text-neutral-50 text-neutral-900 flex flex-col items-start gap-y-4">
          Ostrovok price: {hotel.price}₽ <br /> Yandex price: {hotel.yandex_price}₽<br />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">Hotels price diff: {hotel.price_diff} · Diff is {Math.floor(hotel.percentage_price_diff) || 0}%</span>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ListingCard;
