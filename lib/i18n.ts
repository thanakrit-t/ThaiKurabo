export const locales = ["th", "en", "ja"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined | null): value is Locale {
  return locales.some((locale) => locale === value);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const [, locale] = pathname.split("/");
  return isLocale(locale) ? locale : "th";
}
