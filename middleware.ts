import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

let defaultLocale = "ko";
let locales = ["ko", "en"];

function getLocale(request: any) {
	let headers = { "accept-language": request.headers.get("accept-language") };
	let languages = new Negotiator({ headers }).languages();

	return match(languages, locales, defaultLocale);
}

export function middleware(request: any) {
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

	if (pathnameHasLocale) return;

	const locale = getLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname}`;

	return Response.redirect(request.nextUrl);
}

export const config = {
	matcher: ["/((?!_next).*)"],
};
