import type { Metadata } from "next";

import localFont from "next/font/local";

import { getServerSession } from "next-auth";

import { Providers } from "./providers";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeftMenu from "@/components/LeftMenu";

const myFont = localFont({ src: "../public/FontsFree-Net-Rockinsoda.ttf" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <body className={`${myFont.className} bg-gray-800`}>
        <Providers session={session}>
          <div className='flex flex-col h-screen  text-white'>
            <Navbar />

            <div className='flex flex-1'>
              <div className='w-64 p-4'>
                <LeftMenu />
              </div>

              <div className='flex-1 p-4'>{children}</div>
            </div>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
