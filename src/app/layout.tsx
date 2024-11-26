import type { Metadata } from "next";
import "./globals.css";
import { Poppins, IBM_Plex_Mono } from "next/font/google";
import ToasterProvider from "@/providers/toaster-provider";
// import Header from "@/components/header/header";
import ConditionalHeader from "@/components/header/conditional-header";


// import ModalProvider from "@/providers/modal-provider";


const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
	variable: '--font-poppins',
});
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
	variable: '--font-ibmPlexMono',
});


export const metadata: Metadata = {
  title: "Complexity",
  description: "Tarot and astrology calculation app between interviewees and interviewers",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	


  return (
			<html className={`${poppins } ${ibmPlexMono}`} lang="en">
				<body >
					<ConditionalHeader />
					{/* <ModalProvider /> */}
					<ToasterProvider />
					{children}

				</body>
			</html>
  );
}
