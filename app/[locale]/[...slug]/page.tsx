import { notFound } from "next/navigation";
import { PublicInnerPage } from "@/components/public-inner-page";
import { locales, type Locale } from "@/lib/site-data";

export default async function InnerPage({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return <PublicInnerPage locale={locale as Locale} slug={slug[0] ?? "company"} />;
}
