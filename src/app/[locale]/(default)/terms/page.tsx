import { getTranslations } from "next-intl/server";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl prose prose-slate">
      <h1>{locale === "zh" ? "服务条款" : "Terms of Service"}</h1>
      <p className="text-muted-foreground">
        {locale === "zh" ? "最后更新：2026年6月" : "Last updated: June 2026"}
      </p>

      <h2>{locale === "zh" ? "1. 服务说明" : "1. Service Description"}</h2>
      <p>
        {locale === "zh"
          ? "LokalChina 提供旅游路线信息和私人向导预约服务。我们作为平台连接旅行者和本地向导，不直接提供旅游服务。"
          : "LokalChina provides travel route information and private guide booking services. We act as a platform connecting travelers with local guides and do not directly provide tour services."}
      </p>

      <h2>{locale === "zh" ? "2. 预订与支付" : "2. Booking & Payment"}</h2>
      <p>
        {locale === "zh"
          ? "所有预订通过 Stripe 安全支付。支付成功后即确认预订。价格以人民币（CNY）显示。"
          : "All bookings are paid securely via Stripe. Payment confirmation constitutes booking confirmation. Prices are displayed in Chinese Yuan (CNY)."}
      </p>

      <h2>{locale === "zh" ? "3. 取消政策" : "3. Cancellation Policy"}</h2>
      <p>
        {locale === "zh"
          ? "出发前 7 天以上取消：全额退款。出发前 2-7 天取消：退款 50%。出发前 48 小时内取消：不予退款。"
          : "Cancellation 7+ days before start: Full refund. 2-7 days before start: 50% refund. Within 48 hours: No refund."}
      </p>

      <h2>{locale === "zh" ? "4. 责任声明" : "4. Liability"}</h2>
      <p>
        {locale === "zh"
          ? "LokalChina 作为平台方，不承担向导个人行为或第三方服务提供商造成的损失。我们建议所有用户购买旅行保险。"
          : "LokalChina, as a platform, is not liable for losses caused by individual guide conduct or third-party service providers. We recommend all users purchase travel insurance."}
      </p>
    </div>
  );
}
