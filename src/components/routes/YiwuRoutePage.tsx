"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Star, Calendar, Users, Check, X, FileText, Building2 } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['300','400','500','600'] });

const SOURCING_CONFIG = { days: 5, verifiedFactories: 6, includedBreakfasts: 4, includedLunches: 4, includedDinners: 1 };

export default function YiwuRoutePage() {
  const [travelers] = useState(2);

  const galleryImages = [
    { id: 'factory-floor', src: '/images/routes/yiwu/factory-1.jpg', caption: 'Advanced Manufacturing Inspection', filterClass: 'brightness-[93%] contrast-[102%] saturate-[85%]' },
    { id: 'logistics-hub', src: '/images/routes/yiwu/original-yiwu-hub.jpg', caption: 'Yiwu International Freight Hub', filterClass: 'brightness-[96%] contrast-[100%] saturate-[95%]' },
    { id: 'industrial', src: '/images/routes/yiwu/factory-3.jpg', caption: 'Zhejiang Industrial Infrastructure', filterClass: 'sepia-[5%] brightness-[92%] contrast-[104%] saturate-[80%]' },
  ];

  return (
    <div className={`w-full min-h-screen bg-white text-[#111215] ${montserrat.className}`}>
      <section className="w-full bg-[#0b0c10] pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {galleryImages.map((img, idx) => (
              <div key={img.id} className="relative aspect-[16/10] w-full overflow-hidden bg-[#16171a] group">
                <div className={`relative w-full h-full transition-all duration-700 ease-out filter ${img.filterClass}`}>
                  <Image src={img.src} alt={img.caption} fill className="object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
                </div>
                <div className="absolute bottom-4 left-5 z-10 space-y-0.5">
                  <span className="text-[9px] text-[#c5a880] font-mono tracking-widest uppercase block">STAGE 0{idx+1}</span>
                  <p className="text-xs text-gray-200 tracking-widest font-light uppercase">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="max-w-2xl">
            <p className="text-[12px] text-gray-400 font-light leading-relaxed tracking-wide">
              A strategic deep dive into China's center of commerce. Engineered for brands, importers, and e-commerce enterprises seeking direct-to-factory relationships with zero guesswork.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1 bg-[#f5f5f7] px-3 py-1 rounded-full text-[11px] text-gray-600 font-medium tracking-wide">
                <Building2 className="w-3 h-3 text-[#c5a880]" /> Yiwu Global Hub
              </span>
              <h1 className="text-2xl md:text-3xl font-normal tracking-wide text-gray-900 leading-tight">
                Zhejiang — The Supply Chain Expedition, {SOURCING_CONFIG.days} Days
              </h1>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-gray-500 font-medium tracking-wide">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" /> {SOURCING_CONFIG.days} Days</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-gray-400" /> Max 3 Enterprises</span>
              </div>
            </div>

            <div className="bg-[#f9f9fb] rounded-2xl p-6 border border-gray-100 space-y-3">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_,i)=><Star key={i} className="w-3.5 h-3.5 fill-[#c5a880] stroke-none" />)}
                <span className="text-xs font-semibold text-gray-800 ml-1">5.0</span>
                <span className="text-[10px] text-gray-400">(Verified Brand Importer)</span>
              </div>
              <p className="text-xs md:text-[13px] text-gray-700 font-normal leading-relaxed italic">
                &ldquo;An absolute game-changer. LokalChina vetted dozens of suppliers before we even landed, pre-booked private access into top-tier factories. But the real value happened AFTER we flew back: their team stayed to manage post-production QA, ensuring the container batch matched the approved samples. Total peace of mind against bait-and-switch.&rdquo;
              </p>
              <div className="text-[10px] tracking-widest text-[#c5a880] uppercase">&mdash; Marcus G., Operations Director (United Kingdom)</div>
            </div>

            <div className="space-y-6 pt-4 border-t border-gray-100">
              <div className="border-l-2 border-[#c5a880] pl-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Cost Transparency &amp; Inclusions</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#f4fbf7] rounded-xl p-5 border border-emerald-100/60 space-y-3">
                  <div className="text-emerald-800 font-semibold text-xs tracking-wide flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> Included</div>
                  <ul className="space-y-2.5 text-[11px] text-gray-600 leading-relaxed">
                    <li>• Dedicated Sourcing Concierge &amp; bilingual negotiator ({SOURCING_CONFIG.days} days)</li>
                    <li>• Pre-trip supplier vetting &amp; guaranteed access to {SOURCING_CONFIG.verifiedFactories} private factories</li>
                    <li>• Premium private vehicle (airport, market, inter-city factory visits)</li>
                    <li>• 4 nights business hotel with high-speed workspace</li>
                    <li className="text-emerald-950 font-medium bg-emerald-100/30 p-2 rounded border border-emerald-200/30">
                      • Meals: {SOURCING_CONFIG.includedBreakfasts} Breakfasts, {SOURCING_CONFIG.includedLunches} Business Lunches, {SOURCING_CONFIG.includedDinners} Executive Dinner
                    </li>
                    <li className="text-emerald-900 font-semibold underline">• Post-Trip QA: On-site batch inspection before container sealing</li>
                  </ul>
                </div>
                <div className="bg-[#fdf5f5] rounded-xl p-5 border border-rose-100/60 space-y-3">
                  <div className="text-rose-950 font-semibold text-xs tracking-wide flex items-center gap-1.5"><X className="w-4 h-4 text-rose-600 stroke-[3]" /> Excluded</div>
                  <ul className="space-y-2.5 text-[11px] text-gray-600 leading-relaxed">
                    <li>• International airfare, visa, corporate insurance</li>
                    <li>• Production deposits, tooling, sample purchasing costs</li>
                    <li>• Global courier fees (DHL/FedEx) for samples</li>
                    <li>• Freight forwarding, customs brokerage, import tariffs</li>
                    <li>• Optional dinners &amp; personal expenses</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-6 space-y-6">
            <div className="space-y-1">
              <div className="flex items-baseline gap-1"><span className="text-3xl font-medium text-gray-900">$2,360</span><span className="text-xs text-gray-400">/person</span></div>
              <p className="text-[10px] text-gray-400 italic">Enterprise private tier</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl space-y-1">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">Enterprise Service</span>
              <p className="text-xs font-medium text-gray-800 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[#c5a880]" /> NDA &amp; Contract Protection Included</p>
            </div>
            <button className="w-full bg-[#111215] text-white hover:bg-black rounded-xl py-3 text-xs font-semibold tracking-widest uppercase transition-colors">Inquire Corporate Route</button>
            <div className="flex items-center gap-2 justify-center text-[10px] text-gray-400"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /><span>Free cancellation within 72 hours</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}
