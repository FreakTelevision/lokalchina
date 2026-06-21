"use client";

import React, { useState } from 'react';
import { MapPin, Calendar, Users, DollarSign, Mail } from 'lucide-react';
import { Barlow_Condensed } from 'next/font/google';
import { submitContactForm } from '@/actions/contact';

const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-condensed' });

export default function BespokeTravelPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.target as HTMLFormElement);
    fd.set("service", "Bespoke Travel");
    const res = await submitContactForm(fd);
    setLoading(false);
    if (res.success) setSent(true);
  };

  if (sent) return (
    <div className="bg-white min-h-screen flex items-center justify-center"><div className="text-center"><h2 className="text-2xl font-light mb-2">Thank you!</h2><p className="text-gray-500">We&apos;ll respond within 24 hours.</p></div></div>
  );
  return (
    <div className="bg-white text-black min-h-screen antialiased">
      <section className="relative min-h-[30vh] flex flex-col justify-center items-center text-center px-6 pt-12 pb-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.3em] uppercase text-black mb-4" style={{ fontFamily: 'var(--font-condensed)' }}>CUSTOMIZED TRAVEL</h1>
        <p className="text-xs sm:text-sm tracking-[0.2em] text-gray-500 max-w-2xl uppercase font-light">Private expeditions. Hand-crafted itineraries. Your China, your terms.</p>
      </section>
      <section className="max-w-3xl mx-auto px-6 pb-32">
        <div className="bg-gray-50 border border-gray-200 p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-sm tracking-[0.25em] uppercase font-medium text-black mb-2">DESIGN YOUR EXPEDITION</h2>
            <p className="text-[11px] tracking-widest text-gray-500 uppercase font-light">Tell us your vision. Our fixers respond within 24 hours.</p>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-black stroke-[1.5]" /> Desired Destinations</label><input type="text" placeholder="e.g. Shanxi, Jingdezhen, Yiwu..." className="w-full bg-white border border-gray-300 focus:border-black px-4 py-3.5 text-xs tracking-wider outline-none text-black" required /></div>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-black stroke-[1.5]" /> Duration &amp; Timing</label><input type="text" placeholder="e.g. 10 days, around October" className="w-full bg-white border border-gray-300 focus:border-black px-4 py-3.5 text-xs tracking-wider outline-none text-black" required /></div>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium flex items-center gap-2"><Users className="w-3.5 h-3.5 text-black stroke-[1.5]" /> Number of Travelers</label><input type="number" min="1" placeholder="How many people?" className="w-full bg-white border border-gray-300 focus:border-black px-4 py-3.5 text-xs tracking-wider outline-none text-black" required /></div>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium flex items-center gap-2"><DollarSign className="w-3.5 h-3.5 text-black stroke-[1.5]" /> Estimated Budget (Optional)</label><input type="text" placeholder="e.g. $5,000 - $10,000 per person" className="w-full bg-white border border-gray-300 focus:border-black px-4 py-3.5 text-xs tracking-wider outline-none text-black" /></div>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-black stroke-[1.5]" /> Email Address</label><input type="email" placeholder="you@example.com" className="w-full bg-white border border-gray-300 focus:border-black px-4 py-3.5 text-xs tracking-wider outline-none text-black" required /></div>
            <div className="pt-4"><button type="submit" className="w-full bg-black text-white text-[11px] font-semibold tracking-[0.25em] uppercase py-4 hover:bg-gray-800 transition-all duration-300" disabled={loading}>{loading ? 'Sending...' : 'Submit My Bespoke Blueprint'}</button></div>
          </form>
        </div>
      </section>
    </div>
  );
}
