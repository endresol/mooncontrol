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
    fileName: "MoonApe Lab.blend",
  },
  {
    slug: "mal-diner",
    title: "Blender Scene - DoubleDells Diner",
    description: "Downloadable Blender Scene - DoubleDells Diner",
    mainImage:
      "https://storage.moonapelab.io/static/blender/Diner/0-outside_diner.webp",
    galleryImages: [
      "https://storage.moonapelab.io/static/blender/Diner/1-diner_with_burgs_n_shakes.webp",
      "https://storage.moonapelab.io/static/blender/Diner/2-diner_food_feast.webp",
      "https://storage.moonapelab.io/static/blender/Diner/3-kitchen.webp",
    ],
    fileUrl:
      "https://storage.moonapelab.io/static/blender/Diner/558-664-2259-5486-Diner.blend",
    fileName: "MAL-doubledells-diner.blend",
  },
  {
    slug: "mal-inkz",
    title: "Blender Scene - Inkz Studio",
    description: "Downloadable Blender Scene - Inkz Studio",
    mainImage:
      "https://storage.moonapelab.io/static/blender/Inkz/0-inkz_parlour.webp",
    galleryImages: [
      "https://storage.moonapelab.io/static/blender/Inkz/1-tattoo-frames.webp",
      "https://storage.moonapelab.io/static/blender/Inkz/2-inkz-in-chair.webp",
      "https://storage.moonapelab.io/static/blender/Inkz/3-inkz-counter-pipes.webp",
    ],
    fileUrl:
      "https://storage.moonapelab.io/static/blender/Inkz/456-456-2588-24892-Inkz Studio.blend",
    fileName: "mal-inkz-studio.blend",
  },
  {
    slug: "mal-park",
    title: "Blender Scene - Moonie Park",
    description: "Downloadable Blender Scene - Moonie Park",
    mainImage:
      "https://storage.moonapelab.io/static/blender/MooniePark/0-main-moonie_park.webp",
    galleryImages: [
      "https://storage.moonapelab.io/static/blender/MooniePark/1-bench_seat.webp",
      "https://storage.moonapelab.io/static/blender/MooniePark/2-moonie_park_cinema2.webp",
      "https://storage.moonapelab.io/static/blender/MooniePark/3-moonie_park_cinema.webp",
    ],
    fileUrl:
      "https://storage.moonapelab.io/static/blender/MooniePark/164-6684-5548-65485-Moonie Park.blend",
    fileName: "Moonie Park.blend",
  },
  {
    slug: "mal-control",
    title: "Blender Scene - Control Room",
    description: "Downloadable Blender Scene - Control Room",
    mainImage:
      "https://storage.moonapelab.io/static/blender/ControlRoom/0-control_deck.webp",
    galleryImages: [
      "https://storage.moonapelab.io/static/blender/ControlRoom/1-meteor.webp",
      "https://storage.moonapelab.io/static/blender/ControlRoom/2-lockers_n_suits.webp",
      "https://storage.moonapelab.io/static/blender/ControlRoom/3-control_chair.webp",
    ],
    fileUrl:
      "https://storage.moonapelab.io/static/blender/ControlRoom/123-321-123-432-543-65352-Control Deck.blend",
    fileName: "Control Deck.blend",
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesForClient(): ResourceInfo[] {
  return resources.map(({ fileUrl, ...rest }) => rest);
}
