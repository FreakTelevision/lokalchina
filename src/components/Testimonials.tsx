import React from 'react';
import { Star } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export default function Testimonials() {
  const reviews = [
    {
      quote: "LokalChina is a revolution. They seamlessly blended my enterprise sourcing expedition with a bespoke luxury tour. One platform, zero friction.",
      author: "Charles, The USA"
    },
    {
      quote: "Navigating China's digital wall was my biggest anxiety. Their 24/7 on-the-ground fixers handled everything smartly. Pure peace of mind.",
      author: "Kenji, Japan"
    },
    {
      quote: "They took us far beyond the tourist wall. We accessed private heritage sites and insider experiences that money alone cannot buy elsewhere.",
      author: "Maximilian, Germany"
    },
    {
      quote: "Their native bilingual dialogue and elite communication are flawless. They truly understand the nuances and expectations of premium clients.",
      author: "Chloé, France"
    },
    {
      quote: "Exceptional cross-border concierge. From tailored travel plans to private medical accompaniment in Guangzhou, they are the ultimate in-country stewards.",
      author: "Ji-Hoon, South Korea"
    }
  ];

  return (
    <section className={`w-full bg-[#f9f9fb] text-[#111215] pb-24 ${montserrat.className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6 items-start">
          {reviews.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-6 px-3">
              <span className="text-[#c5a880] text-3xl leading-none" style={{ fontFamily: 'Georgia, serif' }}>&ldquo;</span>
              <p className="text-[10px] md:text-[11px] text-gray-800 font-normal leading-relaxed tracking-[0.08em] max-w-[220px]">
                {item.quote}
              </p>
              <span className="text-[#c5a880] text-[11px] tracking-widest italic font-light">
                {item.author}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center mt-20 space-y-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-gray-800" fill="currentColor" />
            ))}
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-400">
            EXCELLENT ★ TRUSTPILOT
          </span>
        </div>
      </div>
    </section>
  );
}
