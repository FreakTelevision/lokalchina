import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const zh = locale === "zh";

  return (
    <div className={`bg-white min-h-screen py-24 px-6 ${montserrat.className}`}>
      <div className="max-w-xl mx-auto space-y-16">

        {/* Intro */}
        <div className="space-y-4">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-medium">About</span>
          <h1 className="text-2xl font-light tracking-wide text-black leading-snug">
            {zh ? "我们不卖标准化的旅行团。\n我们卖的是在地的行家、真实的路子、和为你一个人定制的行程。" : "We don't sell generic group tours. We sell on-the-ground expertise, real access, and itineraries built around one person: you."}
          </h1>
        </div>

        {/* Body */}
        <div className="space-y-8 text-[15px] leading-relaxed text-gray-600">
          <p>
            {zh
              ? "中国太大了，变化太快。大多数外国游客被标准化的旅行产品框死——40人大巴、购物回扣点、永远不变的打卡路线。真正值得去的地方反而没人带路。"
              : "China is too big, and it's changing too fast. Most foreign visitors get trapped inside a standardized product — 40-person buses, commission-shopping stops, the same checklist everyone else follows. The places actually worth visiting are the ones nobody knows how to reach."}
          </p>
          <p>
            {zh
              ? "LokalChina 做的事情很朴素：找到每个领域里真正懂行的本地人，然后把他们直接介绍给你。你在景德镇跟的不是导游，是一个做了十二年陶瓷的独立艺术家。你在山西跟的不是司机，是参与过云冈石窟发掘的前考古工作者。你在义乌跟的不是翻译，是帮200多家亚马逊卖家找过工厂的采购老手。"
              : "What LokalChina does is simple: find the people who actually know what they're doing, in each field, and connect them directly to you. In Jingdezhen, you're not with a tour guide — you're with an independent ceramic artist who's been working clay for twelve years. In Shanxi, you're not with a driver — you're with a former archaeologist who excavated at Yungang. In Yiwu, you're not with a translator — you're with a veteran sourcing agent who's found factories for over 200 Amazon sellers."}
          </p>
          <p>
            {zh
              ? "我们不做大巴生意。我们做的是信任生意——在你来之前帮你筛选、在你走之后帮你盯货。每一个客户都是一个人对一个人的连接，不是流水线上的一单。"
              : "We're not in the bus business. We're in the trust business — vetting before you arrive, watching your back after you leave. Every client is a person-to-person connection, not a unit on an assembly line."}
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid sm:grid-cols-3 gap-10 pt-8 border-t border-gray-100">
          <div className="space-y-2">
            <Link href="/en/routes/jingdezhen-ceramics" className="text-xs font-semibold tracking-wider uppercase text-black hover:text-[#c5a880] transition-colors">
              {zh ? "定制旅行" : "Bespoke Travel"}
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {zh ? "私人向导、手作工坊、古建朝圣——你的节奏，你的旅程。" : "Private guides, hands-on workshops, temple pilgrimages — your pace, your trip."}
            </p>
          </div>
          <div className="space-y-2">
            <Link href="/en/services/medical-concierge" className="text-xs font-semibold tracking-wider uppercase text-black hover:text-[#c5a880] transition-colors">
              {zh ? "医疗陪同" : "Medical Companion"}
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {zh ? "挂号、翻译、陪同检查——我们不做诊疗，我们让诊疗过程畅通无阻。" : "Registration, translation, clinic escort — we don't practice medicine, we make accessing it seamless."}
            </p>
          </div>
          <div className="space-y-2">
            <Link href="/en/routes/yiwu-yongkang-sourcing" className="text-xs font-semibold tracking-wider uppercase text-black hover:text-[#c5a880] transition-colors">
              {zh ? "供应链寻源" : "Supplier Sourcing"}
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              {zh ? "出行前筛选、工厂实地考察、离境后验货——三重防护，杜绝货不对板。" : "Pre-trip vetting, on-site factory visits, post-shipment QC — three shields against bait-and-switch."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
