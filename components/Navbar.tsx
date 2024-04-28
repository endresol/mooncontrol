// components/Navbar.tsx
import { ConnectButton } from "@rainbow-me/rainbowkit";

import Image from "next/image";

export default function Navbar() {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-900'>
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
        <ConnectButton label='Sign In' showBalance={false} />
      </div>
    </div>
  );
}
