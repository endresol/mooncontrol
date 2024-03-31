// components/Navbar.tsx
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-900'>
      <div className='text-xl font-bold'>Moon Control</div>
      <ConnectButton />
    </div>
  );
}
