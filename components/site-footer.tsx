import Image from "next/image";
import Link from "next/link";
import { CompanyLocations } from "@/components/company-locations";
import type { Locale } from "@/lib/site-data";

export function SiteFooter({ locale = "th" }: { locale?: Locale }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Image src="/brand/kurabo-logo.png" width={226} height={70} alt="KURABO" className="footer-logo" />
          <p>Thai Kurabo Co., Ltd.</p>
          <p className="muted">Textile manufacturing and development in Thailand.</p>
        </div>
        <CompanyLocations className="footer-locations" />
        <div className="footer-links">
          <div><strong>Explore</strong><Link href={`/${locale}/company`}>Company</Link><Link href={`/${locale}/technology`}>Technology</Link><Link href={`/${locale}/products`}>Products</Link></div>
          <div><strong>Connect</strong><Link href={`/${locale}/careers`}>Careers</Link><Link href={`/${locale}/contact`}>Contact</Link><Link href="/member">Member area</Link></div>
          <div><strong>Legal</strong><Link href={`/${locale}/privacy`}>Privacy</Link><Link href={`/${locale}/cookies`}>Cookies</Link><Link href={`/${locale}/terms`}>Terms</Link></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Thai Kurabo Co., Ltd.</span><span>Thailand · Japan</span></div>
    </footer>
  );
}
