// NFTModal.tsx
import React from "react";
import Image from "next/image";
import Modal from "./Modal";

import { buttonVariants } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

interface AvatarModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  avatarId: number;
}

const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onRequestClose,
  avatarId,
}) => {
  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <div className='flex min-w-2xl'>
        <div className='w-2/3 h-auto border-slate-500 border-2 rounded-md'>
          <Image
            src={`https://storage.moonapelab.io/static/moonapes3d/images/${avatarId}.png`}
            alt={`3D Avatar #${avatarId}`}
            width={1200}
            height={1200}
            className='h-auto rounded-md w-full'
          />
        </div>
        <div className='w-1/3 p-4 flex flex-col justify-between'>
          <div>
            <h2 className='text-3xl'>Moon Ape 3D Avatar</h2>
            <div className='text-4xl'>#{avatarId}</div>
          </div>
          <div>
            <div>Download 3D Avatar Blender file</div>
            <Link
              className={`text-xl gap-4 ${buttonVariants({
                variant: "outline",
                size: "lg",
              })}`}
              href={`/api/download/${avatarId}`}
            >
              Download
              <FiDownload size={24} />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AvatarModal;
