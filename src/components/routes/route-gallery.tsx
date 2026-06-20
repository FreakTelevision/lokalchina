"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RouteImage {
  id: string;
  url: string;
  altEn: string;
  altZh: string;
}

interface RouteGalleryProps {
  images: RouteImage[];
  locale: string;
}

export function RouteGallery({ images, locale }: RouteGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
        No images available
      </div>
    );
  }

  const prev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const currentImage = images[currentIndex];

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted group">
        <img
          src={currentImage.url}
          alt={locale === "zh" ? currentImage.altZh : currentImage.altEn}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={next}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    i === currentIndex
                      ? "bg-white w-4"
                      : "bg-white/60 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all",
                i === currentIndex
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
