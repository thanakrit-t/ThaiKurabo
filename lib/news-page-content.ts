export type NewsPageLocale = 'th' | 'en' | 'ja';

export type NewsPageContent = {
  eyebrow: string;
  title: string;
  lead: string;
  sectionTitle: string;
  body: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  image: string;
  imageAlt: string;
  visuals: { src: string; alt: string }[];
};

const newsPageContent: Record<NewsPageLocale, NewsPageContent> = {
  th: {
    eyebrow: 'THAI KURABO / ข่าวสาร',
    title: 'ข่าวสารจากไทยคูราโบ',
    lead: 'ติดตามข่าวสารของบริษัท เรื่องราวด้านเทคโนโลยี และความเคลื่อนไหวด้านความยั่งยืนได้ในที่เดียว',
    sectionTitle: 'เรื่องราวและความเคลื่อนไหวของเรา',
    body: 'พบกับข่าวสารเกี่ยวกับการผลิต สิ่งทอ เทคโนโลยี และกิจกรรมของไทยคุราโบ ซึ่งสะท้อนถึงความมุ่งมั่นในการพัฒนาคุณภาพและการผลิตอย่างรับผิดชอบ',
    breadcrumbHome: 'หน้าแรก',
    breadcrumbCurrent: 'ข่าวสาร',
    image: '/images/news-yarn-detail.png',
    imageAlt: 'เครื่อง Combing Machine ในกระบวนการผลิตเส้นด้าย',
    visuals: [
      { src: '/images/news-factory-aerial.png', alt: 'เส้นใยฝ้ายที่ใช้เป็นวัตถุดิบในการผลิต' },
      { src: '/images/news-spindle-detail.png', alt: 'ภาพข่าวและกิจกรรมของไทยคุราโบ' },
    ],
  },
  en: {
    eyebrow: 'THAI KURABO / NEWS',
    title: 'News from Thai Kurabo',
    lead: 'Follow company updates, technology stories, and sustainability developments in one place.',
    sectionTitle: 'Our stories and updates',
    body: 'Discover news about manufacturing, textiles, technology, and Thai Kurabo activities that reflect our commitment to quality and responsible production.',
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'News',
    image: '/images/news-yarn-detail.png',
    imageAlt: 'Combing machine used in the yarn production process',
    visuals: [
      { src: '/images/news-factory-aerial.png', alt: 'Cotton fiber used as a textile production material' },
      { src: '/images/news-spindle-detail.png', alt: 'News and activities from Thai Kurabo' },
    ],
  },
  ja: {
    eyebrow: 'THAI KURABO / ニュース',
    title: 'タイ・クラボからのお知らせ',
    lead: '企業情報、技術に関するストーリー、サステナビリティの取り組みをお届けします。',
    sectionTitle: '私たちのストーリーと最新情報',
    body: '品質と責任ある生産への取り組みを伝える、製造、繊維、技術、タイ・クラボの活動に関するニュースをご覧いただけます。',
    breadcrumbHome: 'ホーム',
    breadcrumbCurrent: 'ニュース',
    image: '/images/news-yarn-detail.png',
    imageAlt: '糸の生産工程で使用されるコーミングマシン',
    visuals: [
      { src: '/images/news-factory-aerial.png', alt: '繊維製品の原料となる綿繊維' },
      { src: '/images/news-spindle-detail.png', alt: 'タイ・クラボのニュースと活動' },
    ],
  },
};

export function getNewsPageContent(locale: NewsPageLocale): NewsPageContent {
  return newsPageContent[locale];
}
