import React from 'react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export default function Testimonials() {
  const reviews = [
    {
      quote: "I came for factory inspections, they gave me a private village tour for my open weekend. Flawless business-to-leisure.",
      author: "Charles, USA"
    },
    {
      quote: "Navigating China's apps and payments made me anxious. Their fixer handled every digital barrier smoothly. Pure peace of mind.",
      author: "Kenji, Japan"
    },
    {
      quote: "Instead of tourist traps, I was inside a private heritage temple in Shanxi, drinking tea with a local architect. Truly unforgettable.",
      author: "Maximilian, Germany"
    },
    {
      quote: "She spoke perfect English and totally understood my expectations. The dialogue was comfortable, the aesthetics were exactly right.",
      author: "Chloé, France"
    },
    {
      quote: "When I fell ill in Guangzhou, their bilingual escort had me in a premium private clinic within the hour. Incredibly reliable.",
      author: "Ji-Hoon, South Korea"
    }
  ];

  return (
    <section className={`w-full bg-white text-[#111215] pb-24 ${montserrat.className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
          {reviews.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 px-2">
              <span className="text-[#c5a880] text-2xl leading-none" style={{ fontFamily: 'Georgia, serif' }}>&ldquo;</span>
              <p className="text-[12px] md:text-[13px] text-gray-800 font-normal leading-relaxed tracking-wide max-w-[220px]">
                {item.quote}
              </p>
              <span className="text-[#c5a880] text-[11px] tracking-widest italic font-light whitespace-nowrap">
                &mdash; {item.author}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
