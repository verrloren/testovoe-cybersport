import type { Metadata } from "next";
import "./globals.css";
import { Libre_Franklin, Kings, Lancelot, Libre_Baskerville } from "next/font/google";
import ToasterProvider from "@/providers/toaster-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
// import Header from "@/components/header/header";
import ConditionalHeader from "@/components/header/conditional-header";

// import ModalProvider from "@/providers/modal-provider";


const libreFranklin = Libre_Franklin({
  weight: ["400", "500", "600", "700", "800", "900"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
	variable: '--font-libreFranklin',
});
const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
	variable: '--font-libreFranklin',
});
const kings = Kings({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
	variable: '--font-kings',

});
const lancelot = Lancelot({
  weight: "400", // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
	variable: '--font-lancelot',
});


export const metadata: Metadata = {
  title: "Complexity",
  description: "Tarot and astrology calculation app between interviewees and interviewers",
};

// interface HotelData {
// 	hotel_id: string;
// 	room_name: string;
// 	price: number;
// 	meal: string;
// 	yandex_name: string;
// 	yandex_price: number;
// 	price_diff: number;
// 	percentage_price_diff: number;
// 	checkin: string | number | null;
// 	checkout: string | number | null;
// }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	

	const session = await auth();

  return (
    <html className={`${kings } ${libreFranklin} ${lancelot} ${libreBaskerville}`} lang="en">
      <body >
      <ConditionalHeader />

				{/* <ModalProvider /> */}
        <ToasterProvider />

          <SessionProvider session={session}>
						{children}
					</SessionProvider>
      </body>
    </html>
  );
}
