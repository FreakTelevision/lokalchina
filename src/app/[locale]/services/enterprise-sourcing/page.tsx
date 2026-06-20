import React from 'react';
import Link from 'next/link';
import { Globe, MapPin, Calendar, Mail, Package } from 'lucide-react';
import { Barlow_Condensed, Montserrat } from 'next/font/google';

const barlow = Barlow_Condensed({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-condensed' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-montserrat' });

interface PageProps { params: Promise<{ locale: string }>; }

export default async function EnterpriseSourcingPage({ params }: PageProps) {
  const { locale } = await params;
  const allLocales = [
    { code: 'en', label: 'English' }, { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' }, { code: 'nl', label: 'Nederlands' },
  ];

  return (
    <div className={`bg-[#0b0c10] text-white min-h-screen antialiased selection:bg-white selection:text-black ${barlow.variable} ${montserrat.variable}`}>
      <header className="relative z-50 w-full max-w-7xl mx-auto flex justify-between items-center px-6 py-6 bg-transparent">
        <Link href={`/${locale}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/map.svg" alt="LokalChina" className="h-6 w-auto" />
          <span className="font-light text-xs tracking-[0.3em] text-white uppercase hidden sm:inline">LOKALCHINA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.25em] font-light uppercase text-gray-200">
          <Link href={`/${locale}/routes`} className="hover:text-white transition-colors">Routes</Link>
          <div className="relative group cursor-pointer py-2">
            <span className="hover:text-white transition-colors text-white font-normal">Services</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-[#0b0c10]/95 backdrop-blur-md border border-white/10 p-2 flex flex-col opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 shadow-2xl">
              <Link href={`/${locale}/services/bespoke-travel`} className="text-[10px] tracking-widest uppercase font-light text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3">Bespoke Travel</Link>
              <Link href={`/${locale}/services/medical-concierge`} className="text-[10px] tracking-widest uppercase font-light text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 border-t border-white/5">Medical Concierge</Link>
              <Link href={`/${locale}/services/enterprise-sourcing`} className="text-[10px] tracking-widest uppercase font-medium text-white bg-white/5 px-4 py-3 border-t border-white/5">Enterprise Sourcing &amp; Expeditions</Link>
            </div>
          </div>
          <Link href={`/${locale}/about`} className="hover:text-white transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-[11px] tracking-wider text-gray-300 hover:text-white transition-colors font-light uppercase">
              <Globe className="w-3.5 h-3.5 stroke-[1.5]" /><span>{allLocales.find(l => l.code === locale)?.label?.slice(0,2).toUpperCase() || 'EN'}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-sm py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[130px] z-50">
              {allLocales.map((l) => (<Link key={l.code} href={`/${l.code}/services/enterprise-sourcing`} className={`block px-4 py-2 text-[11px] tracking-wider uppercase ${l.code === locale ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{l.label}</Link>))}
            </div>
          </div>
          <Link href={`/${locale}/auth/login`} className="text-[11px] tracking-wider text-gray-300 hover:text-white transition-colors font-light uppercase">Log In</Link>
          <Link href={`/${locale}/contact`} className="bg-white text-black text-[10px] font-semibold tracking-[0.2em] uppercase px-5 py-2.5 hover:bg-black hover:text-white border border-white transition-all duration-300">Sign Up</Link>
        </div>
      </header>

      <section className="relative min-h-[35vh] flex flex-col justify-center items-center text-center px-6 pt-12 pb-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.3em] uppercase text-white mb-4" style={{ fontFamily: 'var(--font-condensed)' }}>ENTERPRISE SOURCING</h1>
        <p className="text-xs sm:text-sm tracking-[0.2em] text-gray-400 max-w-2xl uppercase font-light">Vetted suppliers. Factory-floor access. The real China supply chain, unlocked.</p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-32">
        <div className="bg-[#121318] border border-white/10 p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-sm tracking-[0.25em] uppercase font-medium text-white mb-2">SOURCE WITH CONFIDENCE</h2>
            <p className="text-[11px] tracking-widest text-gray-400 uppercase font-light">Tell us what you need. Our sourcing agents respond within 24 hours.</p>
          </div>
          <form className="space-y-8">
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><Package className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Product Categories</label><input type="text" placeholder="e.g. kitchenware, electronics, toys, textiles, hardware..." className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required /></div>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Target Region</label><input type="text" placeholder="e.g. Yiwu, Yongkang, Shenzhen, Guangzhou..." className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required /></div>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Preferred Timing</label><input type="text" placeholder="e.g. March 2027, or during the Yiwu Fair in October" className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required /></div>
            <div className="space-y-2"><label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Email Address</label><input type="email" placeholder="you@example.com" className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required /></div>
            <div className="pt-4"><button type="submit" className="w-full bg-white text-black text-[11px] font-semibold tracking-[0.25em] uppercase py-4 hover:bg-black hover:text-white border border-white transition-all duration-300">Submit My Sourcing Enquiry</button></div>
          </form>
        </div>
      </section>
    </div>
  );
}
