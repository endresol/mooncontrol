// components/Navbar.tsx
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import Image from "next/image";

export default async function Navbar() {
  const session = await getServerSession(options);

  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex items-center'>
        <Image src='/3D_Logo_Final.png' alt='3D Logo' height={75} width={75} />
        <div className='text-4xl tracking-widest font-bold ml-2'>
          The Studio
        </div>
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
      </div>
    </div>
  );
}
