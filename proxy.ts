import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const hasLocale = locales.some(
        (locale) =>
            pathname === `/${locale}` ||
            pathname.startsWith(`/${locale}/`)
    );

    if (hasLocale) {
        return NextResponse.next();
    }

    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        "/((?!_next|favicon.ico|api|robots.txt|sitemap.xml).*)",
    ],
};
