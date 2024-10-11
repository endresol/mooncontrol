// components/Navbar.tsx
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import Link from "next/link";

const menuLinks = [
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
    href: "/",
    label: "Home",
    login: null,
  },
  {
    href: "/profile",
    label: "Profile",
    login: true,
  },
  {
    href: "/staking",
    label: "Staking",
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
    <div className="flex items-center justify-center p-4">
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
        <ul className="flex space-x-4">
          {menuLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>
                <span className="inline-block px-4 py-2 bg-white text-bison-300 uppercase text-2xl font-bold rounded-full hover:bg-slate-200 transition-colors">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
