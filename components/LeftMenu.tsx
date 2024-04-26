import { getServerSession } from "next-auth";
import Link from "next/link";
import { FaHome, FaUser, FaCog } from "react-icons/fa";
import { GiMonkey } from "react-icons/gi";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function LeftMenu() {
  const session = await getServerSession(options);

  return (
    <ul>
      <li className='p-2 border rounded mb-2'>
        <Link href='/' className='flex items-center'>
          <FaHome />
          <span className='ml-2 text-xl tracking-wider'>Home</span>
        </Link>
      </li>

      <li className='p-2 border rounded mb-2'>
        <Link href='/profile' className='flex items-center'>
          <FaUser />
          <span className='ml-2 text-xl tracking-wider'>Profile</span>
        </Link>
      </li>

      <li className='p-2 border rounded mb-2'>
        <Link href='/genesis' className='flex items-center'>
          <GiMonkey />
          <span className='ml-2 text-xl tracking-wider'>Genesis 2D</span>
        </Link>
      </li>

      <li className='p-2 border rounded mb-2'>
        <Link href='/avatars' className='flex items-center'>
          <GiMonkey />
          <span className='ml-2 text-xl tracking-wider'>3D Avatars</span>
        </Link>
      </li>

      {session ? (
        <li className='p-2 border rounded mb-2'>
          <Link
            href='/api/auth/signout?callbackUrl=/'
            className='flex items-center'
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
