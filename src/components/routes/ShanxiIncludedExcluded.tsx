"use client";

import React from 'react';
import { Check, X, Eye } from 'lucide-react';

const ROUTE_CONFIG = {
  totalSites: 10,
  includedBreakfasts: 5,
  includedLunches: 6,
  includedDinners: 3,
};

export default function ShanxiIncludedExcluded() {
  const totalSpecialtyMeals = ROUTE_CONFIG.includedLunches + ROUTE_CONFIG.includedDinners;

  return (
    <div className="w-full bg-white text-[#111215] space-y-12">
      {/* Overview */}
      <div>
        <div className="border-l-2 border-[#c5a880] pl-4 mb-6">
          <span className="text-[11px] text-gray-400 tracking-widest uppercase font-mono block">01 / OVERVIEW</span>
          <h3 className="text-lg font-medium text-gray-900 tracking-wide mt-1">Route Pilgrimage Overview</h3>
        </div>
        <div className="max-w-4xl bg-[#f9f9fb] rounded-2xl p-6 border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 block">Curated Exploration</span>
            <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#c5a880]" />
              <span>Visit {ROUTE_CONFIG.totalSites} Verified Architecture Sites</span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-400 block">Expert Guidance</span>
            <p className="text-sm font-medium text-gray-800">Bilingual Archaeologist Guide</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-400 block">Pace &amp; Comfort</span>
            <p className="text-sm font-medium text-gray-800">Private Premium Transfers All-Inclusive</p>
          </div>
        </div>
      </div>

      {/* Included / Excluded */}
      <div>
        <div className="border-l-2 border-[#c5a880] pl-4 mb-8">
          <span className="text-[11px] text-gray-400 tracking-widest uppercase font-mono block">02 / COST DETAILS</span>
          <h3 className="text-lg font-medium text-gray-900 tracking-wide mt-1">What&apos;s Included &amp; Excluded</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-[#f4fbf7] rounded-2xl p-6 border border-emerald-100/60 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm tracking-wide">
              <div className="bg-emerald-600 text-white p-1 rounded-md"><Check className="w-3.5 h-3.5 stroke-[3]" /></div>
              <span>What&apos;s Included</span>
            </div>
            <ul className="space-y-3 text-xs text-gray-700 font-normal leading-relaxed tracking-wide">
              <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">✓</span><span>Former archaeologist guide (English-speaking) with deep game-to-reality mapping expertise</span></li>
              <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">✓</span><span>Private premium vehicle for all transfers &amp; airport pickups</span></li>
              <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">✓</span><span>Full entrance fees to all {ROUTE_CONFIG.totalSites} listed historical landmarks &amp; shrines</span></li>
              <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">✓</span><span>5 nights premium accommodation (handpicked boutique &amp; cultural hotels)</span></li>
              <li className="flex items-start gap-2 bg-emerald-100/40 p-2.5 rounded-lg border border-emerald-200/40">
                <span className="text-emerald-700 font-semibold mt-0.5">✓</span>
                <span className="text-emerald-900 font-medium">Culinary Package: {ROUTE_CONFIG.includedBreakfasts} Breakfasts, {ROUTE_CONFIG.includedLunches} Lunches, and {ROUTE_CONFIG.includedDinners} Dinners ({totalSpecialtyMeals} specialty banquets).</span>
              </li>
              <li className="flex items-start gap-2"><span className="text-emerald-600 mt-0.5">✓</span><span>Custom Black Myth location map &amp; exclusive architectural photo guidebook</span></li>
            </ul>
          </div>

          <div className="bg-[#fdf5f5] rounded-2xl p-6 border border-rose-100/60 space-y-4">
            <div className="flex items-center gap-2 text-rose-950 font-semibold text-sm tracking-wide">
              <div className="bg-rose-600 text-white p-1 rounded-md"><X className="w-3.5 h-3.5 stroke-[3]" /></div>
              <span>What&apos;s Not Included</span>
            </div>
            <ul className="space-y-3 text-xs text-gray-700 font-normal leading-relaxed tracking-wide">
              <li className="flex items-start gap-2"><span className="text-rose-500 mt-0.5">✕</span><span>International or domestic flights to Datong / departing from Yuncheng</span></li>
              <li className="flex items-start gap-2 bg-rose-100/30 p-2.5 rounded-lg border border-rose-200/30">
                <span className="text-rose-600 font-semibold mt-0.5">✕</span>
                <span className="text-rose-900 font-medium">Remaining meals not listed in the 6-day itinerary (giving you flexibility for personal culinary exploration).</span>
              </li>
              <li className="flex items-start gap-2"><span className="text-rose-500 mt-0.5">✕</span><span>Personal expenses (souvenirs, laundry, alcoholic beverages)</span></li>
              <li className="flex items-start gap-2"><span className="text-rose-500 mt-0.5">✕</span><span>Personal travel insurance (highly recommended to purchase independently)</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
