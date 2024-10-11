// components/Footer.tsx
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default async function Footer() {
  const session = await getServerSession(options);

  return (
    <footer className="fixed bottom-0 left-0 right-0">
      <div className="wave-layer wave1 bg-indigo-500"></div>
      <div className="wave-layer wave2 bg-indigo-400"></div>
      <div className="wave-layer wave3 bg-indigo-300"></div>
      <div className="footer-content text-white p-6 flex justify-between items-center ">
        {!session ? (
          <ConnectButton label="Login" showBalance={false} />
        ) : (
          <Link
            href="/login"
            className={`${buttonVariants({
              variant: "mal",
              size: "grand",
            })} rounded-full`}
          >
            Login
          </Link>
        )}
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold mb-1">STUDIO</span>
          <a href="https://moonapelab.io" className="text-white text-4xl">
            moonapelab.io
          </a>
        </div>
      </div>
    </footer>
  );
}
