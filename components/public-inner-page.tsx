import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import { CompanyLocations } from '@/components/company-locations';
import { CookiePolicy } from '@/components/cookie-policy';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { companyContent } from '@/lib/company-page-content';
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

type SustainabilityContent = {
  title: string;
  description: string;
  pillars: { label: string; title: string; body: string }[];
  certificationsTitle: string;
  certificationsBody: string;
  certificationsNote: string;
  certificationsAlt: string;
  progressTitle: string;
  milestones: { year: string; label: string }[];
};

const sustainabilityContent: Record<Locale, SustainabilityContent> = {
  en: {
    title: 'Responsible manufacturing for today and tomorrow',
    description: 'We focus on resources, energy, quality, safety, and traceability to build a business that grows together with society.',
    pillars: [
      { label: 'Environment', title: 'Using resources wisely', body: 'Solar power, natural gas, and process improvements help reduce manufacturing loss.' },
      { label: 'Circularity', title: 'Keeping materials in motion', body: 'Fiber recycling machinery supports material recovery and the development of circular products.' },
      { label: 'People & Safety', title: 'Quality begins with people', body: 'Training, safety, and a culture of continuous improvement underpin our manufacturing standards.' },
    ],
    certificationsTitle: 'Standards that support traceability',
    certificationsBody: 'Our Company Profile lists important certifications and material programs including GRS, GOTS, OCS, BCI, Cotton USA, and regenagri, reflecting our approach to materials and traceability.',
    certificationsNote: "Use of certification marks in public materials is subject to each standard's requirements.",
    certificationsAlt: 'Thai Kurabo standards and certifications',
    progressTitle: 'Efficiency milestones',
    milestones: [
      { year: '2010', label: 'Natural gas introduced as fuel' },
      { year: '2021', label: 'Energy-efficiency improvement program' },
      { year: '2023', label: 'Solar panels installed' },
      { year: '2024', label: 'Fiber recycling machinery added' },
    ],
  },
  th: {
    title: 'การผลิตที่รับผิดชอบต่อวันนี้และวันข้างหน้า',
    description: 'เราให้ความสำคัญกับทรัพยากร พลังงาน คุณภาพ ความปลอดภัย และการตรวจสอบย้อนกลับ เพื่อพัฒนาธุรกิจที่เติบโตควบคู่กับสังคม',
    pillars: [
      { label: 'Environment', title: 'ใช้ทรัพยากรอย่างคุ้มค่า', body: 'พลังงานแสงอาทิตย์ การใช้ก๊าซธรรมชาติ และการพัฒนากระบวนการที่ช่วยลดการสูญเสียจากการผลิต' },
      { label: 'Circularity', title: 'สร้างวงจรให้วัสดุ', body: 'เครื่องจักรรีไซเคิลเส้นใยสนับสนุนการนำวัตถุดิบกลับมาใช้ใหม่และการพัฒนาผลิตภัณฑ์หมุนเวียน' },
      { label: 'People & Safety', title: 'คุณภาพเริ่มจากคน', body: 'การฝึกอบรม ความปลอดภัย และวัฒนธรรมการปรับปรุงอย่างต่อเนื่อง คือรากฐานของมาตรฐานการผลิต' },
    ],
    certificationsTitle: 'มาตรฐานที่ช่วยยืนยันแหล่งที่มา',
    certificationsBody: 'ข้อมูล Company Profile ระบุการรับรองและโครงการวัตถุดิบสำคัญ เช่น GRS, GOTS, OCS, BCI, Cotton USA และ regenagri ซึ่งสะท้อนแนวทางด้านวัตถุดิบและการตรวจสอบย้อนกลับ',
    certificationsNote: 'การใช้งานเครื่องหมายรับรองบนสื่อสาธารณะควรเป็นไปตามเงื่อนไขของแต่ละมาตรฐาน',
    certificationsAlt: 'มาตรฐานและการรับรองของ Thai Kurabo',
    progressTitle: 'หมุดหมายด้านประสิทธิภาพ',
    milestones: [
      { year: '2010', label: 'เริ่มใช้ก๊าซธรรมชาติเป็นเชื้อเพลิง' },
      { year: '2021', label: 'ดำเนินโครงการเปลี่ยนระบบแสงสว่างเป็น LED แล้วเสร็จ' },
      { year: '2023', label: 'ติดตั้งแผงพลังงานแสงอาทิตย์' },
      { year: '2024', label: 'เพิ่มเครื่องจักรรีไซเคิลเส้นใย' },
    ],
  },
  ja: {
    title: '今日と未来に責任を持つものづくり',
    description: '資源、エネルギー、品質、安全、トレーサビリティを重視し、社会とともに成長する事業を目指します。',
    pillars: [
      { label: 'Environment', title: '資源を大切に使う', body: '太陽光発電、天然ガス、工程改善により、生産ロスの低減を進めます。' },
      { label: 'Circularity', title: '素材を循環させる', body: '繊維リサイクル設備によって素材の再利用と循環型製品の開発を支えます。' },
      { label: 'People & Safety', title: '品質は人から始まる', body: '教育、安全、継続的改善の文化が、ものづくりの基盤です。' },
    ],
    certificationsTitle: 'トレーサビリティを支える基準',
    certificationsBody: '会社案内にはGRS、GOTS、OCS、BCI、Cotton USA、regenagriなどの認証・原料プログラムを掲載しています。',
    certificationsNote: '認証マークの公開利用には、各基準の条件が適用されます。',
    certificationsAlt: '認証と基準',
    progressTitle: '効率化の歩み',
    milestones: [
      { year: '2010', label: '天然ガスを導入' },
      { year: '2021', label: '省エネルギー改善プロジェクト' },
      { year: '2023', label: '太陽光パネルを設置' },
      { year: '2024', label: '繊維リサイクル設備を増設' },
    ],
  },
};

