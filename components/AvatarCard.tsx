import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiDownload } from "react-icons/fi";

export function AvatarCard(props: {
  apeId:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | Promise<React.AwaitedReactNode>
    | null
    | undefined;
}) {
  const test = 1;

  return (
    <div className='rounded-lg shadow-md overflow-hidden min-h-[300px]'>
      <div className='h-2/3 relative'>
        <Image
          className='h-full w-full object-cover '
          src={`https://storage.moonapelab.io/static/moonapes3d/images/${props.apeId}.png`}
          alt='Moon Ape Lab 3D Avatar'
          layout='fill'
        />
      </div>
      <div className='bg-gray-100 p-2 h-1/3 flex items-center justify-between text-black'>
        <span>{props.apeId}</span>
        <Link target='_black' href={`/api/download/${props.apeId}`}>
          <FiDownload size={24} />
        </Link>
      </div>
    </div>
  );
}
