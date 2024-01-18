export const defaultLocale = 'ko';
export const locales = [defaultLocale, 'en'];
export const defaultNS = 'translation';
export const cookieName = 'i18next';

export function getOptions(lng = defaultLocale, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
