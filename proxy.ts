import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "fr", "de", "nl"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export function proxy(request: NextRequest) {
  // Skip non-page routes
  const pathname = request.nextUrl.pathname;
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|favicon.ico|.*\\..*).*)"],
};
