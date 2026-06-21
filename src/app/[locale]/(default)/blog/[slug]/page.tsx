"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500"] });

const posts: Record<string, { title: string; date: string; tag: string; content: string }> = {
  "private-guide-china-travel-2026": {
    title: "Beyond the Tourist Wall: Why Private Guides Are the New Way to Experience China in 2026",
    date: "June 20, 2026",
    tag: "Travel",
    content: `<p>China's visa-free policy now covers 76 countries. The result? A surge of first-time visitors who have no idea what they're walking into.</p>
<p>They land in Beijing, join a 40-person group tour, get herded through the Forbidden City in 90 minutes, eat at a restaurant that pays commissions to tour operators, and leave thinking they've "seen China." They haven't. They've seen the tourist wall.</p>
<p>There's a better way. And it's not more expensive than you think.</p>

<h2>The Problem with Mass Tourism in China</h2>
<p>Group tours in China are designed for efficiency, not experience. The economics are simple: a 40-person bus fills fast, guide costs split thin, and margins come from kickbacks at government-certified shopping stops. The itinerary is locked months in advance. You can't change it. You can't skip the jade factory. You can't stay an extra hour at the one place that actually moved you.</p>
<p>For Chinese domestic tourists — who make up 95% of group tour participants — this system works. They speak the language, they know the cultural context, and they're often traveling with extended family. For a foreigner who flew 12 hours to get here? It's a wasted opportunity.</p>

<h2>What a Private Guide Actually Costs</h2>
<p>The assumption is that private guides are for luxury travelers. That's outdated. A competent English-speaking private guide in a second-tier Chinese city costs $150–200 per day. A private car with driver adds another $120–150. Split between two people, that's $135–175 per person per day.</p>
<p>Compare that to a mid-range group tour at $100–150 per person per day. For an extra $35–50 per day, you trade 39 strangers for a personal expert who speaks your language and builds the day around your interests. You're not paying for luxury — you're paying for relevance.</p>

<h2>Three Routes Where a Private Guide Changes Everything</h2>

<h3>Shanxi: The Black Myth Wukong Trail</h3>
<p>Twenty-seven real temples and shrines appear in the game. Most are in rural Shanxi, unreachable by public transit, with zero English signage. A private guide who has studied architectural history — and played the game — transforms a confusing road trip into a pilgrimage. You'll visit the <a href="/en/routes/shanxi-black-myth-pilgrimage">exact sites shown here</a>.</p>

<h3>Jingdezhen: The Porcelain Capital</h3>
<p>Jingdezhen's ceramic studios are hidden down unmarked alleys. The masters don't speak English. The best workshops aren't on TripAdvisor. A bilingual ceramic artist guide takes you inside working studios — not tourist demonstrations — and you leave with a piece you made yourself. <a href="/en/routes/jingdezhen-ceramics">Explore the ceramics route</a>.</p>

<h3>Zhejiang: The Supply Chain Expedition</h3>
<p>Yiwu has 75,000 wholesale booths. Most of them are trading companies, not factories. A veteran sourcing agent knows which booth is legit, which factory actually makes the product, and how to negotiate pricing that isn't padded with hidden commissions. <a href="/en/routes/yiwu-yongkang-sourcing">See how it works</a>.</p>

<h2>The Real Reason to Go Private</h2>
<p>It's not about luxury. It's about access. A private guide is a key — to studios, factories, temples, and conversations that the tourist wall keeps you away from. In a country where the language barrier is a concrete wall, a good guide is the door.</p>`,
  },
  "black-myth-wukong-temples-shanxi-guide": {
    title: "Black Myth Wukong's Real World: A Gamer's Guide to Visiting the Shanxi Temples",
    date: "June 18, 2026",
    tag: "Culture",
    content: `<p>When Game Science released <em>Black Myth: Wukong</em> in August 2024, they didn't just make a game. They built a love letter to Chinese sacred architecture. Of the 36 real-world locations featured, 27 are in Shanxi Province. The game uses photogrammetry — actual photographs mapped onto 3D models — meaning the temples you walk through as the Destined One are the same temples you can stand inside today.</p>
<p>Xiaoxitian Temple saw its annual visitors jump from 30,000 to 1.25 million in under a year. The demand is real. Here's what you need to know before you go.</p>

<h2>You Can't Visit All 27. Here's What to Prioritize.</h2>
<p>A full pilgrimage to every game location takes 12–14 days and covers a geographic triangle from Datong to Yuncheng to Jincheng. Most travelers don't have two weeks. Our six-day route covers 10 S-tier sites — the ones that deliver the strongest game-to-reality impact:</p>
<ul>
<li><strong>Yungang Grottoes (Datong):</strong> UNESCO World Heritage. 51,000 Buddhist statues carved into sandstone cliffs. The colossal Buddha in Cave 20 is the game's Chapter 1 backdrop. Morning light is best.</li>
<li><strong>Hanging Temple (Hunyuan):</strong> A 1,500-year-old temple bolted into a sheer cliff face. The game's trailer opens with it. Climbing tickets sell out — we book 7 days ahead.</li>
<li><strong>Foguang Temple (Wutai):</strong> China's largest surviving Tang Dynasty wooden structure. Liang Sicheng, the father of Chinese architectural history, called it "the First National Treasure." The game's ancient temple interiors draw directly from its bracket sets and beam structures.</li>
<li><strong>Xiaoxitian (Linfen):</strong> The single most photographed location. Over 1,000 miniature Buddha figures suspended from the ceiling. The game's floating statues are a direct reference. This temple went from 30,000 visitors per year to 1.25 million.</li>
</ul>

<h2>The Practical Reality</h2>
<p>These sites are not connected by public transit. English is essentially non-existent. WeChat mini-programs — the only way to book tickets for several sites — require Chinese ID verification. A private English-speaking guide with a car is not a luxury here. It's the difference between seeing the temples and staring at a closed gate.</p>
<p>Our guide Zhao Ming is a former archaeologist who worked on the Yungang excavation and has played the game. He can tell you which beam in Foguang Temple appears in which boss fight. <a href="/en/routes/shanxi-black-myth-pilgrimage">See the full 6-day itinerary</a>.</p>

<h2>Best Time to Go</h2>
<p>April–May and September–October. Shanxi winters drop to -20°C and some rural temples close. July–August brings domestic tourism crowds. Avoid National Day (October 1–7) at all costs — Xiaoxitian gets 91,000 visitors in a single week.</p>`,
  },
  "avoid-china-sourcing-scams-first-timers-guide": {
    title: "How to Avoid Bait-and-Switch When Sourcing from China: A First-Timer's Guide",
    date: "June 15, 2026",
    tag: "Business",
    content: `<p>Every Amazon seller has heard the horror story: approved samples are perfect, but the container that arrives contains cheaper materials, wrong dimensions, or completely different products. The seller is out $15,000–50,000. The supplier has disappeared. This isn't rare — it's the single most common complaint on sourcing forums.</p>
<p>After 10 years of guiding foreign buyers through Yiwu and Zhejiang's manufacturing clusters, here's what actually works to prevent it.</p>

<h2>The Bait-and-Switch Economy</h2>
<p>Yiwu's wholesale market has 75,000 booths. An estimated 60% are trading companies, not factories. They show you a product, you agree on a price, and they outsource production to the cheapest available factory. The sample you approved was made by Factory A. The bulk order comes from Factory B — lower cost, lower quality, higher margin for the middleman. You never know because you never saw the factory floor.</p>
<p>The fix is simple in theory, hard in practice: you need someone on the ground who can distinguish a factory from a trading company, inspect the production line before you pay, and verify the bulk order before it ships.</p>

<h2>The Three-Step Shield</h2>

<h3>1. Pre-Trip Supplier Vetting</h3>
<p>Before you book a flight, someone should be checking: Does this supplier have a valid export license? Are they listed as the actual manufacturer on customs records? Do their references check out? Our team vets 5–10 suppliers per product category before you arrive. You land with a shortlist, not a blank slate. This alone eliminates 80% of the risk.</p>

<h3>2. On-Site Factory Inspection</h3>
<p>Walking a factory floor tells you more than any Alibaba Gold Supplier badge. You're looking for: consistent quality control processes, organized raw material storage, and production capacity that matches what the salesperson claimed. A good sourcing agent knows which questions make a factory owner squirm. We visit 2–3 manufacturing cities based on your product — Yongkang for hardware, Zhuji for socks, Shaoxing for textiles. You choose the clusters; we arrange the access.</p>

<h3>3. Post-Production QC (The Part Everyone Skips)</h3>
<p>This is where most sourcing trips fail. You fly home feeling confident. Six weeks later, the container arrives. The quality is wrong. The supplier claims "this is what you approved." You have no leverage because you're sitting in California and they're sitting in Zhejiang.</p>
<p>The solution: someone stays behind. After you place your first reorder, our agent inspects the bulk production against your approved golden samples <em>before</em> the container is sealed. If something doesn't match, it gets fixed on the spot. You never pay for substandard goods. <a href="/en/routes/yiwu-yongkang-sourcing">Learn more about the full expedition</a>.</p>

<h2>What This Costs vs. What It Saves</h2>
<p>A five-day guided sourcing trip costs $2,490 per person. A single bad container can cost $15,000–50,000. The math isn't complicated. If you're ordering more than $10,000 worth of product, the trip pays for itself on the first order — before you count the improved supplier relationships and better pricing that come from face-to-face negotiation.</p>`,
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div className={`bg-white min-h-screen py-16 px-6 ${montserrat.className}`}>
      <div className="max-w-2xl mx-auto">
        <Link href="/en/blog" className="text-xs text-gray-400 hover:text-gray-600 transition-colors mb-8 inline-block">&larr; Back to Journal</Link>
        <span className="text-[10px] tracking-widest uppercase text-[#c5a880] font-medium block mb-3">{post.tag}</span>
        <h1 className="text-2xl md:text-3xl font-light leading-snug text-black mb-3">{post.title}</h1>
        <p className="text-xs text-gray-400 mb-12">{post.date}</p>
        <article className="max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        <style jsx global>{`
          article p { font-size: 16px; line-height: 1.85; color: #334155; margin-bottom: 1.5em; }
          article h2 { font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 2.5em; margin-bottom: 0.75em; letter-spacing: -0.01em; }
          article h3 { font-size: 16px; font-weight: 600; color: #334155; margin-top: 2em; margin-bottom: 0.5em; }
          article ul, article ol { margin-bottom: 1.5em; padding-left: 1.5em; }
          article li { font-size: 16px; line-height: 1.85; color: #334155; margin-bottom: 0.5em; }
          article strong { color: #0f172a; font-weight: 600; }
          article em { font-style: italic; color: #475569; }
          article a { color: #c5a880; text-decoration: underline; text-underline-offset: 2px; }
          article a:hover { color: #a08040; }
          article blockquote { border-left: 2px solid #c5a880; padding-left: 1.2em; margin: 1.5em 0; color: #64748b; font-style: italic; }
        `}</style>
        <div className="mt-16 pt-8 border-t border-gray-100">
          <Link href="/en/routes" className="text-sm text-[#c5a880] hover:underline">Explore our routes &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
