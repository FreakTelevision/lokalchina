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
      quote: "I came for factory inspections, but they tracked down a stunning private village tour for my open weekend. Flawless transition from business to leisure.",
      author: "Charles, The USA"
    },
    {
      quote: "Navigating China's apps and WeChat Pay was anxious for me. Their fixer smoothly handled every digital barrier. Pure peace of mind.",
      author: "Kenji, Japan"
    },
    {
      quote: "Instead of tourist traps, I was inside a private heritage site in Shanxi, drinking tea with a local architect. Truly beyond the wall.",
      author: "Maximilian, Germany"
    },
    {
      quote: "Our comfortable dialogue made everything easier. She not only spoke perfect English but totally understood my expectations and aesthetics.",
      author: "Chloé, France"
    },
    {
      quote: "When I fell ill in Guangzhou, their bilingual escort had me seen in a premium private clinic within an hour. Incredibly reliable.",
      author: "Ji-Hoon, South Korea"
    }
  ];

  return (
    <section className={`w-full bg-[#f9f9fb] text-[#111215] pb-28 ${montserrat.className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="w-full border-t border-gray-200/40 mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
          {reviews.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 px-2">
              <span className="text-[#c5a880] text-2xl leading-none" style={{ fontFamily: 'Georgia, serif' }}>&ldquo;</span>
              <p className="text-[12px] md:text-[13px] text-gray-800 font-normal leading-relaxed tracking-wide max-w-[240px]">
                {item.quote}
              </p>
              <span className="text-[#c5a880] text-[11px] tracking-widest italic font-light pt-2">
                &mdash; {item.author}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center mt-20 space-y-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-gray-800" fill="currentColor" />
            ))}
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-400">
            EXCELLENT &bull; TRUSTPILOT
          </span>
        </div>
      </div>
    </section>
  );
}
