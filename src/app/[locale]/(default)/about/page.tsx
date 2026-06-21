import { Montserrat } from "next/font/google";
import Link from "next/link";
import { MapPin, UserCheck, Shield, Clock } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const zh = false; // placeholder — will be dynamic below

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZh = locale === "zh";

  const t = {
    heroTitle: isZh ? "你的中国，由你决定" : "Your China, on your terms.",
    heroSub: isZh
      ? "私人定制行程。深入在地体验。零妥协。"
      : "Private itineraries. Deep local access. Zero compromise.",
    body1: isZh
      ? "大多数人来中国，看到的是旅行团允许他们看到的。我们不一样。LokalChina 的存在，是为了让真正有好奇心的人，触碰到中国最真实的一面——通过那些一辈子只做一件事的人的眼睛。"
      : "Most people who come to China see what the tour buses allow them to see. We do things differently. LokalChina exists to give genuinely curious people access to the real thing — through the eyes of the people who have spent their lives mastering it.",
    body2: isZh
      ? "我们不做规模化。我们每年只服务少量客户，每一位都会匹配到最合适的在地专家——陶艺家、考古学者、采购老手——不是导游，是行家。你在景德镇拉坯的那位老师，已经做了十二年陶瓷。你在山西带你进佛光寺的那位，亲自参与过云冈石窟的发掘。"
      : "We don't scale. Every year we work with a small number of clients, and every client is matched with the right person — a ceramic artist, an archaeologist, a veteran sourcing agent — not a tour guide, but a practitioner. The person teaching you to throw clay in Jingdezhen has been doing it for twelve years. The person walking you into Foguang Temple helped excavate the Yungang Grottoes.",
  };

  const differentiators = [
    { icon: <UserCheck className="w-5 h-5" />, title: isZh ? "行家带队" : "Practitioners, not guides", desc: isZh ? "每一位在地专家都是各自领域的资深从业者" : "Every local expert is a seasoned practitioner in their field" },
    { icon: <MapPin className="w-5 h-5" />, title: isZh ? "深度定制" : "Built around you", desc: isZh ? "行程完全按照你的节奏、兴趣和预算设计" : "Every itinerary is designed around your pace, interests, and budget" },
    { icon: <Shield className="w-5 h-5" />, title: isZh ? "出行前后双重保障" : "Before and after you travel", desc: isZh ? "出发前筛选供应商，离境后持续跟进品控" : "We vet before you arrive, and watch your back after you leave" },
    { icon: <Clock className="w-5 h-5" />, title: isZh ? "全年在线支持" : "365-day support", desc: isZh ? "中、英、日、韩多语种团队随时响应" : "Multilingual team available year-round" },
  ];

  return (
    <div className={`bg-white min-h-screen ${montserrat.className}`}>
      {/* Hero */}
      <section className="py-20 md:py-28 px-6 text-center max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-light tracking-wide text-black leading-snug mb-4">
          {t.heroTitle}
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-light tracking-wide max-w-xl mx-auto">
          {t.heroSub}
        </p>
      </section>

      {/* Differentiators */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {differentiators.map((d, i) => (
            <div key={i} className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f5f3f0] text-[#c5a880]">
                {d.icon}
              </div>
              <h3 className="text-xs font-semibold tracking-wider uppercase text-black">{d.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-gray-100 py-20 px-6">
        <div className="max-w-2xl mx-auto space-y-6 text-[15px] leading-relaxed text-gray-600">
          <p>{t.body1}</p>
          <p>{t.body2}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-24 px-6">
        <Link href="/en/routes" className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium text-gray-500 hover:text-black transition-colors">
          {isZh ? "探索路线" : "Explore our routes"} &rarr;
        </Link>
      </section>
    </div>
  );
}
