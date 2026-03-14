export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category: string;
  width: number;
  height: number;
}

export type GalleryFilters = {
  category?: string;
  search?: string;
  limit?: number;
  page?: number;
};
