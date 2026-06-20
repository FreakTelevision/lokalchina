import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default async function BookingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  const t = await getTranslations("Dashboard");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("myBookings")}</h1>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t("noBookings")}</h3>
          <p className="text-muted-foreground mb-6">{t("noBookingsDesc")}</p>
          <Link href={`/${locale}/routes`}>
            <Button>{t("browseRoutes")}</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
