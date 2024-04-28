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
    // <div className='rounded-lg shadow-md'>
    //   <div className='relative w-full pb-[100%]'>
    //     <Image
    //       className='absolute inset-0 h-full w-full object-cover rounded-t-lg'
    //       src={`https://storage.moonapelab.io/static/moonapes3d/images/${props.apeId}.png`}
    //       alt='Moon Ape Lab 3D Avatar'
    //       layout='fill'
    //     />
    //   </div>
    //   <div className='flex justify-between bg-gray-100 p-2 text-black'>
    //     <span>3D Avatar #{props.apeId}</span>
    //     <Link target='_black' href={`/api/download/${props.apeId}`}>
    //       <FiDownload size={24} />
    //     </Link>
    //   </div>
    // </div>
    <div
      className='max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4  text-black'
      onClick={onClick}
    >
      <Image
        className='w-full h-48 object-cover object-center'
        src={`https://storage.moonapelab.io/static/moonapes3d/images/${apeId}.png`}
        alt='Moon Ape Lab 3D Avatar'
        width={200}
        height={200}
      />
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2'>3D Avatar #{apeId}</h2>
        {/* <p className='text-gray-600'>Some description here </p> */}
        {/* Add other data fields */}
      </div>
    </div>
  );
};

export default AvatarCard;
