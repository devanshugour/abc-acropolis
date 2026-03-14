"use client";

import { useMemo } from "react";
import type { GalleryFilters } from "@/types";
import { getGalleryImages } from "@/services/gallery";

export function useGallery(filters?: GalleryFilters) {
  return useMemo(() => getGalleryImages(filters), [filters?.category, filters?.search, filters?.page, filters?.limit]);
}
