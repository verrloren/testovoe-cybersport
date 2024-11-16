import type { Metadata } from "next";
import "./globals.css";
import { Poppins, Schibsted_Grotesk, Andika } from "next/font/google";
import ToasterProvider from "@/providers/toaster-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";
// import Header from "@/components/header/header";
import ConditionalHeader from "@/components/header/conditional-header";


// import ModalProvider from "@/providers/modal-provider";


const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
	variable: '--font-poppins',
});
const andika = Andika({
  weight: ["400", "700"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
	variable: '--font-poppins',
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
	

	const session = await auth();

  return (
    <html className={`${poppins } ${andika}`} lang="en">
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
