import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";

interface AvatarCardProps {
  apeId: string;
  onClick: () => void;
  is3d: boolean;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ apeId, onClick, is3d }) => {
  const filepath = is3d ? "https://storage.moonapelab.io/static/moonapes3d/images" : "https://storage.moonapelab.io/static/moonapes/images";
  return (
    <div
      className='relative bg-slate-700 shadow-lg overflow-hidden m-4 border-slate-500 border-2 rounded-md cursor-pointer transition-all duration-300 hover:scale-105'
      onClick={onClick}
    >
      <Image
        className='object-cover w-full h-56'
        src={`${filepath}/${apeId}.png`}
        alt={`Moon Ape Lab ${is3d ? " 3D" : " Genesis"} Avatar`}
        width={400}
        height={400}
      />
      <div className='p-4 '>
        <h2 className='text-xl font-semibold mb-2 text-center text-white'>
        {`${is3d ? "3D Avatar" : " Genesis"} #${apeId}`} 
        </h2>
        {/* <p className='text-gray-600'>Some description here </p> */}
        {/* Add other data fields */}
      </div>
    </div>
  );
};

export default AvatarCard;
