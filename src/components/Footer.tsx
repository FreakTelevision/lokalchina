"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, MessageCircle, Video, Briefcase } from 'lucide-react';

export default function Footer({ locale }: { locale: string }) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  if (isHome) return null;

  return (
    <footer className="w-full bg-black text-white border-t border-white/10 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

        {/* Left: Newsletter */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <img src="/map.svg" alt="LokalChina" className="h-6 w-auto" />
            <span className="font-light text-xs tracking-[0.3em] uppercase">LOKALCHINA</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-light tracking-wide">Find your next adventure</h3>
            <p className="text-xs text-gray-400 tracking-wide font-light max-w-sm leading-relaxed">
              LokalChina&apos;s newsletter is packed with inspiration for your next trip.
            </p>
          </div>

          <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name*" className="w-full bg-black border border-white/20 focus:border-white px-4 py-3 text-xs tracking-wider outline-none font-light placeholder:text-gray-600 text-white" required />
              <input type="text" placeholder="Last Name*" className="w-full bg-black border border-white/20 focus:border-white px-4 py-3 text-xs tracking-wider outline-none font-light placeholder:text-gray-600 text-white" required />
            </div>
            <input type="email" placeholder="E-mail Address*" className="w-full bg-black border border-white/20 focus:border-white px-4 py-3 text-xs tracking-wider outline-none font-light placeholder:text-gray-600 text-white" required />
            <p className="text-[10px] text-gray-500 leading-relaxed font-light">
              By entering your email, you agree to our <Link href={`/${locale}/terms`} className="underline hover:text-white">Terms of Use</Link> and <Link href={`/${locale}/terms`} className="underline hover:text-white">Privacy Policy</Link>.
            </p>
            <button type="submit" className="bg-transparent text-white border border-white/40 hover:bg-white hover:text-black transition-all duration-300 text-[10px] tracking-[0.25em] font-semibold uppercase px-10 py-3">SUBSCRIBE</button>
          </form>

          <div className="flex items-center gap-4 pt-4">
            <a href="#" className="p-2 rounded-full border border-white/10 hover:border-white text-gray-400 hover:text-white transition-all"><Camera className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-full border border-white/10 hover:border-white text-gray-400 hover:text-white transition-all"><MessageCircle className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-full border border-white/10 hover:border-white text-gray-400 hover:text-white transition-all"><Video className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-full border border-white/10 hover:border-white text-gray-400 hover:text-white transition-all"><Briefcase className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Right: Links */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 lg:pt-0">
          <div className="space-y-4">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium text-white">COMPANY</h4>
            <ul className="space-y-3 text-xs font-light tracking-wide text-gray-400">
              <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium text-white">SERVICES</h4>
            <ul className="space-y-3 text-xs font-light tracking-wide text-gray-400">
              <li><Link href={`/${locale}/routes`} className="hover:text-white transition-colors">Travel Itineraries</Link></li>
              <li><Link href={`/${locale}/services/bespoke-travel`} className="hover:text-white transition-colors">Customized Travel</Link></li>
              <li><Link href={`/${locale}/services/medical-concierge`} className="hover:text-white transition-colors">Medical Companion</Link></li>
              <li><Link href={`/${locale}/services/enterprise-sourcing`} className="hover:text-white transition-colors">Supplier Sourcing Solutions</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium text-white">POLICIES AND LEGAL</h4>
            <ul className="space-y-3 text-xs font-light tracking-wide text-gray-400">
              <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">Booking Terms and Conditions</Link></li>
              <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest font-light">
        <span>© {new Date().getFullYear()} LokalChina. All Rights Reserved.</span>
        <span>Beyond the tourist wall.</span>
      </div>
    </footer>
  );
}
