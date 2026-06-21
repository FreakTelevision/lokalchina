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
      quote: "Navigating China's apps and payments used to make me anxious. This time, someone took care of every digital barrier for me — payments, bookings, everything. Pure peace of mind.",
      author: "Chloé, France"
    },
    {
      quote: "Instead of tourist traps, I was inside a private heritage temple in Shanxi, drinking tea with a local architect. Truly unforgettable.",
      author: "Maximilian, Germany"
    },
    {
      quote: "My guide showed me exactly where each scene from Black Myth was filmed. Standing inside the real temple, I realized how faithfully the developers had recreated every beam and statue.",
      author: "Henrik, Sweden"
    },
    {
      quote: "I needed a CT scan in Guangzhou. Someone helped me book the appointment, handled the hospital registration, and translated every word at the clinic. I didn't have to worry about a thing.",
      author: "Kenji, Japan"
    }
  ];

  return (
    <section className={`w-full bg-white text-[#111215] pb-16 ${montserrat.className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {reviews.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center px-2 h-full">
              <span className="text-[#c5a880] text-2xl leading-none mb-4" style={{ fontFamily: 'Georgia, serif' }}>&ldquo;</span>
              <p className="text-[12px] md:text-[13px] text-gray-800 font-normal leading-relaxed tracking-wide max-w-[220px] flex-1">
                {item.quote}
              </p>
              <span className="text-[#c5a880] text-[11px] tracking-widest italic font-light whitespace-nowrap mt-4">
                &mdash; {item.author}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
