import Link from "next/link";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500"] });

const posts = [
  {
    slug: "private-guide-china-travel-2026",
    title: "Beyond the Tourist Wall: Why Private Guides Are the New Way to Experience China in 2026",
    date: "June 20, 2026",
    excerpt: "China's visa-free expansion brings 50M+ new visitors. But mass tourism misses the point. Here's why private local guides are replacing group tours — and how to find the right one.",
    tag: "Travel",
    image: "/images/pexels-lwr1999-38098072_2.jpg",
  },
  {
    slug: "black-myth-wukong-temples-shanxi-guide",
    title: "Black Myth Wukong's Real World: A Gamer's Guide to Visiting the Shanxi Temples",
    date: "June 18, 2026",
    excerpt: "27 real locations inspired the game. We visited the best ones. Here's exactly how to plan your pilgrimage — from Yungang Grottoes to Xiaoxitian's floating sculptures.",
    tag: "Culture",
    image: "/images/pexels-neko-170431012-32762553.jpg",
  },
  {
    slug: "avoid-china-sourcing-scams-first-timers-guide",
    title: "How to Avoid Bait-and-Switch When Sourcing from China: A First-Timer's Guide",
    date: "June 15, 2026",
    excerpt: "Amazon sellers lose $15,000+ per bad shipment. Pre-trip vetting, on-site inspection, and post-production QC are the only real protections. Here's what we've learned from 10+ years in Yiwu.",
    tag: "Business",
    image: "/images/routes/yiwu/factory-1.jpg",
  },
];

export default async function BlogPage() {
  return (
    <div className="bg-white min-h-screen py-16 px-6">
      <div className={`max-w-4xl mx-auto ${montserrat.className}`}>
        <div className="mb-16 text-center">
          <h1 className="text-3xl font-light tracking-widest uppercase text-black">The LokalChina Journal</h1>
          <p className="text-xs text-gray-400 mt-4 tracking-wide">Stories, guides, and honest advice for travelers and entrepreneurs navigating China.</p>
        </div>
        <div className="grid gap-12">
          {posts.map((post) => (
            <Link key={post.slug} href={`/en/blog/${post.slug}`} className="group grid md:grid-cols-3 gap-8 items-start hover:opacity-90 transition-opacity">
              <div className="aspect-[16/10] overflow-hidden rounded-lg bg-gray-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-2 space-y-3">
                <span className="text-[10px] tracking-widest uppercase text-[#c5a880] font-medium">{post.tag}</span>
                <h2 className="text-xl font-medium text-gray-900 leading-snug group-hover:text-[#c5a880] transition-colors">{post.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
                <span className="text-[10px] text-gray-400 tracking-wide">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
