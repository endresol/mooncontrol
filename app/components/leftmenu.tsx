import Link from "next/link";
import { FaHome, FaUser, FaCog } from "react-icons/fa";

export default function LeftMenu() {
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
        <Link href='/page1' className='flex items-center'>
          <FaCog />
          <span className='ml-2'>Page 1</span>
        </Link>
      </li>

      <li className='p-2 border rounded'>
        <Link href='/page2' className='flex items-center'>
          <FaCog />
          <span className='ml-2'>Page 2</span>
        </Link>
      </li>
    </ul>
  );
}
