import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { GiMonkey } from "react-icons/gi";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { buttonVariants } from "@/components/ui/button";

export default async function LeftMenu() {
  const session = await getServerSession(options);

  return (
    <ul>
      <li className='p-2'>
        <Link
          href='/'
          className={`text-xl gap-4 ${buttonVariants({
            variant: "outline",
            size: "full",
          })}`}
        >
          <FaHome />
          <span className='ml-2 text-xl tracking-wider'>Home</span>
        </Link>
      </li>

      <li className='p-2'>
        <Link
          href='/profile'
          className={`text-xl gap-4 ${buttonVariants({
            variant: "outline",
            size: "full",
          })}`}
        >
          <FaUser />
          <span className='ml-2 text-xl tracking-wider'>Profile</span>
        </Link>
      </li>

      <li className='p-2'>
        <Link
          href='/genesis'
          className={`text-xl gap-4 ${buttonVariants({
            variant: "outline",
            size: "full",
          })}`}
        >
          <GiMonkey />
          <span className='ml-2 text-xl tracking-wider'>Genesis 2D</span>
        </Link>
      </li>

      <li className='p-2'>
        <Link
          href='/avatars'
          className={`text-xl gap-4 ${buttonVariants({
            variant: "outline",
            size: "full",
          })}`}
        >
          <GiMonkey />
          <span className='ml-2 text-xl tracking-wider'>3D Avatars</span>
        </Link>
      </li>

      {session ? (
        <li className='p-2'>
          <Link
            href='/api/auth/signout?callbackUrl=/'
            className={`text-xl gap-4 ${buttonVariants({
              variant: "outline",
              size: "full",
            })}`}
          >
            <FaCog />
            <span className='ml-2 text-xl tracking-wider'>Logout</span>
          </Link>
        </li>
      ) : (
        <br />
      )}
    </ul>
  );
}
