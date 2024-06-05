"use client";

// import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { GiMonkey } from "react-icons/gi";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { buttonVariants } from "@/components/ui/button";

const menuLinks = [
  {
    href: "/",
    icon: <FaHome />,
    label: "Home",
    login: null,
  },
  {
    href: "/profile",
    icon: <FaUser />,
    label: "Profile",
    login: true,
  },
  {
    href: "/genesis",
    icon: <GiMonkey />,
    label: "Genesis 2D",
    login: true,
  },
  {
    href: "/avatars",
    icon: <GiMonkey />,
    label: "3D Avatars",
    login: true,
  },
  {
    href: "/api/auth/signout?callbackUrl=/",
    icon: <FaCog />,
    label: "Logout",
    login: true,
  },
];

const LeftMenu: React.FC = () => {
  // const session =  getServerSession(options);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  console.log("pathname", pathname);

  const isActive = (href: string) => pathname === href;

  console.log("--", session, status);

  const filteredMenuItems = menuLinks.filter((item) => {
    if (session) {
      return item.login === true || item.login === null;
    } else {
      return item.login === false || item.login === null;
    }
  });

  return (
    <div className='flex flex-col justify-between h-full'>
      <ul>
        {filteredMenuItems.map((link, index) => (
          <li key={index} className='p-2'>
            <Link
              href={link.href}
              className={`text-xs flex flex-row pl-4 gap-4 group relative overflow-hidden ${buttonVariants(
                {
                  variant: "outlineleft",
                  size: "full",
                }
              )} flex-start ${
                isActive(link.href) ? "bg-slate-700 bg-opacity-70" : ""
              }`}
            >
              {link.icon}
              <span className='ml-2'>{link.label}</span>
              <span className='group-hover:translate-x-4 '>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M14 5l7 7m0 0l-7 7m7-7H3'
                  ></path>
                </svg>
              </span>
            </Link>
          </li>
        ))}

        {!session ? (
          <li className='connectButton__wrapper'>
            <ConnectButton label='Sign In' showBalance={false} />
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default LeftMenu;
