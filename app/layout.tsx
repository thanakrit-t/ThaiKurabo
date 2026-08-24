import type { Metadata } from "next";
import "@fontsource/barlow-condensed/400.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/noto-sans/400.css";
import "@fontsource/noto-sans/600.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thaikurabo.co.th"),
  title: { default: "Thai Kurabo | Precision woven into progress", template: "%s | Thai Kurabo" },
  description: "Official corporate website of Thai Kurabo Co., Ltd. — textile manufacturing, technology, sustainability, and careers in Thailand.",
};

const designContract = `THESIS: Precision Loom turns textile-making logic into the site architecture, refusing the generic corporate hero-and-card stack.
OWN-WORLD: Official Kurabo blue, ink navy, woven white paper, cool rules, punched apertures, documentary machinery, condensed display type.
STORY: Visitors meet Thai Kurabo through production evidence, understand its Japanese-Thai foundation, then move to technology, products, contact, or careers.
FIRST VIEWPORT: White navigation above a 44/56 editorial split; oversized headline and two actions left, dominant loom photograph right, punch-card rail crossing the seam.
FORM: Precision Loom, selected visual comp; seed 20e92176.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>
        <span className="design-contract" data-seed="20e92176" aria-hidden="true">{designContract}</span>
        {children}
      </body>
    </html>
  );
}
