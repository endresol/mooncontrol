import React from "react";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import type { ResourceInfo } from "@/lib/resources";

interface ResourceCardProps {
  resource: ResourceInfo;
  isLoggedIn: boolean;
  isHolder: boolean;
  onImageClick: (imageUrl: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isLoggedIn,
  isHolder,
  onImageClick,
}) => {
  const canDownload = isLoggedIn && isHolder;
  const openSeaUrl = "https://opensea.io/collection/moon-ape-lab-3d";

  return (
    <div className="bg-white shadow-lg overflow-hidden border-white border-8 rounded-2xl">
      <div
        className="cursor-pointer"
        onClick={() => onImageClick(resource.mainImage)}
      >
        <Image
          className="object-cover w-full aspect-video rounded-xl"
          src={resource.mainImage}
          alt={resource.title}
          width={600}
          height={340}
        />
      </div>

      <div className="flex gap-2 mt-2 px-1">
        {resource.galleryImages.map((img, i) => (
          <div
            key={i}
            className="flex-1 cursor-pointer rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
            onClick={() => onImageClick(img)}
          >
            <Image
              className="object-cover w-full aspect-square rounded-lg"
              src={img}
              alt={`${resource.title} preview ${i + 1}`}
              width={150}
              height={150}
            />
          </div>
        ))}
      </div>

      <div className="p-4">
        <h2 className="text-xl font-semibold text-bison-500">
          {resource.title}
        </h2>

        {canDownload ? (
          <a
            href={`/api/download/resource/${resource.slug}`}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-bison-500 text-white rounded-xl hover:bg-bison-600 transition-colors"
          >
            <FiDownload />
            Download
          </a>
        ) : (
          <a
            href={openSeaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-bison-500 text-white rounded-xl hover:bg-bison-600 transition-colors"
          >
            Get your 3D Avatar
          </a>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
