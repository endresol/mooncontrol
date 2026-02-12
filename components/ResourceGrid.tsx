"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import ResourceCard from "@/components/ResourceCard";
import type { ResourceInfo } from "@/lib/resources";

interface ResourceGridProps {
  resources: ResourceInfo[];
  isLoggedIn: boolean;
  isHolder: boolean;
}

const ResourceGrid: React.FC<ResourceGridProps> = ({
  resources,
  isLoggedIn,
  isHolder,
}) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (resources.length === 0) {
    return (
      <div className="text-center py-12 text-bison-400">
        No resources available yet.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.slug}
            resource={resource}
            isLoggedIn={isLoggedIn}
            isHolder={isHolder}
            onImageClick={(url) => setLightboxImage(url)}
          />
        ))}
      </div>

      <Modal
        open={lightboxImage !== null}
        onClose={() => setLightboxImage(null)}
      >
        {lightboxImage && (
          <Image
            src={lightboxImage}
            alt="Resource preview"
            width={900}
            height={600}
            className="rounded-xl object-contain max-h-[80vh]"
          />
        )}
      </Modal>
    </div>
  );
};

export default ResourceGrid;
