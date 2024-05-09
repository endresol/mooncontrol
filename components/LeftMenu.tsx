import { getServerSession } from "next-auth";
import { headers } from "next/headers";
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
  {
    href: "/api/auth/signout?callbackUrl=/",
    icon: <FaCog />,
    label: "Sign in",
    login: false,
  },
];

const getData = async () => {
  const myHeaders = headers();

  return myHeaders;
};

const LeftMenu: React.FC = async () => {
  const session = await getServerSession(options);
  const data = await getData();

  console.log("--", data);

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
              className={`text-xl flex flex-row  pl-4 gap-4  ${buttonVariants({
                variant: "outlineleft",
                size: "full",
              })} flex-start`}
            >
              {link.icon}
              <span className='ml-2 text-xl tracking-wider'>{link.label}</span>
            </Link>
          </li>
        ))}

        {!session ? (
          <ConnectButton label='Sign In' showBalance={false} />
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default LeftMenu;
