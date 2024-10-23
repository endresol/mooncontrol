"use client";

import React, { useState } from "react";

import AvatarCard from "./AvatarCard";
import AvatarModal from "./AvatarModal";

type avatar = {
  id: number;
  address: string | null;
};

interface AvatarCardProps {
  avatars: avatar[];
  is3d: boolean;
}

const AvatarGrid: React.FC<AvatarCardProps> = ({ avatars, is3d }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<number>(0);

  const openModal = (tokenid: number) => {
    if (is3d) {
      setSelectedNFT(tokenid);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-2 md:grid-cols-2">
      {avatars?.map((avatar) => (
        <>
          <AvatarCard
            key={avatar.id.toString()}
            apeId={avatar.id.toString()}
            onClick={() => openModal(avatar.id)}
            is3d={is3d}
          />
          <AvatarModal
            key={`m-${avatar.id.toString()}`}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            avatarId={selectedNFT}
          />
        </>
      ))}
    </div>
  );
};

export default AvatarGrid;
