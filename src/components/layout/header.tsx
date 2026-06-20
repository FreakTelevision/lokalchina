"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";
import { Compass, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}/routes`, label: t("routes") },
    { href: `/${locale}/guides`, label: t("guides") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/faq`, label: t("faq") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  if (isHome) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Compass className="h-6 w-6" />
          <span className="hidden sm:inline">LokalChina</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith(link.href)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LocaleSwitcher />

          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link href={`/${locale}/dashboard`}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="hidden md:inline-flex"
              >
                {t("logout")}
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href={`/${locale}/auth/login`}>
                <Button variant="ghost" size="sm">
                  {t("login")}
                </Button>
              </Link>
              <Link href={`/${locale}/auth/register`}>
                <Button size="sm">{t("register")}</Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
