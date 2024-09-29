import type { Metadata } from "next";

// import localFont from "next/font/local";
import { Rubik_Mono_One } from "next/font/google";

import { getServerSession } from "next-auth";
import { Providers } from "./providers";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftMenu from "@/components/LeftMenu";

// const myFont = localFont({ src: "../public/FontsFree-Net-Rockinsoda.ttf" });
const myfont = Rubik_Mono_One({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Studio",
  description: "Generated by Moon Ape Lab",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang='en' className={`${myfont.className}`}>
      <body className={`bg-gray-800`}>
        <Providers session={session}>
          <div
            className='flex flex-col h-screen text-white bg-no-repeat bg-cover my-background-div-id bg-scroll'
            style={{ backgroundImage: `url("/thestudio-bg.png")` }}
          >
            <Navbar />
            <div className='flex flex-1'>
              <div className='w-64 p-4'>
                <LeftMenu />
              </div>
              <div className='flex-1 p-4 bg-gray-800 bg-opacity-30 m-4'>
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
