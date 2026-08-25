import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import { CompanyLocations } from '@/components/company-locations';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { copy, type Locale } from '@/lib/site-data';
import { getPublishedJobs } from '@/lib/data/jobs';

type PageVisual = { src: string; alt: string };
type DocumentVisual = { src: string; title: string; alt: string };
type PageInfo = {
  title: string;
  lead: string;
  image?: string;
  imageAlt?: string;
  visuals?: PageVisual[];
};

const pageData: Record<string, PageInfo> = {
  company: {
    title: 'Rooted in Japan. Growing with Thailand.',
    lead: 'Discover our origins, philosophy, people, and the manufacturing foundation behind Thai Kurabo.',
    image: '/images/company-facility.png',
    imageAlt: 'Thai Kurabo Innovation Center building',
    visuals: [
      { src: '/images/company-warehouse.png', alt: 'Finished textile materials stored inside Thai Kurabo' },
      { src: '/images/company-production.png', alt: 'Thai Kurabo team handling finished yarn in production' },
    ],
  },
  products: {
    title: 'Materials shaped around real needs.',
    lead: 'Explore the product areas and textile capabilities being prepared for publication.',
    image: '/images/products-spinning.png',
    imageAlt: 'Rows of spinning machinery at Thai Kurabo',
    visuals: [
      { src: '/images/products-cotton.png', alt: 'Cotton fibers before textile production' },
      { src: '/images/products-cone-winder.png', alt: 'Automatic cone winding machines in operation' },
    ],
  },
  technology: {
    title: 'Development is a continuous weave.',
    lead: 'See how observation, testing, material knowledge, and manufacturing feedback connect.',
    image: '/images/technology-material.png',
    imageAlt: 'Hands inspecting textile fibers during material development',
    visuals: [
      { src: '/images/technology-center.png', alt: 'Thai Kurabo Innovation Center and research environment' },
      { src: '/images/technology-process.png', alt: 'Textile development process from research to application' },
    ],
  },
  sustainability: {
    title: 'Responsibility in every process.',
    lead: 'Our environmental and social information is being reviewed for responsible publication.',
    image: '/images/sustainability-forest.png',
    imageAlt: 'Forest canopy representing responsible manufacturing',
    visuals: [
      { src: '/images/sustainability-overview.png', alt: 'Overview of Thai Kurabo facilities and environmental initiatives' },
      { src: '/images/sustainability-values.png', alt: 'Thai Kurabo sustainability values and commitments' },
    ],
  },
  news: {
    title: 'Updates from Thai Kurabo.',
    lead: 'Company information, technology stories, and sustainability updates in one place.',
    image: '/images/news-yarn-detail.png',
    imageAlt: 'Yarn moving through precision textile machinery',
    visuals: [
      { src: '/images/news-factory-aerial.png', alt: 'Aerial view of textile manufacturing facilities' },
      { src: '/images/news-spindle-detail.png', alt: 'Close view of spinning equipment and yarn spindles' },
    ],
  },
  careers: {
    title: 'Make the future tangible.',
    lead: 'Explore opportunities to grow with a team focused on craft, technology, and responsible manufacturing.',
    image: '/images/company-warehouse.png',
    imageAlt: 'Textile warehouse and production environment at Thai Kurabo',
    visuals: [
      { src: '/images/company-production.png', alt: 'Production team working with finished yarn' },
      { src: '/images/company-facility.png', alt: 'Thai Kurabo Innovation Center workplace' },
    ],
  },
  contact: { title: 'Start a conversation.', lead: 'Tell us what you need and the right team will follow up. Member sign-in is required before submission.' },
  privacy: { title: 'Privacy notice', lead: 'The final legal-approved privacy notice will be published here before launch.' },
  cookies: { title: 'Cookie policy', lead: 'The final cookie policy and preference controls will be published here before launch.' },
  terms: { title: 'Terms of use', lead: 'The final legal-approved terms will be published here before launch.' },
};

const companyLeaders = [
  {
    src: '/images/leadership-president.png',
    name: 'MR. ATSUHIKO NISHIZAWA',
    role: 'Thai Kurabo President',
    alt: 'Portrait and message from MR. ATSUHIKO NISHIZAWA, Thai Kurabo President',
  },
  {
    src: '/images/leadership-factory-manager.png',
    name: 'MR. MINORU NAKAMURA',
    role: 'Factory Manager',
    alt: 'Portrait and message from MR. MINORU NAKAMURA, Factory Manager',
  },
] as const;

const companyDocuments: readonly DocumentVisual[] = [
  { src: '/images/company-management-philosophy.png', title: 'Management Philosophy', alt: 'Thai Kurabo management philosophy and company symbol' },
  { src: '/images/company-group-companies.png', title: 'Group Companies', alt: 'Kurabo group companies and their locations around the world' },
  { src: '/images/company-location-thailand.png', title: 'Location in Thailand', alt: 'Thai Kurabo offices, factory, and textile development locations in Thailand' },
  { src: '/images/company-history-1.png', title: 'Company Profile', alt: 'Thai Kurabo company profile and key corporate information' },
  { src: '/images/company-history-2.png', title: 'Company History', alt: 'Timeline of Thai Kurabo company history' },
  { src: '/images/company-certifications.png', title: 'Certification', alt: 'Thai Kurabo certifications and industry standards' },
];

