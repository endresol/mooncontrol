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
          <span className='ml-2'>Home</span>
        </Link>
      </li>

      <li className='p-2 border rounded mb-2'>
        <Link href='/profile' className='flex items-center'>
          <FaUser />
          <span className='ml-2'>Profile</span>
        </Link>
      </li>

      <li className='p-2 border rounded mb-2'>
        <Link href='/settings' className='flex items-center'>
          <FaCog />
          <span className='ml-2'>Settings</span>
        </Link>
      </li>

      <li className='p-2 border rounded mb-2'>
        <Link href='/genesis' className='flex items-center'>
          <GiMonkey />
          <span className='ml-2'>Genesis</span>
        </Link>
      </li>

      <li className='p-2 border rounded mb-2'>
        <Link href='/avatars' className='flex items-center'>
          <GiMonkey />
          <span className='ml-2'>3d Avatars</span>
        </Link>
      </li>

      {session ? (
        <li className='p-2 border rounded mb-2'>
          <Link
            href='/api/auth/signout?callbackUrl=/'
            className='flex items-center'
          >
            <FaCog />
            <span className='ml-2'>logout</span>
          </Link>
        </li>
      ) : (
        <li className='p-2 border rounded mb-2'>
          <Link
            href='/api/auth/signin?callbackUrl=/'
            className='flex items-center'
          >
            <FaCog />
            <span className='ml-2'>login</span>
          </Link>
        </li>
      )}
    </ul>
  );
}
