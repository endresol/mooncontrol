// components/Footer.tsx
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default async function Footer() {
  const session = await getServerSession(options);
  const waves = "/waves-bottom.png";

  return (
    <footer className="mt-auto z-50">
      <div className="footerbackground wave-layer w-full flex flex-col justify-end min-h-[200px] z-15">
        <div className="footer-content text-white p-6 flex justify-between items-center ">
          {!session ? (
            <ConnectButton label="Login" showBalance={false} />
          ) : (
            <>
              <Link className="z-20" href="/api/auth/signout?callbackUrl=/">
                <span className="inline-block min-w-44 text-center py-3 bg-white text-bison-300 uppercase text-2xl font-bold rounded-3xl hover:bg-bison-200 hover:text-bison-500 transition-colors z-20">
                  Logout
                </span>
              </Link>
            </>
          )}
          <div className="flex flex-col items-center z-20">
            <span className="text-4xl font-bold mb-1">STUDIO</span>
            <a href="https://moonapelab.io" className="text-white text-4xl">
              moonapelab.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
