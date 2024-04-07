// components/Navbar.tsx
import { Button } from "@/components/ui/button";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <div className='flex items-center justify-between p-4 bg-gray-900'>
      <div className='text-xl font-bold'>Moon Control</div>
      <Button size='lg' variant='link'>
        Hello there!
      </Button>
      <ConnectButton />
    </div>
  );
}
