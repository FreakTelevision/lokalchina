import { getTranslations } from "next-intl/server";
import { Compass, Shield, HeartHandshake } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Homepage");

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <Compass className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold mb-4">
          {locale === "zh" ? "关于 LokalChina" : "About LokalChina"}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {locale === "zh"
            ? "我们致力于为全球旅行者提供最地道的中国体验。"
            : "We are dedicated to providing the most authentic China experience for travelers worldwide."}
        </p>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2>{locale === "zh" ? "我们的使命" : "Our Mission"}</h2>
        <p>
          {locale === "zh"
            ? "LokalChina 的使命是让每一位来中国的外国游客都能享受到个性化、高质量的旅行体验。我们相信，旅行不只是打卡景点——而是与本地文化的深度连接。"
            : "LokalChina's mission is to ensure every foreign visitor to China enjoys a personalized, high-quality travel experience. We believe travel is not just about checking off landmarks — it's about deep connections with local culture."}
        </p>

        <h2>{locale === "zh" ? "我们的向导" : "Our Guides"}</h2>
        <p>
          {locale === "zh"
            ? "每一位 LokalChina 向导都经过严格的背景审查和多轮面试。他们不仅精通多国语言，更对本地历史、文化、美食有深厚了解。我们只选择那些真正热爱分享、乐于助人的向导。"
            : "Every LokalChina guide undergoes rigorous background checks and multiple interview rounds. They are not only multilingual but also deeply knowledgeable about local history, culture, and cuisine. We only select guides who genuinely love sharing and helping others."}
        </p>

        <h2>{locale === "zh" ? "我们的承诺" : "Our Promise"}</h2>
        <ul>
          <li>
            <strong>{locale === "zh" ? "透明定价" : "Transparent Pricing"}</strong> — {locale === "zh" ? "没有隐藏费用，没有强制购物。" : "No hidden fees, no forced shopping stops."}
          </li>
          <li>
            <strong>{locale === "zh" ? "灵活定制" : "Flexible Customization"}</strong> — {locale === "zh" ? "你的旅行你做主，随时调整行程。" : "Your trip, your rules. Adjust the itinerary anytime."}
          </li>
          <li>
            <strong>{locale === "zh" ? "安全第一" : "Safety First"}</strong> — {locale === "zh" ? "认证向导、合法运营、全程保险。" : "Licensed guides, legal operations, comprehensive insurance."}
          </li>
          <li>
            <strong>24/7 {locale === "zh" ? "客服支持" : "Support"}</strong> — {locale === "zh" ? "中英双语客服随时在线。" : "Bilingual support available anytime."}
          </li>
        </ul>
      </div>
    </div>
  );
}
