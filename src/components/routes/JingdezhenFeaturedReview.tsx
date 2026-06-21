import React from 'react';
import { Star } from 'lucide-react';

export default function JingdezhenFeaturedReview() {
  return (
    <div className="bg-[#f9f9fb] rounded-xl p-5 border border-gray-100 space-y-3">
      <div className="flex items-center gap-1.5">
        {[...Array(5)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-[#c5a880] stroke-none" />))}
        <span className="text-xs font-semibold text-gray-800 ml-1">5.0</span>
        <span className="text-[11px] text-gray-400 font-light">(Verified Explorer)</span>
      </div>
      <p className="text-[12px] md:text-[13px] text-gray-700 font-normal leading-relaxed italic">
        &ldquo;An eye-opening journey. I thought I knew porcelain, but seeing the world-class craftsmanship here completely deepened my understanding. The locals literally turn everything into ceramics — from street signs to contemporary art. The hands-on pottery workshops were incredibly fun and therapeutic.&rdquo;
      </p>
      <div className="text-[10px] tracking-widest text-[#c5a880] uppercase font-light">&mdash; Clara, United States</div>
    </div>
  );
}
