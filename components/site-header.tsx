"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { copy, type Locale } from "@/lib/site-data";

const links = [
  ["company", "company"],
  ["products", "products"],
  ["technology", "technology"],
  ["sustainability", "sustainability"],
  ["news", "news"],
  ["careers", "careers"],
  ["contact", "contact"],
] as const;

export function SiteHeader({ locale = "th" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const t = copy[locale];

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="header-inner">
        <Link href={`/${locale}`} className="brand" aria-label="Thai Kurabo home">
          <Image src="/brand/kurabo-logo.png" alt="KURABO" width={283} height={88} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([key, path]) => (
            <Link key={key} href={`/${locale}/${path}`}>{t[key]}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-switcher" aria-label="Language">
            {(["th", "en", "ja"] as Locale[]).map((item) => (
              <Link key={item} href={`/${item}`} aria-current={locale === item ? "page" : undefined}>
                {item === "ja" ? "JP" : item.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link href="/login" className="member-link">{t.login}</Link>
          <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      <nav id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation">
        {links.map(([key, path]) => (
          <Link key={key} href={`/${locale}/${path}`} onClick={() => setOpen(false)}>{t[key]}</Link>
        ))}
        <Link href="/login" onClick={() => setOpen(false)}>{t.login}</Link>
      </nav>
    </header>
  );
}
