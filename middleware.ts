import { NextResponse } from 'next/server';
import { defaultLocale, locales, cookieName } from './app/i18n/settings';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: any) {
  let headers = { 'accept-language': request.headers.get('accept-language') };
  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(req: any) {
  const lng = getLocale(req);

  const isPathStartsWithLocale = locales.some((v) => req.nextUrl.pathname.startsWith(`/${v}`));
  if (lng !== defaultLocale && !isPathStartsWithLocale && !req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  return NextResponse.next();
}
