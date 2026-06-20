import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { User, Phone, Globe, ArrowRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Homepage' });

  const featuredRoutes = [
    { slug: "shanxi-black-myth-pilgrimage", days: "6 NIGHTS", subtitle: "SHANXI, CHINA", title: "THE BLACK MYTH PILGRIMAGE", image: "https://images.pexels.com/photos/33572696/pexels-photo-33572696.jpeg?auto=format&fit=crop&q=80&w=800" },
    { slug: "jingdezhen-wuyuan-ceramics", days: "4 NIGHTS", subtitle: "JIANGXI, CHINA", title: "CERAMICS & ANCIENT AESTHETICS", image: "https://images.pexels.com/photos/15402564/pexels-photo-15402564.jpeg?auto=format&fit=crop&q=80&w=800" },
    { slug: "yiwu-yongkang-sourcing", days: "3 NIGHTS", subtitle: "ZHEJIANG, CHINA", title: "THE SOURCING EXPEDITION", image: "https://images.pexels.com/photos/30371604/pexels-photo-30371604.jpeg?auto=format&fit=crop&q=80&w=800" }
  ];

  const locales = ['en', 'fr', 'de', 'nl'];
  const localeLabels: Record<string, string> = { en: 'EN', fr: 'FR', de: 'DE', nl: 'NL' };
  const nextLocale = locales[(locales.indexOf(locale) + 1) % locales.length];

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen font-sans antialiased selection:bg-white selection:text-black">

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between items-center px-6 py-8">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-[0.45] saturate-[0.85]" src="/videos/hero.mp4" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0b0c10]" />
        </div>

        <header className="relative z-10 w-full max-w-7xl grid grid-cols-[1fr_auto_1fr] items-center py-2">
          {/* Left: Logo */}
          <div className="flex justify-start">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              {/* Panda logo — original colors preserved */}
              <img src="/map.svg" alt="LokalChina" className="h-7 w-auto" />
              <span className="font-medium text-[13px] tracking-[0.18em] text-white">LokalChina</span>
            </Link>
          </div>

          {/* Center: Nav */}
          <nav className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.25em] font-light uppercase text-gray-200">
            <Link href={`/${locale}/routes`} className="hover:text-white transition-colors">{t('navRoutes')}</Link>
            <Link href={`/${locale}/guides`} className="hover:text-white transition-colors">{t('navGuides')}</Link>
            <Link href={`/${locale}/about`} className="hover:text-white transition-colors">{t('navAbout')}</Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-6">
            <Link href={`/${nextLocale}`} className="flex items-center gap-1.5 text-[11px] tracking-wider text-gray-300 hover:text-white transition-colors font-light uppercase">
              <Globe className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>{localeLabels[locale] || 'EN'}</span>
            </Link>
            <a href="tel:+8618500523409" className="hidden lg:flex items-center gap-2 text-[11px] tracking-wider text-gray-300 hover:text-white transition-colors font-light">
              <Phone className="w-3 h-3 stroke-[1.5]" />
              <span>+86 185 005 23409</span>
            </a>
            <Link href={`/${locale}/auth/login`} className="text-gray-300 hover:text-white transition-colors p-1" title="Account">
              <User className="w-4 h-4 stroke-[1.5]" />
            </Link>
            <Link href={`/${locale}/contact`} className="bg-white text-black text-[10px] font-semibold tracking-[0.2em] uppercase px-6 py-3 hover:bg-black hover:text-white border border-white transition-all duration-300 rounded-none">
              {t('enquireNow')}
            </Link>
          </div>
        </header>

        <div className="relative z-10 text-center max-w-7xl px-4 my-auto w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[0.28em] uppercase leading-none text-white" style={{ fontFamily: 'var(--font-condensed)' }}>
            {t('heroHeadline')}
          </h1>
          <p className="mt-5 text-[9px] sm:text-[10px] tracking-[0.25em] text-gray-300/80 max-w-2xl mx-auto uppercase font-light">
            {t('heroSubtitle')}
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link href={`/${locale}/routes`} className="border border-white/60 bg-transparent text-white px-7 py-3 text-[10px] tracking-widest uppercase font-medium hover:bg-white hover:text-black transition-all duration-300">
              {t('exploreTrips')}
            </Link>
            <Link href={`/${locale}/booking`} className="bg-white text-black border border-white px-7 py-3 text-[10px] tracking-widest uppercase font-medium hover:bg-transparent hover:text-white transition-all duration-300">
              {t('planMyTrip')}
            </Link>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-4xl bg-black/40 backdrop-blur-md border border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] tracking-[0.2em] uppercase font-light text-gray-400">{t('newsletterText')}</span>
          <div className="flex w-full sm:w-auto border-b border-white/30 focus-within:border-white transition-all duration-300">
            <input type="email" placeholder={t('newsletterPlaceholder')} className="bg-transparent text-xs py-2 px-1 tracking-wider outline-none w-full sm:w-64 font-light placeholder:text-gray-600 text-white" />
            <button className="text-xs uppercase tracking-widest font-medium pl-4 pr-1 text-white hover:text-gray-400 transition-colors">{t('signUp')}</button>
          </div>
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="bg-white text-black py-28 px-6 md:py-36">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[11px] tracking-[0.26em] uppercase text-[#222] mb-10 antialiased" style={{ fontFamily: 'var(--font-mt-title)' }}>
            Every Journey Starts with a Feeling
          </h2>
          <div className="space-y-10 antialiased" style={{ fontFamily: 'var(--font-mt-body)' }}>
            <p className="text-base md:text-[19px] font-light leading-[1.85] text-[#222] tracking-wide max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-mt-body)' }}>
              The world is vast, full of wonders. But today&apos;s traveler is often overwhelmed by predictable, template itineraries. You are rarely asked <span className="italic font-normal text-black tracking-normal md:whitespace-nowrap">how you truly wish to experience it.</span>
            </p>
            <p className="text-base md:text-[19px] font-light leading-[1.85] text-[#555] tracking-wide max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-mt-body)' }}>
              We are a private network connecting discerning travelers with on-the-ground fixers — for expeditions, medical access, and direct sourcing — built so you move through China with clarity, not compromise.
            </p>
          </div>
          <div className="mt-14">
            <Link href={`/${locale}/contact`} className="inline-flex items-center gap-3 bg-black text-white text-[10px] tracking-[0.2em] uppercase font-medium px-8 py-4 hover:bg-gray-800 transition-colors">
              Plan Your Journey <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED ROUTES */}
      <section className="bg-[#121318] py-24 px-6 md:py-32 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <h2 className="text-3xl md:text-5xl font-extralight tracking-widest uppercase leading-tight" dangerouslySetInnerHTML={{ __html: t('expeditionsHeading') }} />
            <p className="text-xs tracking-[0.15em] text-gray-400 uppercase font-light max-w-sm leading-relaxed">{t('expeditionsSub')}</p>
            <div className="pt-4"><div className="h-[1px] w-12 bg-white/30" /></div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRoutes.map((route) => (
              <Link href={`/${locale}/routes/${route.slug}`} key={route.slug} className="group relative h-[520px] w-full block overflow-hidden bg-black border border-white/5">
                <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <img src={route.image} alt={route.title} className="w-full h-full object-cover brightness-[0.55] saturate-[0.75] group-hover:brightness-[0.45] transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <div className="absolute top-6 right-6 z-10">
                  <span className="text-[10px] tracking-[0.2em] font-light bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 uppercase text-gray-300">{route.days}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end h-1/2">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-400 mb-2">{route.subtitle}</span>
                  <h3 className="text-base font-light tracking-widest uppercase leading-snug mb-6 text-white group-hover:text-gray-200 transition-colors">{route.title}</h3>
                  <div className="border border-white/40 text-white text-[10px] tracking-widest uppercase text-center py-2.5 group-hover:bg-white group-hover:text-black transition-all duration-300">{t('exploreTripBtn')}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
