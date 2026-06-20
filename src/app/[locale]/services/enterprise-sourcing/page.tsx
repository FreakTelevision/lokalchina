import Link from "next/link";

export default async function EnterpriseSourcingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="bg-[#0b0c10] text-white min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl px-6 py-32">
        <h1 className="text-3xl md:text-5xl font-light tracking-widest uppercase mb-6" style={{ fontFamily: 'var(--font-condensed)' }}>Enterprise Sourcing &amp; Expeditions</h1>
        <p className="text-gray-400 mb-8">Vetted suppliers. Factory-floor access. The real China supply chain, unlocked.</p>
        <Link href="/en/routes/yiwu-yongkang-sourcing" className="border border-white/40 text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-all">Sourcing Expedition</Link>
      </div>
    </div>
  );
}
