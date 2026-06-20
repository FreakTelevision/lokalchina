"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Compass } from "lucide-react";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const { data: session } = useSession();
  const t = useTranslations("Navigation");

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[280px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5" />
            LokalChina
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 mt-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center px-3 py-2.5 text-base font-medium rounded-md transition-colors",
                pathname.startsWith(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Separator className="my-4" />

        {session?.user ? (
          <div className="space-y-2">
            <Link
              href={`/${locale}/dashboard`}
              onClick={onClose}
              className="flex items-center px-3 py-2.5 text-base font-medium rounded-md text-muted-foreground hover:bg-accent"
            >
              {t("dashboard")}
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                signOut();
                onClose();
              }}
            >
              {t("logout")}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link
              href={`/${locale}/auth/login`}
              onClick={onClose}
            >
              <Button variant="outline" className="w-full">
                {t("login")}
              </Button>
            </Link>
            <Link
              href={`/${locale}/auth/register`}
              onClick={onClose}
            >
              <Button className="w-full">{t("register")}</Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
