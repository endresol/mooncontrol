export type Resource = {
  slug: string;
  title: string;
  description: string;
  mainImage: string;
  galleryImages: string[];
  fileUrl: string; // server-side only — never sent to client
  fileName: string;
};

// Client-safe subset (excludes fileUrl)
export type ResourceInfo = Omit<Resource, "fileUrl">;

export const resources: Resource[] = [
  {
    slug: "mal-lab",
    title: "Blender Scene - The Lab",
    description: "Downloadable Blender Scene - The Lab",
    mainImage:
      "https://storage.moonapelab.io/static/blender/moon-ape-lab/lab-main.webp",
    galleryImages: [
      "https://storage.moonapelab.io/static/blender/moon-ape-lab/lab-1.webp",
      "https://storage.moonapelab.io/static/blender/moon-ape-lab/lab-2.webp",
      "https://storage.moonapelab.io/static/blender/moon-ape-lab/lab-3.webp",
    ],
    fileUrl:
      "https://storage.moonapelab.io/static/blender/moon-ape-lab/moonLabBuild For The Apes.blend",
    fileName: "moon-ape-lab.blend",
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesForClient(): ResourceInfo[] {
  return resources.map(({ fileUrl, ...rest }) => rest);
}
