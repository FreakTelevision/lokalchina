import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const zh = locale === "zh";

  return (
    <div className={`bg-white min-h-screen py-20 px-6 ${montserrat.className}`}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-16 space-y-4">
          <h1 className="text-3xl font-light tracking-widest uppercase text-black">
            {zh ? "关于 LokalChina" : "About LokalChina"}
          </h1>
          <p className="text-base text-gray-500 leading-relaxed max-w-lg">
            {zh
              ? "我们不卖旅行团。我们把真正了解中国的人，带给真正想了解中国的人。"
              : "We don't sell tour packages. We connect people who truly know China with people who genuinely want to."}
          </p>
        </div>

        <article className="space-y-12">
          <div>
            <h2 className="text-xs tracking-[0.2em] uppercase text-[#c5a880] font-medium mb-4">What We Do</h2>
            <p className="text-[15px] leading-relaxed text-gray-600">
              {zh
                ? "LokalChina 是一个私人策展网络。我们绕过标准化的旅行模板，为每一位客户匹配经过严格甄选的在地专家——无论是深度文化探索、医疗陪同，还是供应链考察，我们确保您接触到的不是旅游大巴的停靠点，而是真实运转的中国。"
                : "LokalChina is a private curation network. We bypass the standardized travel template and match every client with rigorously vetted on-the-ground experts — whether for deep cultural exploration, medical accompaniment, or supply chain scouting. What you access is not a tour bus stop. It's the real, functioning China."}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 pt-4">
            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-black">
                {zh ? "定制旅行" : "Bespoke Travel"}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {zh
                  ? "私人向导、手作体验、古建朝圣——你的节奏，你的兴趣，你的旅程。"
                  : "Private guides, hands-on craft, temple pilgrimages — your pace, your interests, your trip."}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-black">
                {zh ? "医疗陪同" : "Medical Companion"}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {zh
                  ? "挂号、翻译、陪同检查——我们不做诊疗，我们让诊疗过程畅通无阻。"
                  : "Registration, translation, escort — we don't practice medicine, we make accessing it frictionless."}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-black">
                {zh ? "供应链寻源" : "Supplier Sourcing"}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {zh
                  ? "出行前筛选、工厂实地考察、离境后验货——三重防护，杜绝货不对板。"
                  : "Pre-trip vetting, on-site inspection, post-shipment QC — three layers of protection against bait-and-switch."}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <h2 className="text-xs tracking-[0.2em] uppercase text-[#c5a880] font-medium mb-4">
              {zh ? "我们的承诺" : "Our Promise"}
            </h2>
            <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[#c5a880] mt-0.5">—</span>
                {zh ? "每一位向导都经过背景审查和多轮面试" : "Every guide undergoes background verification and multiple interview rounds"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c5a880] mt-0.5">—</span>
                {zh ? "价格透明，不设隐藏费用" : "Transparent pricing with zero hidden fees"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c5a880] mt-0.5">—</span>
                {zh ? "行程完全可定制，随时按需调整" : "Fully customizable itineraries, adjusted on the fly"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c5a880] mt-0.5">—</span>
                {zh ? "中文、英文、日文、韩文等多语言支持" : "Support in English, Japanese, Korean, and Chinese"}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
