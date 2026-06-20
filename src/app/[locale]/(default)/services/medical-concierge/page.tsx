import React from 'react';
import { MapPin, Calendar, Mail, Stethoscope } from 'lucide-react';
import { Barlow_Condensed, Montserrat } from 'next/font/google';

const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-condensed' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-montserrat' });

export default async function MedicalConciergePage() {
  return (
    <div className={`bg-[#0b0c10] text-white min-h-screen antialiased selection:bg-white selection:text-black ${barlow.variable} ${montserrat.variable}`}>
      <section className="relative min-h-[35vh] flex flex-col justify-center items-center text-center px-6 pt-12 pb-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.3em] uppercase text-white mb-4" style={{ fontFamily: 'var(--font-condensed)' }}>MEDICAL COMPANION</h1>
        <p className="text-xs sm:text-sm tracking-[0.2em] text-gray-400 max-w-2xl uppercase font-light">Elite healthcare access. Private escorts. World-class Chinese medicine.</p>
      </section>
      <section className="max-w-3xl mx-auto px-6 pb-32">
        <div className="bg-[#121318] border border-white/10 p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-sm tracking-[0.25em] uppercase font-medium text-white mb-2">YOUR HEALTH JOURNEY</h2>
            <p className="text-[11px] tracking-widest text-gray-400 uppercase font-light">Tell us your needs. Our medical concierge team responds within 24 hours.</p>
          </div>
          <form className="space-y-8">
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><Stethoscope className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Medical Need / Speciality</label><input type="text" placeholder="e.g. cardiac surgery, orthopaedics, TCM, dental..." className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required /></div>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Preferred City</label><input type="text" placeholder="e.g. Beijing, Shanghai, Guangzhou, Chengdu..." className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required /></div>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Preferred Timing</label><input type="text" placeholder="e.g. within 2 weeks, next month..." className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required /></div>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Email Address</label><input type="email" placeholder="you@example.com" className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required /></div>
            <div className="pt-4"><button type="submit" className="w-full bg-white text-black text-[11px] font-semibold tracking-[0.25em] uppercase py-4 hover:bg-black hover:text-white border border-white transition-all duration-300">Submit My Medical Enquiry</button></div>
          </form>
        </div>
      </section>
    </div>
  );
}
