"use client";

import { useState, useCallback, useEffect } from "react";
import { useGallery } from "@/hooks";
import { getGalleryCategories } from "@/services/gallery";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

export default function GalleryPage() {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const categories = getGalleryCategories();
  const images = useGallery({ category, limit: 50 });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoom(1);
  };
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : i === 0 ? images.length - 1 : i - 1));
    setZoom(1);
  }, [images.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : i === images.length - 1 ? 0 : i + 1));
    setZoom(1);
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goPrev, goNext]);

  const current = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <div className="min-h-screen">
      <section className="section-pad border-b border-accent-secondary/10 bg-bg-card/40">
        <div className="page-container">
          <h1 className="hero-title">Gallery</h1>
          <p className="section-subtitle mt-4 max-w-xl">
            Photos from campus, events, workshops, and fests. Click any image to view full size and browse.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-container">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory(undefined)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              category === undefined
                ? "bg-accent-primary text-bg-main"
                : "bg-bg-card text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-accent-primary text-bg-main"
                  : "bg-bg-card text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={() => openLightbox(index)}
              className="card group block w-full overflow-hidden rounded-xl text-left"
            >
              <div className="aspect-[3/2] w-full bg-bg-main">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <p className="p-2 text-center text-xs text-text-secondary">{img.title ?? img.alt}</p>
            </button>
          ))}
        </div>
        </div>
      </section>

      {/* Lightbox */}
      {current && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-main/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full p-2 text-text-main hover:bg-bg-card"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-accent-secondary/30 bg-bg-card/90 p-3 text-text-main hover:bg-bg-card"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-accent-secondary/30 bg-bg-card/90 p-3 text-text-main hover:bg-bg-card"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center gap-4">
            <div
              className="flex max-h-[80vh] max-w-full items-center justify-center overflow-auto"
              style={{ transform: `scale(${zoom})` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.src}
                alt={current.title ?? current.alt}
                className="max-h-[80vh] max-w-full object-contain"
                draggable={false}
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                className="rounded-lg border border-accent-secondary/30 bg-bg-card px-3 py-2 text-text-main hover:bg-bg-main"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <span className="min-w-[4rem] text-center text-sm text-text-secondary">
                {lightboxIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
                className="rounded-lg border border-accent-secondary/30 bg-bg-card px-3 py-2 text-text-main hover:bg-bg-main"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-text-secondary">{current.title ?? current.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
}
