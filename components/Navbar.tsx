// components/Navbar.tsx
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import Link from "next/link";

const menuLinks = [
  {
    href: "/",
    label: "Home",
    login: null,
  },
  {
    href: "/avatars",
    label: "3D MAL",
    login: true,
  },
  {
    href: "/genesis",
    label: "2D MAL",
    login: true,
  },
  {
    href: "/staking",
    label: "Staking",
    login: true,
  },
  {
    href: "/resources",
    label: "Resources",
    login: true,
  },
  {
    href: "/profile",
    label: "Profile",
    login: true,
  },
  // {
  //   href: "/api/auth/signout?callbackUrl=/",
  //   icon: <FaCog />,
  //   label: "Logout",
  //   login: true,
  // },
];

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <header className="sticky top-0 z-50 h-32">
      {/* <div className="headerbackground wave-layer-top inset-0 z-10 h-full"></div> */}
      <div className=" relative flex items-center justify-center p-4 z-20">
        {/* <div className='flex items-center'>
        <Image src='/3D_Logo_Final.png' alt='3D Logo' height={75} width={75} />
        <div className='text-2xl ml-2'>The Studio</div>
      </div>
      <div className='flex items-center space-x-4'>
        <div className=''>
          <Image
            src='/wallet-guard-logo.png'
            alt='Wallet Guard'
            height={30}
            width={100}
            className=''
          />
        </div>
      </div> */}
        <nav>
          <ul className="flex space-x-4 gap-6">
            {menuLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  <span className="inline-block px-8 text-center py-3 bg-white text-bison-300 uppercase text-3xl font-bold rounded-3xl hover:bg-bison-200 hover:text-bison-500 transition-colors">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
