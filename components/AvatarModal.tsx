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
      <div className="flex min-w-2xl z-50">
        <div className="w-2/3 h-auto">
          <Image
            src={`https://storage.moonapelab.io/static/moonapes3d/images/${avatarId}.png`}
            alt={`3D Avatar #${avatarId}`}
            width={600}
            height={600}
            className="h-auto rounded-2xl"
          />
        </div>
        <div className="w-1/3 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl">Moon Ape 3D Avatar</h2>
            <div className="text-4xl">#{avatarId}</div>
          </div>
          <div className="flex flex-col gap-4">
            <div>Downloads: </div>
            <Link
              className={`text-xl gap-4 ${buttonVariants({
                variant: "outline",
                size: "lg",
              })}`}
              href={`/api/download/LAB`}
            >
              MAL LAB file (500mb)
              <FiDownload size={24} />
            </Link>
            <Link
              className={`text-xl gap-4 ${buttonVariants({
                variant: "outline",
                size: "lg",
              })}`}
              href={`/api/download/${avatarId}`}
            >
              3D Blender file
              <FiDownload size={24} />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AvatarModal;
