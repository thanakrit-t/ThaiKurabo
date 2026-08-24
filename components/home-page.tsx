import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { copy, newsItems, publicSections, type Locale } from "@/lib/site-data";

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const isAsian = locale !== "en";

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main">
        <section className="hero">
          <div className="hero-copy technical-surface">
            <div className="registration-mark mark-top" aria-hidden="true" />
            <div className="registration-mark mark-bottom" aria-hidden="true" />
            <p className="company-name">THAI KURABO CO., LTD.</p>
            <h1 className={isAsian ? "asian-display" : ""}>{t.hero}</h1>
            <p className="hero-intro">{t.intro}</p>
            <div className="hero-actions">
              <Link href={`/${locale}/technology`} className="button button-primary">{t.primary}<ArrowIcon /></Link>
              <Link href={`/${locale}/company`} className="button button-secondary">{t.secondary}<ArrowIcon /></Link>
            </div>
          </div>
          <div className="hero-media">
            <Image src="/images/technology-hero.png" alt="Thai Kurabo textile manufacturing technology" fill priority sizes="(max-width: 900px) 100vw, 56vw" />
            <div className="image-index"><span>TK</span><span>TECH / 01</span></div>
          </div>
          <div className="punch-rail" aria-label="Featured sections">
            <div className="punch-pattern" aria-hidden="true" />
            {publicSections.map((item) => (
              <Link key={item.key} href={`/${locale}/${item.href}`}>
                <span className="rail-hole" aria-hidden="true" />
                <span>{t[item.key]}</span>
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </section>

        <section className="story-section section-shell">
          <div className="story-heading">
            <h2 className={isAsian ? "asian-heading" : ""}>{t.storyTitle}</h2>
          </div>
          <div className="story-copy">
            <p>{t.story}</p>
            <Link href={`/${locale}/company`} className="text-link">{t.secondary}<ArrowIcon /></Link>
          </div>
          <div className="story-image">
            <Image src="/images/about.png" alt="Thai Kurabo company facilities" fill sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
        </section>

        <section className="product-section">
          <div className="product-image">
            <Image src="/images/factory.jpg" alt="Textile production at Thai Kurabo" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="product-copy dark-surface">
            <h2 className={isAsian ? "asian-heading" : ""}>{t.productTitle}</h2>
            <p>Materials begin with an application, a process, and the people who depend on consistent performance.</p>
            <Link href={`/${locale}/products`} className="button button-light">{t.products}<ArrowIcon /></Link>
            <div className="thread-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          </div>
        </section>

        <section className="innovation-section section-shell">
          <div className="innovation-copy">
            <h2 className={isAsian ? "asian-heading" : ""}>{t.innovationTitle}</h2>
            <p>Our development process connects observation, testing, material knowledge, and manufacturing feedback.</p>
            <Link href={`/${locale}/technology`} className="text-link">{t.technology}<ArrowIcon /></Link>
          </div>
          <div className="innovation-media">
            <Image src="/images/development.png" alt="Thai Kurabo textile research and development" fill sizes="(max-width: 900px) 100vw, 58vw" />
            <div className="media-note"><span>DEVELOPMENT</span><span>OBSERVE · TEST · REFINE</span></div>
          </div>
        </section>

        <section className="sustainability-section section-shell">
          <div className="sustainability-art"><Image src="/images/sustainability.png" alt="Thai Kurabo sustainability initiatives" fill sizes="(max-width: 900px) 100vw, 44vw" /></div>
          <div className="sustainability-copy">
            <h2 className={isAsian ? "asian-heading" : ""}>{t.sustainabilityTitle}</h2>
            <p>We are preparing verified details about environmental initiatives, people, and governance for publication.</p>
            <Link href={`/${locale}/sustainability`} className="text-link">{t.sustainability}<ArrowIcon /></Link>
          </div>
        </section>

        <section className="news-section section-shell">
          <div className="section-title-row"><h2>{t.news}</h2><Link href={`/${locale}/news`} className="text-link">View all<ArrowIcon /></Link></div>
          <div className="news-list">
            {newsItems.map((item) => (
              <Link href={`/${locale}/news`} className="news-row" key={item.title}>
                <time>{item.date}</time><span>{item.category}</span><strong>{item.title}</strong><ArrowIcon />
              </Link>
            ))}
          </div>
        </section>

        <section className="career-cta dark-surface">
          <div><h2 className={isAsian ? "asian-heading" : ""}>{t.careersTitle}</h2><p>Explore open roles and learn how our teams work together.</p></div>
          <Link href={`/${locale}/careers`} className="button button-light">{t.careers}<ArrowIcon /></Link>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
