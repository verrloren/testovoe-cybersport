import type { Metadata } from "next";
import "./globals.css";
import { Poppins, IBM_Plex_Mono } from "next/font/google";
import ToasterProvider from "@/providers/toaster-provider";
import ConditionalHeader from "@/components/header/conditional-header";
import Providers from "@/providers/providers";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
  variable: "--font-poppins",
});
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"], // if single weight, otherwise you use array like [400, 500, 700],
  style: "normal", // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ["latin"],
  variable: "--font-ibmPlexMono",
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
    <html className={`${poppins} ${ibmPlexMono}`} lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.history.scrollRestoration) {
                window.history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body>
        {/* <Providers> */}
          {/* <ConditionalHeader /> */}
          {/* <ModalProvider /> */}
          {/* <ToasterProvider /> */}
          {children}
        {/* </Providers> */}
      </body>
    </html>
  );
}
