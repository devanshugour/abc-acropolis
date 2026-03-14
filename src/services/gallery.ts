import type { GalleryImage, GalleryFilters } from "@/types";
import { GALLERY_DATA, GALLERY_CATEGORIES } from "@/data/gallery";

export function getGalleryImages(filters?: GalleryFilters): GalleryImage[] {
  let list = [...GALLERY_DATA];
  if (filters?.category) {
    list = list.filter((img) => img.category === filters.category);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (img) =>
        img.alt.toLowerCase().includes(q) ||
        (img.title?.toLowerCase().includes(q) ?? false)
    );
  }
  const limit = filters?.limit ?? list.length;
  const page = (filters?.page ?? 1) - 1;
  return list.slice(page * limit, (page + 1) * limit);
}

export function getGalleryCategories(): readonly string[] {
  return GALLERY_CATEGORIES;
}
