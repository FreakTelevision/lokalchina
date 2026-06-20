"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/footer";

export function FooterWrapper({ locale }: { locale: string }) {
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  if (isHome) return null;

  return (
    <div className="contents">
      {/* @ts-expect-error Footer is an async server component used in client wrapper */}
      <Footer locale={locale} />
    </div>
  );
}