const productionDocuments: readonly DocumentVisual[] = [
  { src: '/images/products-main-production.png', title: 'Main Production', alt: 'Overview of Thai Kurabo spinning and weaving products' },
  { src: '/images/products-process-spinning.png', title: 'Production Process — Spinning', alt: 'Thai Kurabo spinning production process from blowing through winding' },
  { src: '/images/products-process-recycled-fiber.png', title: 'Production Process — Recycle Fiber Machine', alt: 'Thai Kurabo recycled fiber production process' },
  { src: '/images/products-process-weaving.png', title: 'Production Process — Weaving', alt: 'Thai Kurabo weaving production process from warping through inspection' },
];

function LeadershipSection() {
  return (
    <section className="leadership-section" aria-labelledby="leadership-title">
      <div className="leadership-heading">
        <h2 id="leadership-title">Leadership</h2>
      </div>
      <div className="leadership-panels">
        {companyLeaders.map((leader) => (
          <figure className="leader-panel" key={leader.name}>
            <Image src={leader.src} alt={leader.alt} width={1920} height={1080} sizes="(max-width: 980px) 100vw, 1240px" />
            <figcaption><strong>{leader.name}</strong><span>{leader.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
function DocumentGallery({ id, title, items }: { id: string; title: string; items: readonly DocumentVisual[] }) {
  return (
    <section className="document-gallery" aria-labelledby={id}>
      <div className="document-gallery-heading">
        <h2 id={id}>{title}</h2>
      </div>
      <div className="document-gallery-grid">
        {items.map((item) => (
          <a className="document-panel" href={item.src} target="_blank" rel="noopener noreferrer" key={item.src}>
            <Image src={item.src} alt={item.alt} width={3508} height={2480} sizes="(max-width: 980px) 100vw, 1240px" />
            <span className="document-caption"><strong>{item.title}</strong><span>View full size</span></span>
          </a>
        ))}
      </div>
    </section>
  );
}

function CustomerSection() {
  return (
    <section className="customer-section" aria-label="Customers">
      <Image
        src="/images/company-customers.png"
        alt="Customer brands: Uniqlo, Gap, L.L.Bean, Muji, Lacoste, Zara, and Burberry"
        width={1920}
        height={1080}
        sizes="(max-width: 980px) 100vw, 1400px"
      />
    </section>
  );
}

function ContactPreview() {
  return (
    <div className="form-layout">
      <div className="contact-intro">
        <h2>Contact request</h2>
        <p>Sign in before submitting so you can track the response in your member portal.</p>
        <CompanyLocations className="contact-locations" />
      </div>
      <form className="demo-form">
        <label>Topic<select defaultValue=""><option value="" disabled>Select a topic</option><option>Product enquiry</option><option>Company information</option><option>Other</option></select></label>
        <div className="field-row"><label>First name<input placeholder="Your first name" /></label><label>Last name<input placeholder="Your last name" /></label></div>
        <label>Email<input type="email" placeholder="name@company.com" /></label>
        <label>Message<textarea rows={5} placeholder="How can we help?" /></label>
        <label className="check-field"><input type="checkbox" /> I have read the privacy notice.</label>
        <Link href="/login" className="button button-primary">Sign in to continue<ArrowIcon /></Link>
      </form>
    </div>
  );
}

async function CareersPreview({ locale }: { locale: Locale }) {
  const jobs = await getPublishedJobs(locale);
  if (!jobs.length) return <div className="editorial-copy"><h2>No open positions.</h2><p>Please check back later for new opportunities.</p></div>;
  return <div className="job-list">{jobs.map((job) => <Link href="/login" key={job.id}><span>OPEN POSITION</span><strong>{job.title}</strong><small>{job.location} · {job.employmentType}</small><ArrowIcon /></Link>)}</div>;
}

function ImageStory({ visuals }: { visuals: PageVisual[] }) {
  return (
    <div className="inner-image-story">
      {visuals.map((visual) => (
        <figure key={visual.src}>
          <Image src={visual.src} alt={visual.alt} fill sizes="(max-width: 980px) 100vw, 50vw" />
        </figure>
      ))}
    </div>
  );
}

export function PublicInnerPage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = copy[locale];
  const data: PageInfo = pageData[slug] ?? { title: 'Content in preparation', lead: 'This page is part of the approved sitemap and is ready for final content.' };
  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main" className="inner-page">
        <section className="inner-hero">
          <div className="inner-hero-copy technical-surface"><p>THAI KURABO / {slug.toUpperCase()}</p><h1>{data.title}</h1><p className="inner-lead">{data.lead}</p></div>
          {data.image && <div className="inner-hero-image"><Image src={data.image} alt={data.imageAlt ?? ''} fill sizes="(max-width: 800px) 100vw, 48vw" /></div>}
        </section>
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={`/${locale}`}>Home</Link><span>/</span><span>{slug}</span></nav>
        <section className="inner-content section-shell">
          {slug === 'contact' ? <ContactPreview /> : (
            <>
              {slug === 'careers' ? <CareersPreview locale={locale} /> : (
                <div className="editorial-copy">
                  <h2>{slug === 'company' ? t.storyTitle : slug === 'technology' ? t.innovationTitle : data.title}</h2>
                  <div><p>{data.lead}</p><p>Final verified copy, detailed specifications, and downloadable resources will be connected through the CMS in a later phase. The current interface establishes the responsive content hierarchy and multilingual layout.</p></div>
                </div>
              )}
              {slug === 'company' && <DocumentGallery id="company-profile-title" title="Company profile" items={companyDocuments} />}
              {slug === 'products' && <DocumentGallery id="production-overview-title" title="Production overview" items={productionDocuments} />}
              {slug === 'company' && <LeadershipSection />}
              {data.visuals && <ImageStory visuals={data.visuals} />}
              {slug === 'company' && <CustomerSection />}
            </>
          )}
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
