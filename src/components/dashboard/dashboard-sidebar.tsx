"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Calendar, MessageSquare, User, LogOut } from "lucide-react";

interface DashboardSidebarProps {
  locale: string;
}

export function DashboardSidebar({ locale }: DashboardSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("Dashboard");

  const links = [
    {
      href: `/${locale}/dashboard`,
      label: t("overview"),
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/dashboard/bookings`,
      label: t("myBookings"),
      icon: Calendar,
    },
    {
      href: `/${locale}/dashboard/messages`,
      label: t("messages"),
      icon: MessageSquare,
    },
    {
      href: `/${locale}/dashboard/profile`,
      label: t("profile"),
      icon: User,
    },
  ];

  return (
    <aside className="w-full md:w-56 shrink-0">
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
              pathname === link.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
        <Button
          variant="ghost"
          className="justify-start gap-2 text-muted-foreground hover:text-accent-foreground"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          <span className="md:hidden lg:inline">Log Out</span>
        </Button>
      </nav>
    </aside>
  );
}
