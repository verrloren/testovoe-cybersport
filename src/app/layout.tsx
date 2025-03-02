import "./globals.css";
import type { Metadata } from "next";
import { Tac_One, Poppins } from "next/font/google";

import { Providers, ToasterProvider } from "@/shared";
import { Header } from "@/widgets/header";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: "normal", 
  subsets: ["latin"],
  variable: "--font-poppins",
});

const tactic = Tac_One({
  weight: ["400"],
  style: "normal", 
  subsets: ["latin"],
  variable: "--font-tactic",
});


export const metadata: Metadata = {
  title: "evrz",
  description: "Developer tools for modern web development.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins} ${tactic}`} lang="en">
      <body>
        <Providers>
          <ToasterProvider />
					<Header />
					{children}
        </Providers>
      </body>
    </html>
  );
}
