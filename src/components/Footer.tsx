"use client";

import React from 'react';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

export default function Footer({ locale }: { locale: string }) {
  return (
    <footer className={`w-full bg-[#0b0c10] text-white pt-16 pb-12 ${montserrat.className}`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

        {/* Left: Newsletter */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <img src="/map.svg" alt="LokalChina" className="h-6 w-auto" />
            <span className="text-xs tracking-[0.3em] uppercase text-gray-400 font-light">LOKALCHINA</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-light tracking-wide text-gray-200">Find your next adventure</h3>
            <p className="text-xs text-gray-400 tracking-wide font-light max-w-sm leading-relaxed">
              LokalChina&apos;s newsletter is packed with inspiration for your next trip.
            </p>
          </div>

          <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name*" className="w-full bg-transparent border-b border-white/20 focus:border-white px-0 py-3 text-xs tracking-wider outline-none font-light placeholder:text-gray-600 text-white" required />
              <input type="text" placeholder="Last Name*" className="w-full bg-transparent border-b border-white/20 focus:border-white px-0 py-3 text-xs tracking-wider outline-none font-light placeholder:text-gray-600 text-white" required />
            </div>
            <input type="email" placeholder="E-mail Address*" className="w-full bg-transparent border-b border-white/20 focus:border-white px-0 py-3 text-xs tracking-wider outline-none font-light placeholder:text-gray-600 text-white" required />
            <p className="text-[10px] text-gray-500 leading-relaxed">
              By entering your email, you agree to our <Link href={`/${locale}/terms`} className="underline hover:text-gray-300">Terms of Use</Link> and <Link href={`/${locale}/terms`} className="underline hover:text-gray-300">Privacy Policy</Link>.
            </p>
            <button type="submit" className="bg-transparent text-gray-200 border border-white/30 hover:bg-white hover:text-black transition-all duration-300 text-[10px] tracking-[0.25em] font-medium uppercase px-10 py-3">SUBSCRIBE</button>
          </form>
        </div>

        {/* Right: Links */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 lg:pt-0">
          <div className="space-y-4">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium text-gray-200">COMPANY</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/about`} className="text-sm tracking-widest text-gray-400 hover:text-gray-200 transition-colors font-light">About Us</Link></li>
              <li><Link href={`/${locale}/contact`} className="text-sm tracking-widest text-gray-400 hover:text-gray-200 transition-colors font-light">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium text-gray-200">SERVICES</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/routes`} className="text-sm tracking-widest text-gray-400 hover:text-gray-200 transition-colors font-light">Travel Itineraries</Link></li>
              <li><Link href={`/${locale}/services/bespoke-travel`} className="text-sm tracking-widest text-gray-400 hover:text-gray-200 transition-colors font-light">Customized Travel</Link></li>
              <li><Link href={`/${locale}/services/medical-concierge`} className="text-sm tracking-widest text-gray-400 hover:text-gray-200 transition-colors font-light">Medical Companion</Link></li>
              <li><Link href={`/${locale}/services/enterprise-sourcing`} className="text-sm tracking-widest text-gray-400 hover:text-gray-200 transition-colors font-light">Supplier Sourcing Solutions</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium text-gray-200">POLICIES AND LEGAL</h4>
            <ul className="space-y-3">
              <li><Link href={`/${locale}/terms`} className="text-sm tracking-widest text-gray-400 hover:text-gray-200 transition-colors font-light">Booking Terms</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-sm tracking-widest text-gray-400 hover:text-gray-200 transition-colors font-light">Terms of Use</Link></li>
              <li><Link href={`/${locale}/terms`} className="text-sm tracking-widest text-gray-400 hover:text-gray-200 transition-colors font-light">Privacy Policy</Link></li>
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

