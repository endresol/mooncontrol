import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiDownload } from "react-icons/fi";

export function AvatarCard(props: { apeId: string }) {
  const test = 1;

  return (
    <div className='rounded-lg shadow-md'>
      <div className='relative w-full pb-[100%]'>
        <Image
          className='absolute inset-0 h-full w-full object-cover rounded-t-lg'
          src={`https://storage.moonapelab.io/static/moonapes3d/images/${props.apeId}.png`}
          alt='Moon Ape Lab 3D Avatar'
          layout='fill'
        />
      </div>
      <div className='flex justify-between bg-gray-100 p-2 text-black'>
        <span>3D Avatar #{props.apeId}</span>
        <Link target='_black' href={`/api/download/${props.apeId}`}>
          <FiDownload size={24} />
        </Link>
      </div>
    </div>
  );
}
