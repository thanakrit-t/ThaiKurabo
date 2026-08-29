import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PublicInnerPage } from "@/components/public-inner-page";
import { locales, type Locale } from "@/lib/site-data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params;

  if (locale === "th" && slug[0] === "products") {
    const title = "ผู้ผลิตเส้นด้ายและผ้าทอคุณภาพ | Thai Kurabo";
    const description = "Thai Kurabo ผู้ผลิตเส้นด้ายฝ้าย เส้นด้ายผสม เส้นด้ายชนิดพิเศษ และผ้าทอหลากหลายโครงสร้าง พร้อมกระบวนการปั่นด้ายและทอผ้าที่ควบคุมคุณภาพทุกขั้นตอน";
    return {
      title: { absolute: title },
      description,
      alternates: { canonical: "/th/products" },
      openGraph: {
        title,
        description,
        url: "/th/products",
        type: "website",
        locale: "th_TH",
        images: [{ url: "/images/products-spinning.png", alt: "กระบวนการปั่นเส้นด้ายของ Thai Kurabo" }],
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
