"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Compass } from "lucide-react";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const pathname = usePathname();
  const t = useTranslations("Footer");

  // Hide footer on homepage — it has its own complete dark design
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  if (isHome) return null;

  const companyLinks = [
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/terms`, label: t("terms") },
  ];

  const exploreLinks = [
    { href: `/${locale}/routes`, label: t("routes") },
    { href: `/${locale}/guides`, label: t("guides") },
  ];

  const supportLinks = [
    { href: `/${locale}/faq`, label: t("faq") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const linkClasses =
    "text-sm text-muted-foreground hover:text-foreground transition-colors";

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-bold text-lg text-primary mb-3"
            >
              <Compass className="h-5 w-5" />
              LokalChina
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Private local fixers and custom expeditions for an authentic
              China experience.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">{t("company")}</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Explore</h4>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">{t("support")}</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
