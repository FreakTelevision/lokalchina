"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, User, Phone } from 'lucide-react';

interface HeaderProps {
  locale: string;
}

export default function SubPageHeader({ locale }: HeaderProps) {
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations('Navigation');

  // Hide on homepage — it has its own dark header built in
  const isHome = pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;
  if (isHome) return null;

  const allLocales = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'nl', label: 'Nederlands' },
  ];

  return (
    <header className="relative z-50 w-full max-w-7xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6 py-6 border-b border-white/5">
      {/* Left: Logo */}
      <div className="flex justify-start">
        <Link href={`/${locale}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/map.svg" alt="LokalChina" className="h-6 w-auto" />
          <span className="font-light text-xs tracking-[0.3em] text-white uppercase hidden sm:inline">LOKALCHINA</span>
        </Link>
      </div>

      {/* Center: Nav */}
      <nav className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.25em] font-light uppercase text-gray-200">
        <Link href={`/${currentLocale}/routes`} className="hover:text-white transition-colors">{t('routes')}</Link>
        <div className="relative group cursor-pointer py-2">
          <span className="hover:text-white transition-colors">{t('guides')}</span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-[#0b0c10]/95 backdrop-blur-md border border-white/10 p-2 flex flex-col opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 shadow-2xl">
            <Link href={`/${currentLocale}/services/bespoke-travel`} className="text-[10px] tracking-widest uppercase font-light text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3">Bespoke Travel</Link>
            <Link href={`/${currentLocale}/services/medical-concierge`} className="text-[10px] tracking-widest uppercase font-light text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 border-t border-white/5">Medical Concierge</Link>
            <Link href={`/${currentLocale}/services/enterprise-sourcing`} className="text-[10px] tracking-widest uppercase font-light text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 border-t border-white/5">Enterprise Sourcing &amp; Expeditions</Link>
          </div>
        </div>
        <Link href={`/${currentLocale}/about`} className="hover:text-white transition-colors">{t('about')}</Link>
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center justify-end gap-6">
        <div className="relative group">
          <button className="flex items-center gap-1.5 text-[11px] tracking-wider text-gray-300 hover:text-white transition-colors font-light uppercase">
            <Globe className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>{allLocales.find(l => l.code === currentLocale)?.label?.slice(0,2).toUpperCase() || 'EN'}</span>
          </button>
          <div className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-sm py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[130px] z-50">
            {allLocales.map((l) => (
              <Link key={l.code} href={`/${l.code}${pathname.replace(/^\/(en|fr|de|nl)/, '')}`} className={`block px-4 py-2 text-[11px] tracking-wider uppercase transition-colors ${l.code === currentLocale ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{l.label}</Link>
            ))}
          </div>
        </div>
        <a href="tel:+8618500523409" className="hidden lg:flex items-center gap-2 text-[11px] tracking-wider text-gray-300 hover:text-white transition-colors font-light">
          <Phone className="w-3 h-3 stroke-[1.5]" /><span>+86 185 005 23409</span>
        </a>
        <Link href={`/${currentLocale}/auth/login`} className="text-gray-300 hover:text-white transition-colors p-1"><User className="w-4 h-4 stroke-[1.5]" /></Link>
      </div>
    </header>
  );
}
