import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { defaultLocale, locales } from './app/i18n/settings';

function getLocale(request: any) {
  const headers = { 'accept-language': request.headers.get('accept-language') };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export default function middleware(req: any) {
  const lng = getLocale(req);

  const isPathStartsWithLocale = locales.some((v) =>
    req.nextUrl.pathname.startsWith(`/${v}`),
  );
  if (
    lng !== defaultLocale &&
    !isPathStartsWithLocale &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
    );
  }

  return NextResponse.next();
}
