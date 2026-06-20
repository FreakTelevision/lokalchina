import { getTranslations } from "next-intl/server";
import { auth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  const t = await getTranslations("Dashboard");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{t("profile")}</h1>

      <Card>
        <CardHeader>
          <CardTitle>
            {locale === "zh" ? "个人资料" : "Personal Information"}
          </CardTitle>
          <CardDescription>
            {locale === "zh" ? "更新您的个人信息。" : "Update your personal information."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="name">{locale === "zh" ? "姓名" : "Name"}</Label>
            <Input id="name" defaultValue={session?.user?.name || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{locale === "zh" ? "邮箱" : "Email"}</Label>
            <Input id="email" type="email" defaultValue={session?.user?.email || ""} disabled />
          </div>
          <Button>
            {locale === "zh" ? "保存修改" : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
