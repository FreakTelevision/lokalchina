import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = {
  en: [
    { q: "Do I need a visa to travel to China?", a: "China now offers visa-free entry for citizens of many countries. Check with your local Chinese embassy for the latest policy for your nationality. Our team can also provide guidance based on your specific situation." },
    { q: "How do I book a route and guide?", a: "Simply browse our routes page, select a route you like, choose an available guide, fill in your travel details, and pay securely via Stripe. You'll receive a confirmation email immediately." },
    { q: "Can I customize the itinerary?", a: "Absolutely! All our routes are 100% customizable. You can discuss your preferences with your guide before the trip, and adjust the pace, activities, and dining options to your liking." },
    { q: "What languages do the guides speak?", a: "Our guides speak English, Chinese, Japanese, Korean, French, German, Spanish, and more. Each guide's profile lists the languages they speak and their proficiency level." },
    { q: "How does payment work?", a: "We use Stripe for secure payments. You can pay with any major credit card. Payment is processed securely, and you'll receive a receipt by email." },
    { q: "What's the cancellation policy?", a: "Free cancellation up to 7 days before your trip start date. Cancellations within 7 days receive a 50% refund. Cancellations within 48 hours are non-refundable. Contact us for extenuating circumstances." },
    { q: "Is travel insurance included?", a: "Travel insurance is not included in the route price. We strongly recommend purchasing comprehensive travel insurance before your trip." },
    { q: "Can I book a guide without a pre-made route?", a: "Yes! You can browse our guides and contact them directly to create a fully custom itinerary. Just select a guide and mention your preferences when booking." },
  ],
  zh: [
    { q: "来中国需要签证吗？", a: "中国目前已对多个国家的公民实行免签政策。请咨询您当地的中国大使馆了解针对您国籍的最新政策。我们的团队也可以根据您的具体情况提供指导。" },
    { q: "如何预订路线和向导？", a: "浏览我们的路线页面，选择您喜欢的路线，选择一位可用的向导，填写您的旅行信息，然后通过 Stripe 安全支付。您将立即收到确认邮件。" },
    { q: "可以定制行程吗？", a: "当然！我们所有的路线都可以 100% 定制。您可以在出发前与向导讨论您的偏好，自由调整节奏、活动和用餐选择。" },
    { q: "向导说什么语言？", a: "我们的向导会说英语、中文、日语、韩语、法语、德语、西班牙语等多种语言。每位向导的资料页面列出了他们说的语言和熟练程度。" },
    { q: "支付方式是什么？", a: "我们使用 Stripe 进行安全支付。您可以使用任何主流信用卡支付。支付过程安全加密，您会通过邮件收到收据。" },
    { q: "取消政策是什么？", a: "出发前 7 天以上免费取消。7 天内取消退款 50%。48 小时内取消不予退款。特殊情况请联系我们。" },
    { q: "包含旅行保险吗？", a: "路线价格中不包含旅行保险。我们强烈建议您在出发前购买全面的旅行保险。" },
    { q: "可以只预订向导而不选现成路线吗？", a: "可以的！您可以浏览我们的向导，直接联系他们创建完全定制的行程。只需选择一位向导，在预订时说明您的偏好即可。" },
  ],
};

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const items = locale === "zh" ? faqs.zh : faqs.en;

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-12">
        {locale === "zh" ? "常见问题" : "Frequently Asked Questions"}
      </h1>
      <Accordion className="w-full">
        {items.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