const pageData: Record<string, PageInfo> = {
  company: {
    title: 'Rooted in Japan. Growing with Thailand.',
    lead: 'Discover our origins, philosophy, people, and the manufacturing foundation behind Thai Kurabo.',
    image: '/images/company-factory-top-view.jpg',
    imageAlt: 'Aerial view of the Thai Kurabo factory and rooftop solar panels',
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
      { src: '/images/products-winding-thread.jpg', alt: 'Thread winding process at Thai Kurabo' },
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
    image: '/images/topview2.png',
    imageAlt: 'Aerial view of the Thai Kurabo manufacturing facility',
    visuals: [
      { src: '/images/company-production.png', alt: 'Production team working with finished yarn' },
      { src: '/images/company-facility.png', alt: 'Thai Kurabo Innovation Center workplace' },
    ],
  },
  contact: { title: 'Start a conversation.', lead: 'Tell us what you need and the right team will follow up. Member sign-in is required before submission.' },
  privacy: { title: 'Privacy notice', lead: 'The final legal-approved privacy notice will be published here before launch.' },
  cookies: { title: 'Cookie policy', lead: 'Understand the technologies this website uses and control optional cookies at any time.' },
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

const productFaqs = [
  { question: 'Thai Kurabo ผลิตเส้นด้ายประเภทใดบ้าง?', answer: 'ผลิตภัณฑ์ประกอบด้วยเส้นด้ายฝ้าย เส้นด้ายฝ้ายผสมใยสังเคราะห์ และเส้นด้ายชนิดพิเศษ เช่น Compact Yarn, Slub Yarn, Stretch Yarn, Siro Spun Yarn, Multiple Folded Yarn และ Recycled Fiber Blended Yarn' },
  { question: 'Thai Kurabo ผลิตผ้าทอแบบใดบ้าง?', answer: 'บริษัทผลิตผ้าฝ้าย ผ้าใยสังเคราะห์ ผ้าเส้นใยผสม และผ้ายืด โดยรองรับโครงสร้าง Plain, Twill, Sateen, Dobby และ Fancy Cloth' },
  { question: 'สามารถสอบถามการผลิตตามความต้องการเฉพาะได้หรือไม่?', answer: 'ลูกค้าสามารถส่งรายละเอียดการใช้งาน ประเภทเส้นใย เบอร์ด้าย โครงสร้างผ้า และคุณสมบัติที่ต้องการให้ทีมงานพิจารณาความเหมาะสมและความเป็นไปได้ในการผลิต' },
  { question: 'มีผลิตภัณฑ์ที่ใช้เส้นใยรีไซเคิลหรือไม่?', answer: 'Thai Kurabo มีผลิตภัณฑ์ Recycled Fiber Blended Yarn และมีกระบวนการเตรียมเส้นใยรีไซเคิล สำหรับสัดส่วนและคุณสมบัติเฉพาะควรสอบถามทีมงานตามข้อกำหนดของแต่ละผลิตภัณฑ์' },
] as const;

function ThaiProductsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: productFaqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
  };

  return (
    <main id="main" className="products-page" lang="th">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="products-hero">
        <div className="products-hero-copy technical-surface">
          <p>THAI KURABO / ผลิตภัณฑ์</p>
          <h1>ผลิตภัณฑ์เส้นด้ายและผ้าทอที่พัฒนาเพื่อตอบโจทย์การใช้งานจริง</h1>
          <p className="products-hero-lead">Thai Kurabo Co., Ltd. เป็นผู้ผลิตเส้นด้ายและผ้าทอในประเทศไทย ครอบคลุมตั้งแต่การปั่นเส้นด้ายฝ้าย เส้นด้ายผสม และเส้นด้ายชนิดพิเศษ ไปจนถึงการทอผ้าหลากหลายโครงสร้างสำหรับการนำไปพัฒนาเป็นเครื่องแต่งกาย สิ่งทอสำหรับบ้าน และผลิตภัณฑ์สิ่งทอประเภทต่าง ๆ</p>
        </div>
        <div className="products-hero-image"><Image src="/images/products-spinning.png" alt="กระบวนการปั่นเส้นด้ายของ Thai Kurabo" fill priority sizes="(max-width: 900px) 100vw, 46vw" /></div>
      </section>

      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/th">หน้าหลัก</Link><span>/</span><span>ผลิตภัณฑ์</span></nav>

      <article className="products-article">
        <section className="products-intro products-shell"><p>เราให้ความสำคัญกับการเลือกใช้วัตถุดิบ กระบวนการผลิตที่เป็นระบบ และการตรวจสอบคุณภาพในแต่ละขั้นตอน เพื่อให้ได้วัสดุสิ่งทอที่มีคุณสมบัติสอดคล้องกับความต้องการของลูกค้า ไม่ว่าจะเป็นด้านสัมผัส ความแข็งแรง ความยืดหยุ่น รูปลักษณ์ หรือความเหมาะสมต่อกระบวนการผลิตขั้นต่อไป</p></section>

        <section className="products-section products-shell products-split">
          <div>
            <p className="products-eyebrow">SPINNING PRODUCTS</p><h2>ผลิตภัณฑ์เส้นด้าย</h2>
            <p>Thai Kurabo ผลิตเส้นด้ายหลายประเภท เพื่อรองรับการออกแบบเนื้อผ้าและการใช้งานที่แตกต่างกัน ได้แก่</p>
            <ul className="products-spec-list">
              <li><strong>เส้นด้ายฝ้าย (Cotton Yarn)</strong><span>รองรับเบอร์ด้ายตั้งแต่ Ne 6/1 ถึง Ne 100/1</span></li>
              <li><strong>เส้นด้ายฝ้ายผสมใยสังเคราะห์ (Cotton Synthetic Blended Yarn)</strong><span>รองรับเบอร์ด้ายตั้งแต่ Ne 16/1 ถึง Ne 80/1</span></li>
              <li><strong>Compact Yarn</strong><span>เส้นด้ายที่มีโครงสร้างกระชับ เหมาะกับงานที่ต้องการพื้นผิวเรียบร้อยและคุณภาพสม่ำเสมอ</span></li>
              <li><strong>Manufactured Slub Yarn</strong><span>เส้นด้ายที่สร้างมิติและลวดลายเฉพาะบนเนื้อผ้า</span></li>
              <li><strong>Layered Yarn</strong><span>เส้นด้ายแบบหลายชั้นสำหรับพัฒนาคุณสมบัติของผ้า</span></li>
              <li><strong>Stretch Yarn</strong><span>เส้นด้ายสำหรับผ้าที่ต้องการความยืดหยุ่นและการเคลื่อนไหวที่คล่องตัว</span></li>
              <li><strong>Siro Spun Yarn</strong><span>เส้นด้ายที่ผลิตด้วยเทคนิคการปั่นเพื่อให้ได้โครงสร้างและลักษณะเฉพาะ</span></li>
              <li><strong>Multiple Folded Yarn</strong><span>เส้นด้ายควบหลายเส้นสำหรับงานที่ต้องการโครงสร้างด้ายแตกต่างจากเส้นเดี่ยว</span></li>
              <li><strong>Recycled Fiber Blended Yarn</strong><span>เส้นด้ายผสมเส้นใยรีไซเคิล เป็นอีกทางเลือกสำหรับการพัฒนาผลิตภัณฑ์สิ่งทอที่คำนึงถึงการใช้ทรัพยากร</span></li>
            </ul>
            <p>ความหลากหลายของชนิดและเบอร์ด้ายช่วยให้ลูกค้าสามารถเลือกวัสดุให้เหมาะกับน้ำหนักผ้า สัมผัส ลวดลาย และคุณสมบัติของผลิตภัณฑ์ปลายทางได้อย่างยืดหยุ่น</p>
          </div>
          <figure className="products-sticky-media"><Image src="/images/products-winding-thread.jpg" alt="กระบวนการกรอเส้นด้ายของ Thai Kurabo" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 42vw" /></figure>
        </section>

        <section className="products-section products-process-section"><div className="products-shell">
          <p className="products-eyebrow">SPINNING PROCESS</p><h2>กระบวนการผลิตเส้นด้ายที่ควบคุมอย่างเป็นระบบ</h2>
          <p>กระบวนการปั่นด้ายของ Thai Kurabo ประกอบด้วยขั้นตอนสำคัญตั้งแต่การเตรียมเส้นใยจนได้เส้นด้ายพร้อมใช้งาน</p>
          <ol className="products-process-grid">
            <li><strong>Blowing</strong><span>เปิด ผสม และทำความสะอาดเส้นใยเบื้องต้น</span></li><li><strong>Carding</strong><span>จัดเรียงเส้นใยและกำจัดสิ่งปนเปื้อนที่ยังหลงเหลือ</span></li><li><strong>Combing</strong><span>คัดเส้นใยสั้นและจัดแนวเส้นใยให้สม่ำเสมอยิ่งขึ้นตามชนิดของด้าย</span></li><li><strong>Drawing</strong><span>รวมและยืดเส้นใยเพื่อปรับความสม่ำเสมอ</span></li><li><strong>Roving</strong><span>ลดขนาดและเตรียมเส้นใยก่อนเข้าสู่การปั่น</span></li><li><strong>Spinning</strong><span>ปั่นเส้นใยให้เป็นเส้นด้ายตามขนาดและโครงสร้างที่กำหนด</span></li><li><strong>Winding</strong><span>กรอเส้นด้ายและเตรียมสำหรับการตรวจสอบหรือส่งต่อสู่กระบวนการทอ</span></li>
          </ol>
          <p>การควบคุมแต่ละขั้นตอนมีส่วนสำคัญต่อความสม่ำเสมอ ความแข็งแรง และคุณภาพโดยรวมของเส้นด้าย ซึ่งส่งผลโดยตรงต่อประสิทธิภาพในกระบวนการทอและคุณภาพของผ้าสำเร็จ</p>
        </div></section>

        <section className="products-section products-shell products-split products-split-reverse">
          <figure className="products-sticky-media"><Image src="/images/products-process-recycled-fiber.png" alt="กระบวนการเตรียมเส้นใยรีไซเคิลของ Thai Kurabo" width={3508} height={2480} sizes="(max-width: 900px) 100vw, 42vw" /></figure>
          <div><p className="products-eyebrow">RECYCLED FIBER</p><h2>เส้นใยรีไซเคิลสำหรับการใช้ทรัพยากรอย่างคุ้มค่า</h2><p>Thai Kurabo มีกระบวนการเตรียมเส้นใยรีไซเคิล โดยนำวัสดุที่เหมาะสมเข้าสู่ขั้นตอน Cutting, Recycle, Carding และ Blowroom เพื่อแปรสภาพกลับเป็นเส้นใยสำหรับใช้เป็นส่วนผสมในการผลิตเส้นด้าย</p><p>แนวทางนี้ช่วยเพิ่มทางเลือกในการใช้วัตถุดิบและสนับสนุนการพัฒนาผลิตภัณฑ์สิ่งทอที่พิจารณาการใช้ทรัพยากรอย่างมีประสิทธิภาพ ทั้งนี้ สัดส่วนเส้นใยและคุณสมบัติของด้ายควรกำหนดตามวัตถุประสงค์ของผลิตภัณฑ์และข้อกำหนดของลูกค้าแต่ละราย</p><Link className="products-text-link" href="/th/sustainability">ดูแนวทางด้านความยั่งยืน <ArrowIcon /></Link></div>
        </section>

        <section className="products-section products-weaving-section"><div className="products-shell products-split">
          <div><p className="products-eyebrow">WEAVING PRODUCTS</p><h2>ผลิตภัณฑ์ผ้าทอ</h2><p>ในส่วนของการทอผ้า Thai Kurabo สามารถผลิตผ้าจากเส้นใยและโครงสร้างที่หลากหลาย ได้แก่ ผ้าฝ้าย ผ้าใยสังเคราะห์ ผ้าเส้นใยผสม และผ้ายืด พร้อมรองรับรูปแบบการทอหลัก เช่น</p>
            <ul className="products-spec-list"><li><strong>Plain</strong><span>โครงสร้างทอพื้นฐานที่มีความเรียบและใช้งานได้หลากหลาย</span></li><li><strong>Twill</strong><span>โครงสร้างลายทแยง เหมาะกับผ้าที่ต้องการบุคลิกและความทนทาน</span></li><li><strong>Sateen</strong><span>โครงสร้างที่ช่วยสร้างพื้นผิวเรียบและลักษณะเงางาม</span></li><li><strong>Dobby</strong><span>การทอที่สร้างลวดลายหรือพื้นผิวบนผ้า</span></li><li><strong>Fancy Cloth</strong><span>ผ้าที่พัฒนาให้มีลักษณะพิเศษตามแนวคิดการออกแบบและการใช้งาน</span></li></ul>
            <p>ผ้าทอเหล่านี้สามารถนำไปต่อยอดเป็นเสื้อผ้า กางเกง แจ็กเก็ต เดนิม และสิ่งทอสำหรับบ้าน รวมถึงผลิตภัณฑ์อื่นตามความเหมาะสมของโครงสร้างผ้า</p></div>
          <figure className="products-sticky-media"><Image src="/images/products-main-production.png" alt="ผลิตภัณฑ์เส้นด้ายและผ้าทอของ Thai Kurabo" width={3508} height={2480} sizes="(max-width: 900px) 100vw, 42vw" /></figure>
        </div></section>

        <section className="products-section products-shell">
          <p className="products-eyebrow">WEAVING PROCESS</p><h2>กระบวนการทอผ้า<br />ตั้งแต่การเตรียมเส้นด้าย<br />จนถึงการตรวจสอบคุณภาพ</h2><p>กระบวนการผลิตผ้าทอประกอบด้วย 5 ขั้นตอนหลัก</p>
          <ol className="products-process-grid products-process-five"><li><strong>Warping</strong><span>จัดเตรียมเส้นด้ายยืนตามจำนวนและความยาวที่กำหนด</span></li><li><strong>Sizing</strong><span>เคลือบหรือเตรียมเส้นด้ายยืนเพื่อช่วยให้เหมาะกับกระบวนการทอ</span></li><li><strong>Drawing</strong><span>ร้อยและจัดเส้นด้ายเข้าสู่ชุดควบคุมของเครื่องทอ</span></li><li><strong>Weaving</strong><span>ทอเส้นด้ายยืนและเส้นด้ายพุ่งให้เป็นผ้าตามโครงสร้างที่ออกแบบ</span></li><li><strong>Inspecting</strong><span>ตรวจสอบคุณภาพผ้าหลังการทอ ก่อนส่งต่อไปยังกระบวนการถัดไป</span></li></ol>
          <p>สำหรับกระบวนการย้อมและตกแต่งสำเร็จ สามารถดำเนินการร่วมกับบริษัทในกลุ่ม TTDF ในประเทศไทยตามข้อมูลกระบวนการผลิตของบริษัท</p><Link className="products-text-link" href="/th/technology">เรียนรู้เพิ่มเติมเกี่ยวกับเทคโนโลยี <ArrowIcon /></Link>
          <div className="products-weaving-gallery" aria-label="ภาพกระบวนการทอผ้าและตรวจสอบคุณภาพ">
            <figure><Image src="/images/products-weaving-machine.png" alt="กระบวนการทอผ้าด้วยเครื่องจักรของ Thai Kurabo" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 50vw" /></figure>
            <figure><Image src="/images/products-weaving-inspection.jpg" alt="กระบวนการตรวจสอบคุณภาพผ้าทอของ Thai Kurabo" width={1536} height={1024} sizes="(max-width: 900px) 100vw, 50vw" /></figure>
          </div>
        </section>

        <section className="products-section products-choice-section"><div className="products-shell products-choice-grid"><div><p className="products-eyebrow">MATERIAL SELECTION</p><h2>เลือกวัสดุสิ่งทอให้เหมาะกับผลิตภัณฑ์ของคุณ</h2></div><div><p>การเลือกเส้นด้ายหรือผ้าที่เหมาะสมควรพิจารณาหลายปัจจัยร่วมกัน เช่น ประเภทเส้นใย เบอร์ด้าย น้ำหนักผ้า โครงสร้างการทอ ความยืดหยุ่น สัมผัส สี การตกแต่งสำเร็จ และมาตรฐานที่ผลิตภัณฑ์ปลายทางต้องปฏิบัติตาม</p><p>ทีมงาน Thai Kurabo พร้อมรับข้อมูลความต้องการของลูกค้า เพื่อร่วมพิจารณาประเภทเส้นด้ายและผ้าทอที่เหมาะสมกับแนวคิดผลิตภัณฑ์และกระบวนการผลิต</p></div></div></section>

        <section className="products-section products-shell products-faq" aria-labelledby="products-faq-title"><p className="products-eyebrow">FAQ</p><h2 id="products-faq-title">คำถามที่พบบ่อย</h2><div className="products-faq-list">{productFaqs.map(({ question, answer }) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>

        <section className="products-cta"><div className="products-shell"><p className="products-eyebrow">CONTACT THAI KURABO</p><h2>กำลังมองหาผู้ผลิตเส้นด้ายและผ้าทอในประเทศไทย?</h2><p>ติดต่อ Thai Kurabo เพื่อสอบถามรายละเอียดผลิตภัณฑ์ คุณสมบัติทางเทคนิค ปริมาณการสั่งผลิต และเงื่อนไขการพัฒนาผลิตภัณฑ์ร่วมกัน</p><Link href="/th/contact">ติดต่อเรา <ArrowIcon /></Link></div></section>
      </article>
    </main>
  );
}

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

function CompanyPage({ locale }: { locale: Locale }) {
  const content = companyContent[locale];
  const kuraboUrl = locale === 'en' ? 'https://www.kurabo.co.jp/english/' : 'https://www.kurabo.co.jp/';

  return (
    <main id="main" className="company-page" lang={locale}>
      <section className="company-page-hero">
        <div className="company-page-shell company-page-hero-inner">
          <div>
            <p className="company-page-eyebrow company-page-eyebrow-light">ABOUT THAI KURABO</p>
            <h1>{content.heroTitle}</h1>
          </div>
          <p>{content.heroDescription}</p>
        </div>
      </section>

      <section className="company-page-section company-page-shell company-story">
        <div>
          <div className="company-section-heading">
            <p className="company-page-eyebrow">OUR PARENT COMPANY</p>
            <h2>{content.parentTitle}</h2>
          </div>
          {content.parentParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <a className="company-parent-link" href={kuraboUrl} target="_blank" rel="noreferrer">{content.parentLink}</a>
        </div>
        <div className="company-media-frame company-document-media">
          <Image
            src="/images/company-group-companies.png"
            alt={content.parentAlt}
            fill
            quality={90}
            sizes="(max-width: 900px) 100vw, 59vw"
          />
        </div>
      </section>

      <section className="company-facts-section">
        <div className="company-page-shell">
          <div className="company-section-heading">
            <p className="company-page-eyebrow">COMPANY PROFILE</p>
            <h2>{content.profileTitle}</h2>
          </div>
          <div className="company-fact-grid">
            {content.facts.map((fact) => <div key={`${fact.value}-${fact.label}`}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="company-page-section company-philosophy">
        <div className="company-page-shell company-philosophy-inner">
          <p className="company-page-eyebrow company-page-eyebrow-light">MANAGEMENT PHILOSOPHY</p>
          <blockquote>The Kurabo Group contributes to a better future through the creation of new value.</blockquote>
          <p>{content.philosophy}</p>
        </div>
      </section>

      <section className="company-page-section company-leadership-section" aria-label="Company leadership">
        <div className="company-page-shell company-leadership-grid">
          <div className="company-leadership-card">
            <Image
              src="/images/leadership-president.png"
              alt="President of Thai Kurabo"
              width={1920}
              height={1080}
              sizes="(max-width: 900px) 50vw, 590px"
            />
          </div>
          <div className="company-leadership-card">
            <Image
              src="/images/leadership-factory-manager.png"
              alt="Factory Manager of Thai Kurabo"
              width={1920}
              height={1080}
              sizes="(max-width: 900px) 50vw, 590px"
            />
          </div>
        </div>
      </section>

      <section className="company-page-section company-page-shell">
        <div className="company-section-heading">
          <p className="company-page-eyebrow">MILESTONES</p>
          <h2>{content.journeyTitle}</h2>
        </div>
        <div className="company-timeline">
          {content.milestones.map((milestone) => <div key={milestone.year}><strong>{milestone.year}</strong><span>{milestone.label}</span></div>)}
        </div>
        <div className="company-wide-media">
          <Image src="/images/company-history-2.png" alt={content.historyAlt} fill sizes="100vw" />
        </div>
      </section>

      <section className="company-page-section company-locations-section">
        <div className="company-page-shell company-story">
          <div>
            <div className="company-section-heading">
              <p className="company-page-eyebrow">OUR LOCATIONS</p>
              <h2>{content.locationsTitle}</h2>
            </div>
            <div className="company-location-list">
              {content.locations.map((location) => <p key={location.label}><strong>{location.label}:</strong> {location.address}</p>)}
            </div>
          </div>
          <div className="company-media-frame company-document-media">
            <Image
              src="/images/company-location-thailand.png"
              alt={content.locationsAlt}
              fill
              quality={90}
              sizes="(max-width: 900px) 100vw, 59vw"
            />
          </div>
        </div>
      </section>

      <section className="company-page-section company-brands-section" aria-labelledby="trusted-brands-title">
        <div className="company-page-shell">
          <div className="company-brands-heading">
            <h2 id="trusted-brands-title">Trusted by leading brands</h2>
          </div>
          <div className="company-brands-media">
            <Image
              src="/images/company-customers.png"
              alt="Customer brands: Uniqlo, Gap, L.L.Bean, Muji, Lacoste, Zara, and Burberry"
              width={1920}
              height={1080}
              quality={90}
              sizes="(max-width: 900px) 100vw, 1180px"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function SustainabilityPage({ locale }: { locale: Locale }) {
  const content = sustainabilityContent[locale];

  return (
    <main id="main" className="sustainability-page" lang={locale}>
      <section className="sustainability-page-hero">
        <div className="sustainability-page-shell sustainability-page-hero-inner">
          <div>
            <p className="sustainability-page-eyebrow">SUSTAINABILITY</p>
            <h1>{content.title}</h1>
          </div>
          <p>{content.description}</p>
        </div>
      </section>

      <section className="sustainability-page-section sustainability-page-shell" aria-label="Sustainability pillars">
        <div className="sustainability-pillar-grid">
          {content.pillars.map((pillar, index) => (
            <article key={pillar.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{pillar.label}</h2>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sustainability-page-section sustainability-certification-section">
        <div className="sustainability-page-shell sustainability-certification-story">
          <div className="sustainability-certification-copy">
            <p className="sustainability-page-eyebrow">CERTIFICATIONS</p>
            <h2>{content.certificationsTitle}</h2>
            <p>{content.certificationsBody}</p>
            <p className="sustainability-note">{content.certificationsNote}</p>
          </div>
          <div className="sustainability-certification-media">
            <Image src="/images/company-certifications.png" alt={content.certificationsAlt} fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="sustainability-page-section sustainability-page-shell">
        <div className="sustainability-progress-heading">
          <p className="sustainability-page-eyebrow">PROGRESS</p>
          <h2>{content.progressTitle}</h2>
        </div>
        <div className="sustainability-progress-grid">
          {content.milestones.map((milestone) => (
            <div key={milestone.year}>
              <strong>{milestone.year}</strong>
              <span>{milestone.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export function PublicInnerPage({ locale, slug }: { locale: Locale; slug: string }) {
  const t = copy[locale];
  const data: PageInfo = pageData[slug] ?? { title: 'Content in preparation', lead: 'This page is part of the approved sitemap and is ready for final content.' };

  if (slug === 'company') {
    return (
      <>
        <SiteHeader locale={locale} />
        <CompanyPage locale={locale} />
        <SiteFooter locale={locale} />
      </>
    );
  }

  if (slug === 'sustainability') {
    return (
      <>
        <SiteHeader locale={locale} />
        <SustainabilityPage locale={locale} />
        <SiteFooter locale={locale} />
      </>
    );
  }

  if (slug === 'products' && locale === 'th') {
    return (
      <>
        <SiteHeader locale={locale} />
        <ThaiProductsPage />
        <SiteFooter locale={locale} />
      </>
    );
  }

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
              {slug === 'careers' ? <CareersPreview locale={locale} /> : slug === 'cookies' ? <CookiePolicy locale={locale} /> : (
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
