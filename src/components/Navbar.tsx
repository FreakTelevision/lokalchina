"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, User, Phone, Menu, X } from 'lucide-react';

export default function Navbar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const allLocales = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'ar', label: 'العربية' },
    { code: 'nl', label: 'Nederlands' },
  ];

  return (
    <header className="w-full max-w-7xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4 border-b bg-white text-black">
      {/* Left: Logo */}
      <div className="flex justify-start">
        <Link href={`/${locale}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/map.svg" alt="LokalChina" className="h-6 w-auto" />
          <span className="font-medium text-xs tracking-[0.3em] uppercase hidden sm:inline text-black">LOKALCHINA</span>
        </Link>
      </div>

      {/* Center: Nav */}
      <nav className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.25em] font-medium uppercase text-gray-700">
        <Link href={`/${locale}/routes`} className="hover:text-black transition-colors">Routes</Link>
        <div className="relative group cursor-pointer py-3">
          <span className="hover:text-black transition-colors">Services</span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50">
            <div className="bg-white border border-gray-200 shadow-lg p-1.5 flex flex-col min-w-[200px]">
              <Link href={`/${locale}/services/bespoke-travel`} className="text-[10px] tracking-widest uppercase font-medium text-gray-700 hover:text-black hover:bg-gray-50 px-4 py-2.5">CUSTOMIZED TRAVEL</Link>
              <Link href={`/${locale}/services/medical-concierge`} className="text-[10px] tracking-widest uppercase font-medium text-gray-500 hover:text-black hover:bg-gray-50 px-4 py-2.5 border-t border-gray-100">MEDICAL COMPANION</Link>
              <Link href={`/${locale}/services/enterprise-sourcing`} className="text-[10px] tracking-widest uppercase font-medium text-gray-500 hover:text-black hover:bg-gray-50 px-4 py-2.5 border-t border-gray-100">SUPPLIER SOURCING SOLUTIONS</Link>
            </div>
          </div>
        </div>
        <Link href={`/${locale}/blog`} className="hover:text-black transition-colors">Journal</Link>
        <Link href={`/${locale}/about`} className="hover:text-black transition-colors">About</Link>
      </nav>

      {/* Right: Actions */}
      <div className="flex items-center justify-end gap-6">
        <div className="relative group">
          <button className="flex items-center gap-1.5 text-[11px] tracking-wider text-gray-500 hover:text-black transition-colors font-light uppercase">
            <Globe className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>{allLocales.find(l => l.code === locale)?.label?.slice(0,2).toUpperCase() || 'EN'}</span>
          </button>
          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-sm py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[130px] z-50">
            {allLocales.map((l) => (
              <Link key={l.code} href={`/${l.code}${pathname.replace(/^\/(en|fr|de|nl)/, '')}`} className={`block px-4 py-2 text-[11px] tracking-wider uppercase ${l.code === locale ? 'text-black font-medium' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}>{l.label}</Link>
            ))}
          </div>
        </div>
        <a href="tel:+8618500523409" className="hidden lg:flex items-center gap-2 text-[11px] tracking-wider text-gray-500 hover:text-black transition-colors font-light">
          <Phone className="w-3 h-3 stroke-[1.5]" /><span>+86 185 005 23409</span>
        </a>
        <Link href={`/${locale}/auth/login`} className="text-gray-500 hover:text-black transition-colors p-1"><User className="w-4 h-4 stroke-[1.5]" /></Link>
        {/* Mobile hamburger */}
        <button className="md:hidden p-1" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile slide-out menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-50 px-6 py-4 space-y-3">
          <Link href={`/${locale}/routes`} className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Routes</Link>
          <Link href={`/${locale}/services/bespoke-travel`} className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link href={`/${locale}/about`} className="block text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>About</Link>
          <hr />
          <Link href={`/${locale}/auth/login`} className="block text-sm py-2 text-gray-500" onClick={() => setMobileOpen(false)}>Log In</Link>
          <Link href={`/${locale}/contact`} className="block text-sm py-2 text-gray-500" onClick={() => setMobileOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  );
}
