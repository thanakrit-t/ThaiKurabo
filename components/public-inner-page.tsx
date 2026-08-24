import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { copy, type Locale } from '@/lib/site-data';
import { getPublishedJobs } from '@/lib/data/jobs';

const pageData: Record<string, { title: string; lead: string; image?: string }> = {
  company: { title: 'Rooted in Japan. Growing with Thailand.', lead: 'Discover our origins, philosophy, people, and the manufacturing foundation behind Thai Kurabo.', image: '/images/about.png' },
  products: { title: 'Materials shaped around real needs.', lead: 'Explore the product areas and textile capabilities being prepared for publication.', image: '/images/factory.jpg' },
  technology: { title: 'Development is a continuous weave.', lead: 'See how observation, testing, material knowledge, and manufacturing feedback connect.', image: '/images/technology-hero.png' },
  sustainability: { title: 'Responsibility in every process.', lead: 'Our environmental and social information is being reviewed for responsible publication.', image: '/images/sustainability.png' },
  news: { title: 'Updates from Thai Kurabo.', lead: 'Company information, technology stories, and sustainability updates in one place.', image: '/images/development.png' },
  careers: { title: 'Make the future tangible.', lead: 'Explore opportunities to grow with a team focused on craft, technology, and responsible manufacturing.', image: '/images/about.png' },
  contact: { title: 'Start a conversation.', lead: 'Tell us what you need and the right team will follow up. Member sign-in is required before submission.' },
  privacy: { title: 'Privacy notice', lead: 'The final legal-approved privacy notice will be published here before launch.' },
  cookies: { title: 'Cookie policy', lead: 'The final cookie policy and preference controls will be published here before launch.' },
  terms: { title: 'Terms of use', lead: 'The final legal-approved terms will be published here before launch.' },
};

function ContactPreview() {
  return (
    <div className="form-layout">
      <div><h2>Contact request</h2><p>Sign in before submitting so you can track the response in your member portal.</p></div>
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

export function PublicInnerPage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = copy[locale];
  const data = pageData[slug] ?? { title: 'Content in preparation', lead: 'This page is part of the approved sitemap and is ready for final content.' };
  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main" className="inner-page">
        <section className="inner-hero">
          <div className="inner-hero-copy technical-surface"><p>THAI KURABO / {slug.toUpperCase()}</p><h1>{data.title}</h1><p className="inner-lead">{data.lead}</p></div>
          {data.image && <div className="inner-hero-image"><Image src={data.image} alt="" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>}
        </section>
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href={`/${locale}`}>Home</Link><span>/</span><span>{slug}</span></nav>
        <section className="inner-content section-shell">
          {slug === 'contact' ? <ContactPreview /> : slug === 'careers' ? <CareersPreview locale={locale} /> : (
            <div className="editorial-copy">
              <h2>{slug === 'company' ? t.storyTitle : slug === 'technology' ? t.innovationTitle : data.title}</h2>
              <div><p>{data.lead}</p><p>Final verified copy, detailed specifications, and downloadable resources will be connected through the CMS in a later phase. The current interface establishes the responsive content hierarchy and multilingual layout.</p></div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
