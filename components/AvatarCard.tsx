import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";

interface AvatarCardProps {
  apeId: string;
  onClick: () => void;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ apeId, onClick }) => {
  return (
    <div
      className=' bg-slate-700 shadow-lg overflow-hidden m-4  text-black  border-slate-500 border-2 rounded-md cursor-pointer transition-all duration-300 hover:scale-105'
      onClick={onClick}
    >
      <Image
        className='w-48 h-48 object-cover object-center '
        src={`https://storage.moonapelab.io/static/moonapes3d/images/${apeId}.png`}
        alt='Moon Ape Lab 3D Avatar'
        width={200}
        height={200}
      />
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2 text-center text-white'>
          3D Avatar #{apeId}
        </h2>
        {/* <p className='text-gray-600'>Some description here </p> */}
        {/* Add other data fields */}
      </div>
    </div>
  );
};

export default AvatarCard;
