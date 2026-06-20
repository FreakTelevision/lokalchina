import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Compass, Calendar, ArrowRight } from 'lucide-react';

export default function ShanxiRouteHero({ locale }: { locale: string }) {
  const images = [
    { src: "/images/pexels-ray-feng-204755709-12035287.jpg", alt: "Ancient City Wall during Golden Hour", caption: "The Citadel Walls" },
    { src: "/images/pexels-lwr1999-38098072.jpg", alt: "Yungang Grottoes Monumental Buddha", caption: "Yungang Grottoes" },
    { src: "/images/pexels-lwr1999-38098073.jpg", alt: "Hanging Temple Cliffside Architecture", caption: "The Hanging Temple" },
  ];

  return (
    <section className="w-full bg-[#0b0c10] text-[#f9f9fb] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-[#c5a880] text-[11px] tracking-[0.25em] uppercase font-medium">
            <Compass className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Curated Pilgrimage</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-light tracking-wide leading-tight text-white">
            Shanxi — Black Myth: Wukong Ancient Architecture Pilgrimage
          </h2>
          <div className="flex items-center gap-4 pt-2 text-gray-400 text-xs tracking-wider">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#c5a880]" /> 6 Days / 5 Nights
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>Immersive Culture &amp; History</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-[16/10] w-full overflow-hidden bg-[#16171a] group">
              <div className="relative w-full h-full transition-all duration-700 ease-out transform group-hover:scale-105 brightness-[92%] contrast-[105%] saturate-[85%]">
                <Image src={img.src} alt={img.alt} fill sizes="(max-w-768px) 100vw, 33vw" className="object-cover" priority={idx === 0} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              </div>
              <div className="absolute bottom-4 left-5 z-10 space-y-1">
                <span className="text-[10px] text-[#c5a880] tracking-widest uppercase block">0{idx + 1} // CHAPTER</span>
                <p className="text-xs text-gray-200 tracking-widest font-light uppercase">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-800">
          <p className="text-[11px] text-gray-400 max-w-md font-light leading-relaxed tracking-wide">
            Delve deep into the actual wooden structural wonders that inspired the mythical landscape. An exclusive, expert-guided traversal behind the screen.
          </p>
          <Link href={`/${locale}/routes/shanxi-black-myth-pilgrimage`} className="flex items-center gap-2 text-white hover:text-[#c5a880] transition-colors duration-300 text-xs tracking-[0.2em] uppercase font-light group">
            Explore Itinerary <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
