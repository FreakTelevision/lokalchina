"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, User, Phone } from 'lucide-react';

export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const allLocales = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'nl', label: 'Nederlands' },
  ];

  return (
    <header className="w-full max-w-7xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6 py-6 bg-[#0b0c10] text-white">
      {/* Left: Logo */}
      <div className="flex justify-start">
        <Link href={`/${locale}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/map.svg" alt="LokalChina" className="h-6 w-auto" />
          <span className="font-light text-xs tracking-[0.3em] uppercase hidden sm:inline">LOKALCHINA</span>
        </Link>
      </div>

      {/* Center: Nav */}
      <nav className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.25em] font-light uppercase text-gray-200">
        <Link href={`/${locale}/routes`} className="hover:text-white transition-colors">Routes</Link>
        <Link href={`/${locale}/services/bespoke-travel`} className="hover:text-white transition-colors">Services</Link>
        <Link href={`/${locale}/about`} className="hover:text-white transition-colors">About</Link>
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center justify-end gap-6">
        <div className="relative group">
          <button className="flex items-center gap-1.5 text-[11px] tracking-wider text-gray-300 hover:text-white transition-colors font-light uppercase">
            <Globe className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>{allLocales.find(l => l.code === locale)?.label?.slice(0,2).toUpperCase() || 'EN'}</span>
          </button>
          <div className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-sm py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[130px] z-50">
            {allLocales.map((l) => (
              <Link key={l.code} href={`/${l.code}${pathname.replace(/^\/(en|fr|de|nl)/, '')}`} className={`block px-4 py-2 text-[11px] tracking-wider uppercase ${l.code === locale ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>{l.label}</Link>
            ))}
          </div>
        </div>
        <a href="tel:+8618500523409" className="hidden lg:flex items-center gap-2 text-[11px] tracking-wider text-gray-300 hover:text-white transition-colors font-light">
          <Phone className="w-3 h-3 stroke-[1.5]" /><span>+86 185 005 23409</span>
        </a>
        <Link href={`/${locale}/auth/login`} className="text-gray-300 hover:text-white transition-colors p-1"><User className="w-4 h-4 stroke-[1.5]" /></Link>
      </div>
    </header>
  );
}
