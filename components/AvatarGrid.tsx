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
}

const AvatarGrid: React.FC<AvatarCardProps> = ({ avatars }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<number>(0);

  const openModal = (tokenid: number) => {
    setSelectedNFT(tokenid);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex justify-start gap-2 grow flex-wrap'>
      {avatars?.map((avatar) => (
        <>
          <AvatarCard
            key={avatar.id.toString()}
            apeId={avatar.id.toString()}
            onClick={() => openModal(avatar.id)}
          />
          <AvatarModal
            key={avatar.id.toString()}
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
