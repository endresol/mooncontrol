import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface AvatarCardProps {
  apeId: string;
  onClick: () => void;
  is3d: boolean;
  isStaked: boolean;
  stakedAt: Date | null;
  StakeClick: () => void;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  apeId,
  onClick,
  is3d,
  isStaked,
  stakedAt,
  StakeClick,
}) => {
  const filepath = is3d
    ? "https://storage.moonapelab.io/static/moonapes3d/images"
    : "https://storage.moonapelab.io/static/moonapes/images";

  return (
    <div
      className="relative bg-white shadow-lg overflow-hidden m-4 border-white border-8 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 z-5">
        {isStaked ? (
          <div className="group relative">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="absolute -top-8 right-0 hidden group-hover:block bg-black text-white text-xs p-1 rounded whitespace-nowrap">
              Staked: {stakedAt?.toString()}
            </span>
          </div>
        ) : (
          <button
            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-900 hover:text-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              StakeClick();
            }}
          >
            S
          </button>
        )}
      </div>
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
