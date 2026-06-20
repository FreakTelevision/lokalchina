import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { User, Phone, Globe, Calendar, MapPin, Users, DollarSign, Mail } from 'lucide-react';
import { Barlow_Condensed, Montserrat } from 'next/font/google';

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-condensed',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-montserrat',
});

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BespokeTravelPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });

  const allLocales = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'nl', label: 'Nederlands' },
  ];

  return (
    <div className={`bg-[#0b0c10] text-white min-h-screen antialiased selection:bg-white selection:text-black ${barlow.variable} ${montserrat.variable}`}>

      {/* Header — synced with homepage */}
      <header className="relative z-50 w-full max-w-7xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6 py-6 border-b border-white/5">
        <div className="flex justify-start">
          <Link href={`/${locale}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/map.svg" alt="LokalChina" className="h-6 w-auto" />
            <span className="font-light text-xs tracking-[0.3em] text-white uppercase hidden sm:inline">LOKALCHINA</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.25em] font-light uppercase text-gray-200">
          <Link href={`/${locale}/routes`} className="hover:text-white transition-colors">{t('routes')}</Link>
          <div className="relative group cursor-pointer py-2">
            <span className="text-white font-normal border-b border-white/40 pb-1">{t('guides')}</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-[#0b0c10]/95 backdrop-blur-md border border-white/10 p-2 flex flex-col opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 shadow-2xl">
              <Link href={`/${locale}/services/bespoke-travel`} className="text-[10px] tracking-widest uppercase font-medium text-white bg-white/5 px-4 py-3">Bespoke Travel</Link>
              <Link href={`/${locale}/services/medical-concierge`} className="text-[10px] tracking-widest uppercase font-light text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 border-t border-white/5">Medical Concierge</Link>
              <Link href={`/${locale}/services/enterprise-sourcing`} className="text-[10px] tracking-widest uppercase font-light text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 border-t border-white/5">Enterprise Sourcing &amp; Expeditions</Link>
            </div>
          </div>
          <Link href={`/${locale}/about`} className="hover:text-white transition-colors">{t('about')}</Link>
        </nav>

        <div className="flex items-center justify-end gap-6">
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-[11px] tracking-wider text-gray-300 hover:text-white transition-colors font-light uppercase">
              <Globe className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>{allLocales.find(l => l.code === locale)?.label?.slice(0,2).toUpperCase() || 'EN'}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-sm py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[130px] z-50">
              {allLocales.map((l) => (
                <Link key={l.code} href={`/${l.code}/services/bespoke-travel`} className={`block px-4 py-2 text-[11px] tracking-wider uppercase transition-colors ${l.code === locale ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{l.label}</Link>
              ))}
            </div>
          </div>
          <a href="tel:+8618500523409" className="hidden lg:flex items-center gap-2 text-[11px] tracking-wider text-gray-300 hover:text-white transition-colors font-light">
            <Phone className="w-3 h-3 stroke-[1.5]" /><span>+86 185 005 23409</span>
          </a>
          <Link href={`/${locale}/auth/login`} className="text-gray-300 hover:text-white transition-colors p-1"><User className="w-4 h-4 stroke-[1.5]" /></Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[40vh] flex flex-col justify-center items-center text-center px-6 py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.3em] uppercase text-white mb-4" style={{ fontFamily: 'var(--font-condensed)' }}>BESPOKE TRAVEL</h1>
        <p className="text-xs sm:text-sm tracking-[0.2em] text-gray-400 max-w-2xl uppercase font-light">Private expeditions. Hand-crafted itineraries. Your China, your terms.</p>
      </section>

      {/* ENQUIRY FORM */}
      <section id="enquire-form" className="max-w-3xl mx-auto px-6 pb-32">
        <div className="bg-[#121318] border border-white/10 p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-sm tracking-[0.25em] uppercase font-medium text-white mb-2">DESIGN YOUR EXPEDITION</h2>
            <p className="text-[11px] tracking-widest text-gray-400 uppercase font-light">Tell us your vision. Our fixers will respond within 24 hours.</p>
          </div>
          <form className="space-y-8">
            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Desired Destinations</label>
              <input type="text" placeholder="e.g. Shanxi temples, Jingdezhen ceramics, Yiwu sourcing, or a multi-city route..." className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Duration &amp; Timing</label>
              <input type="text" placeholder="e.g. 10 days, around October this year" className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><Users className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Number of Travelers</label>
              <input type="number" min="1" placeholder="How many people?" className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><DollarSign className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Estimated Budget (Optional)</label>
              <input type="text" placeholder="e.g. $5,000 - $10,000 per person" className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-400 font-medium flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-white stroke-[1.5]" /> Email Address</label>
              <input type="email" placeholder="you@example.com" className="w-full bg-black/40 border border-white/10 focus:border-white px-4 py-3.5 text-xs tracking-wider outline-none text-white font-light" required />
            </div>
            <div className="pt-4">
              <button type="submit" className="w-full bg-white text-black text-[11px] font-semibold tracking-[0.25em] uppercase py-4 hover:bg-black hover:text-white border border-white transition-all duration-300">Submit My Bespoke Blueprint</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
