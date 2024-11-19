import React from "react";
import Link from "next/link";
import Image from "next/image";

interface AvatarCardProps {
  apeId: string;
  onClick: () => void;
  is3d: boolean;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ apeId, onClick, is3d }) => {
  const filepath = is3d
    ? "https://storage.moonapelab.io/static/moonapes3d/images"
    : "https://storage.moonapelab.io/static/moonapes/images";
  return (
    <div
      className="relative bg-white shadow-lg overflow-hidden m-4 border-white border-8 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <Image
        className="object-cover w-full h-44 rounded-xl"
        src={`${filepath}/${apeId}.png`}
        alt={`Moon Ape Lab ${is3d ? " 3D" : " Genesis"} Avatar`}
        width={400}
        height={400}
      />
      <div className="p-2">
        <h2 className="text-l font-semibold text-left text-bison-500">
          {`${is3d ? "3D Avatar" : " Genesis"} #${apeId}`}
        </h2>
      </div>
    </div>
  );
};

export default AvatarCard;
