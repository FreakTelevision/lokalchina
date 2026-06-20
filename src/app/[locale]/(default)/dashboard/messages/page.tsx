import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Dashboard");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("messages")}</h1>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t("noMessages")}</h3>
          <p className="text-muted-foreground">
            {locale === "zh"
              ? "当你预订行程后，可以在这里与向导沟通。"
              : "After you book a trip, you can communicate with your guide here."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
