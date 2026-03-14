import type { GalleryImage } from "@/types";

const categories = ["Campus", "Events", "Workshops", "Fest"] as const;

function buildGalleryImage(
  id: string,
  seed: string,
  alt: string,
  category: string,
  title?: string
): GalleryImage {
  return {
    id,
    src: `https://picsum.photos/seed/${seed}/600/400`,
    alt,
    title,
    category,
    width: 600,
    height: 400,
  };
}

export const GALLERY_DATA: GalleryImage[] = [
  ...Array.from({ length: 12 }, (_, i) =>
    buildGalleryImage(
      `gal-${i + 1}`,
      `campus${i + 1}`,
      `Campus view ${i + 1}`,
      "Campus",
      `Campus ${i + 1}`
    )
  ),
  ...Array.from({ length: 12 }, (_, i) =>
    buildGalleryImage(
      `gal-evt-${i + 1}`,
      `event${i + 1}`,
      `Event ${i + 1}`,
      "Events",
      `Event ${i + 1}`
    )
  ),
  ...Array.from({ length: 8 }, (_, i) =>
    buildGalleryImage(
      `gal-ws-${i + 1}`,
      `workshop${i + 1}`,
      `Workshop ${i + 1}`,
      "Workshops",
      `Workshop ${i + 1}`
    )
  ),
  ...Array.from({ length: 8 }, (_, i) =>
    buildGalleryImage(
      `gal-fest-${i + 1}`,
      `fest${i + 1}`,
      `Fest ${i + 1}`,
      "Fest",
      `Fest ${i + 1}`
    )
  ),
];

export const GALLERY_CATEGORIES: readonly string[] = categories;
