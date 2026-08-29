import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PublicInnerPage } from "@/components/public-inner-page";
import { locales, type Locale } from "@/lib/site-data";

const productMetadata: Record<Locale, { title: string; description: string; openGraphLocale: string; imageAlt: string }> = {
  th: {
    title: "ผู้ผลิตเส้นด้ายและผ้าทอคุณภาพ | Thai Kurabo",
    description: "Thai Kurabo ผู้ผลิตเส้นด้ายฝ้าย เส้นด้ายผสม เส้นด้ายชนิดพิเศษ และผ้าทอหลากหลายโครงสร้าง พร้อมกระบวนการปั่นด้ายและทอผ้าที่ควบคุมคุณภาพทุกขั้นตอน",
    openGraphLocale: "th_TH",
    imageAlt: "กระบวนการปั่นเส้นด้ายของ Thai Kurabo",
  },
  en: {
    title: "Quality Yarn and Woven Fabric Manufacturer | Thai Kurabo",
    description: "Thai Kurabo manufactures cotton, blended, specialty, and recycled-fiber yarns plus woven fabrics in a range of structures, with quality control throughout spinning and weaving.",
    openGraphLocale: "en_US",
    imageAlt: "Yarn spinning process at Thai Kurabo",
  },
  ja: {
    title: "高品質な糸・織物メーカー | Thai Kurabo",
    description: "Thai Kuraboは、綿糸、混紡糸、特殊糸、再生繊維混紡糸、多様な組織の織物を製造し、紡績から製織まで各工程で品質を管理しています。",
    openGraphLocale: "ja_JP",
    imageAlt: "Thai Kuraboの紡績工程",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params;

  if (locales.includes(locale as Locale) && slug[0] === "products") {
    const currentLocale = locale as Locale;
    const { title, description, openGraphLocale, imageAlt } = productMetadata[currentLocale];
    return {
      title: { absolute: title },
      description,
      alternates: {
        canonical: `/${currentLocale}/products`,
        languages: { th: "/th/products", en: "/en/products", ja: "/ja/products" },
      },
      openGraph: {
        title,
        description,
        url: `/${currentLocale}/products`,
        type: "website",
        locale: openGraphLocale,
        images: [{ url: "/images/products-spinning.png", alt: imageAlt }],
      },
    };
  }

  return {};
}

export default async function InnerPage({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return <PublicInnerPage locale={locale as Locale} slug={slug[0] ?? "company"} />;
}
