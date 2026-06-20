"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const images = [
  { src: "/images/pexels-lwr1999-38098072.jpg", caption: "Yungang Grottoes" },
  { src: "/images/pexels-lwr1999-38098073.jpg", caption: "The Hanging Temple" },
  { src: "/images/pexels-ray-feng-204755709-12035287.jpg", caption: "The Citadel Walls" }
];

export default function ShanxiRouteHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-muted group">
        <Image
          src={currentImage.src}
          alt={currentImage.caption}
          fill
          className="object-cover"
        />
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex(i => i === 0 ? images.length - 1 : i - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              onClick={() => setCurrentIndex(i => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-4' : 'bg-white/60 hover:bg-white/80'}`} />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button key={i} onClick={() => setCurrentIndex(i)} className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === currentIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}>
              <Image src={img.src} alt="" width={80} height={56} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
