"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Users, Star, ShieldCheck, MapPin } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export default function ShanxiRoutePage() {
  const priceTier: { [key: number]: number } = {
    1: 4630,
    2: 2523,
    3: 1821,
    4: 1470
  };

  const [travelers, setTravelers] = useState<number>(2);
  const [startDate, setStartDate] = useState<string>('');

  const currentPricePerPerson = priceTier[travelers];
  const totalPrice = currentPricePerPerson * travelers;

  const shanxiImages = [
    { src: "/images/pexels-ray-feng-204755709-12035287.jpg", caption: "The Citadel Walls" },
    { src: "/images/pexels-lwr1999-38098072.jpg", caption: "Yungang Grottoes" },
    { src: "/images/pexels-lwr1999-38098073.jpg", caption: "The Hanging Temple" }
  ];

  return (
    <div className={`w-full min-h-screen bg-white text-[#111215] ${montserrat.className}`}>
      {/* Dark image gallery */}
      <section className="w-full bg-[#0b0c10] pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {shanxiImages.map((img, idx) => (
              <div key={idx} className="relative aspect-[16/10] w-full overflow-hidden bg-[#16171a] group">
                <div className="relative w-full h-full transition-all duration-700 ease-out brightness-[92%] contrast-[105%] saturate-[85%]">
                  <Image src={img.src} alt={img.caption} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>
                <div className="absolute bottom-4 left-5 z-10 space-y-0.5">
                  <span className="text-[9px] text-[#c5a880] tracking-widest uppercase block">0{idx + 1} // CHAPTER</span>
                  <p className="text-xs text-gray-200 tracking-widest font-light uppercase">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-2xl">
            <p className="text-[12px] text-gray-400 font-light leading-relaxed tracking-wide">
              Delve deep into the actual wooden structural wonders that inspired the mythical landscape. An exclusive, expert-guided traversal behind the screen.
            </p>
          </div>
        </div>
      </section>

      {/* White detail + booking */}
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-[#f5f5f7] px-3 py-1 rounded-full text-[11px] text-gray-600 font-medium tracking-wide">
                <MapPin className="w-3 h-3 text-[#c5a880]" /> Datong
              </span>
              <span className="bg-[#f5f5f7] px-3 py-1 rounded-full text-[11px] text-gray-600 font-medium tracking-wide">History &amp; Architecture</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-normal tracking-wide text-gray-900 leading-tight">
              Shanxi — Black Myth: Wukong Ancient Architecture Pilgrimage, 6 Days
            </h1>
            <div className="bg-[#f9f9fb] rounded-xl p-5 border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-[#c5a880] stroke-none" />))}
                  <span className="text-xs font-semibold text-gray-800 ml-1">5.0</span>
                  <span className="text-[11px] text-gray-400 font-light tracking-wide">(Verified Explorer)</span>
                </div>
              </div>
              <p className="text-[12px] md:text-[13px] text-gray-700 font-normal leading-relaxed italic">
                &ldquo;An incredible pilgrimage. Our guide provided a masterclass breakdown, seamlessly overlaying the exact shrines and architectural masterpieces featured in Black Myth: Wukong with their real Tang and Song Dynasty history. Absolute peace of mind for a solo deep-dive traveler.&rdquo;
              </p>
              <div className="text-[10px] tracking-widest text-[#c5a880] uppercase font-light">&mdash; Edward, United Kingdom</div>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-gray-500 font-medium tracking-wide border-t border-gray-100">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400 stroke-[1.5]" /> 6 Days</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-gray-400 stroke-[1.5]" /> Max 4 people</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-semibold text-gray-500 tracking-wider uppercase">Moderate Difficulty</span>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm sticky top-6">
            <div className="space-y-1 mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-medium tracking-tight text-gray-900">${currentPricePerPerson.toLocaleString()}</span>
                <span className="text-xs text-gray-400 tracking-wide">/ person</span>
              </div>
              <p className="text-[11px] text-gray-400 italic">Current rate based on {travelers} {travelers === 1 ? 'traveler' : 'travelers'}</p>
            </div>
            <div className="space-y-4 mb-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 tracking-wide block">Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 font-medium focus:outline-none focus:border-[#c5a880] transition-colors" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 tracking-wide block">Number of Travelers</label>
                <select value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-800 font-medium focus:outline-none focus:border-[#c5a880] transition-colors">
                  <option value={1}>1 traveler</option>
                  <option value={2}>2 travelers</option>
                  <option value={3}>3 travelers</option>
                  <option value={4}>4 travelers (Max)</option>
                </select>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 space-y-3 mb-6">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>${currentPricePerPerson.toLocaleString()} × {travelers}</span>
                <span className="font-medium text-gray-700">${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs font-semibold text-gray-900">Total</span>
                <span className="text-xl font-semibold tracking-tight text-gray-900">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full bg-[#111215] text-white hover:bg-[#c5a880] rounded-xl py-3 text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300 shadow-sm">Book Now</button>
            <div className="flex items-center gap-2 justify-center mt-4 text-[11px] text-gray-400 font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>No full prepayment required. Cancel free within 72 hrs.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
