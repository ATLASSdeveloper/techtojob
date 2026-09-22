import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  if (!isLocale(firstSegment)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-techtojob-locale", firstSegment);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|icon.svg|.*\\..*).*)"],
};
