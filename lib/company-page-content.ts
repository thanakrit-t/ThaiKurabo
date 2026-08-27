import type { Locale } from '@/lib/site-data';

export type CompanyContent = {
  heroTitle: string;
  heroDescription: string;
  parentTitle: string;
  parentParagraphs: [string, string];
  parentLink: string;
  parentAlt: string;
  profileTitle: string;
  facts: { value: string; label: string }[];
  philosophy: string;
  journeyTitle: string;
  milestones: { year: string; label: string }[];
  historyAlt: string;
  locationsTitle: string;
  locations: { label: string; address: string }[];
  locationsAlt: string;
};

export const companyContent: Record<Locale, CompanyContent> = {
  en: {
    heroTitle: 'More than 55 years of continuous manufacturing progress',
    heroDescription: 'From a textile manufacturing base in Thailand, we have grown into a key member of the KURABO Group network connecting expertise, technology, and markets worldwide.',
    parentTitle: 'Part of a group founded in 1888',
    parentParagraphs: [
      'Thai Kurabo Co., Ltd. is a group company of Kurabo Industries Ltd. Kurabo began as Kurashiki Spinning Works in Kurashiki, Okayama, Japan, on March 9, 1888. From its textile roots, the group has expanded into chemical products, advanced technology, food and services, and real estate.',
      'KURABO’s official chronology records the establishment of Thai Kurabo in Thailand in 1968. Thai Kurabo began production in 1970 and today specializes in spinning and weaving while continuously advancing its processes, materials, and technology.',
    ],
    parentLink: 'Visit KURABO official website ↗',
    parentAlt: 'KURABO Group global network',
    profileTitle: 'At a glance',
    facts: [
      { value: '1968', label: 'Established in Thailand' },
      { value: '550', label: 'Million Baht registered capital' },
      { value: '1,906', label: 'Million Baht FY2025 sales' },
      { value: '1970', label: 'Production began' },
      { value: 'Textile', label: 'Spinning & Weaving' },
      { value: 'Thailand', label: 'Bangkok head office / Pathum Thani factory' },
    ],
    philosophy: 'Our group works toward a better society by continually creating new value.',
    journeyTitle: 'Our journey',
    milestones: [
      { year: '1968', label: 'Thai Kurabo established in Thailand' },
      { year: '1970', label: 'Production operations began' },
      { year: '1996', label: 'SKC operations began' },
      { year: '2010', label: 'Natural gas introduced as fuel' },
      { year: '2019', label: 'Spinning and weaving operations integrated' },
      { year: '2023', label: 'Solar panels installed' },
      { year: '2024', label: 'Fiber recycling machinery added' },
    ],
    historyAlt: 'Thai Kurabo history and milestones',
    locationsTitle: 'Connecting our office, factory, and group companies',
    locations: [
      { label: 'Head Office', address: '9th Floor, Sindhorn Tower 2, Wireless Road, Bangkok 10330' },
      { label: 'Factory', address: '14/8, 14/12 Phaholyothin Road, Khlong Nueng, Khlong Luang, Pathum Thani 12120' },
      { label: 'TTDF', address: 'Bang Pu Mai, Samut Prakan 10280' },
    ],
    locationsAlt: 'Office and factory locations in Thailand',
  },
  th: {
    heroTitle: 'กว่า 55 ปีของการผลิตที่ไม่หยุดพัฒนา',
    heroDescription: 'เราเติบโตจากฐานการผลิตสิ่งทอในประเทศไทย สู่สมาชิกสำคัญของเครือข่าย KURABO Group ที่เชื่อมโยงความรู้ เทคโนโลยี และตลาดทั่วโลก',
    parentTitle: 'ส่วนหนึ่งของกลุ่มบริษัทที่ก่อตั้งตั้งแต่ปี 1888',
    parentParagraphs: [
      'Thai Kurabo Co., Ltd. เป็นบริษัทในเครือ Kurabo Industries Ltd. ซึ่งเริ่มต้นจาก Kurashiki Spinning Works ที่เมืองคุราชิกิ จังหวัดโอคายามะ ประเทศญี่ปุ่น เมื่อวันที่ 9 มีนาคม 1888 จากรากฐานด้านสิ่งทอ KURABO ได้ขยายธุรกิจสู่เคมีภัณฑ์ เทคโนโลยีขั้นสูง อาหารและบริการ รวมถึงอสังหาริมทรัพย์',
      'ประวัติอย่างเป็นทางการของ KURABO ระบุว่าบริษัท Thai Kurabo ก่อตั้งในประเทศไทยเมื่อปี 1968 และเริ่มดำเนินการผลิตในปี 1970 ปัจจุบันเชี่ยวชาญด้านการปั่นด้ายและทอผ้า พร้อมพัฒนากระบวนการ วัตถุดิบ และเทคโนโลยีอย่างต่อเนื่อง',
    ],
    parentLink: 'เว็บไซต์ทางการ KURABO ↗',
    parentAlt: 'เครือข่ายบริษัท KURABO Group ทั่วโลก',
    profileTitle: 'ข้อมูลบริษัท',
    facts: [
      { value: '1968', label: 'ก่อตั้งในประเทศไทย' },
      { value: '550', label: 'ล้านบาท ทุนจดทะเบียน' },
      { value: '1,906', label: 'ล้านบาท ยอดขายปีงบฯ 2025' },
      { value: '1970', label: 'เริ่มดำเนินการผลิต' },
      { value: 'Textile', label: 'Spinning & Weaving' },
      { value: 'Thailand', label: 'สำนักงานใหญ่ กรุงเทพฯ / โรงงาน ปทุมธานี' },
    ],
    philosophy: 'เครือ KURABO มุ่งสร้างสังคมแห่งอนาคตที่ดีขึ้น ผ่านการสร้างคุณค่าใหม่',
    journeyTitle: 'เส้นทางการพัฒนา',
    milestones: [
      { year: '1968', label: 'ก่อตั้ง Thai Kurabo ในประเทศไทย' },
      { year: '1970', label: 'เริ่มดำเนินการผลิต' },
      { year: '1996', label: 'เริ่มการดำเนินงานของ SKC' },
      { year: '2010', label: 'นำก๊าซธรรมชาติมาใช้เป็นเชื้อเพลิง' },
      { year: '2019', label: 'รวมกระบวนการปั่นด้ายและทอผ้าเข้าสู่ระบบเดียวกัน' },
      { year: '2023', label: 'ติดตั้งแผงพลังงานแสงอาทิตย์' },
      { year: '2024', label: 'เพิ่มเครื่องจักรรีไซเคิลเส้นใย' },
    ],
    historyAlt: 'ประวัติและหมุดหมายสำคัญของ Thai Kurabo',
    locationsTitle: 'เชื่อมสำนักงาน โรงงาน และบริษัทในกลุ่ม',
    locations: [
      { label: 'สำนักงานใหญ่', address: 'ชั้น 9 อาคารสินธร ทาวเวอร์ 2 ถนนวิทยุ กรุงเทพฯ 10330' },
      { label: 'โรงงาน', address: '14/8, 14/12 ถนนพหลโยธิน คลองหนึ่ง คลองหลวง ปทุมธานี 12120' },
      { label: 'TTDF', address: 'บางปูใหม่ สมุทรปราการ 10280' },
    ],
    locationsAlt: 'ที่ตั้งสำนักงานและโรงงานในประเทศไทย',
  },
  ja: {
    heroTitle: '55年以上にわたる、絶え間ないものづくりの進化',
    heroDescription: 'タイの繊維生産拠点から、知識・技術・市場を世界につなぐKURABOグループの重要な一員へと成長してきました。',
    parentTitle: '1888年創業のグループの一員',
    parentParagraphs: [
      'Thai Kurabo Co., Ltd.は、倉敷紡績株式会社（KURABO）のグループ会社です。KURABOは1888年3月9日、岡山県倉敷市で倉敷紡績所として創業しました。繊維事業を原点に、化成品、先進技術、食品・サービス、不動産へと事業を広げています。',
      'KURABOの公式沿革には、1968年にタイでThai Kuraboを設立したことが記載されています。1970年に生産を開始し、現在は紡績・織布を中心に、工程、原料、技術の継続的な改善に取り組んでいます。',
    ],
    parentLink: 'KURABO公式サイト ↗',
    parentAlt: 'KURABOグループのグローバルネットワーク',
    profileTitle: '会社概要',
    facts: [
      { value: '1968', label: 'タイで設立' },
      { value: '550', label: '登録資本金（百万バーツ）' },
      { value: '1,906', label: '2025年度売上高（百万バーツ）' },
      { value: '1970', label: '生産開始' },
      { value: 'Textile', label: '紡績・織布' },
      { value: 'Thailand', label: 'バンコク本社／パトゥムターニー工場' },
    ],
    philosophy: 'KURABOグループは、新たな価値の創造を通じて、より良い未来に貢献します。',
    journeyTitle: '歩み',
    milestones: [
      { year: '1968', label: 'タイ・クラボウ設立' },
      { year: '1970', label: '生産開始' },
      { year: '1996', label: 'SKC操業開始' },
      { year: '2010', label: '燃料として天然ガスを導入' },
      { year: '2019', label: '紡績・織布工程を統合' },
      { year: '2023', label: '太陽光パネルを設置' },
      { year: '2024', label: '繊維リサイクル設備を増設' },
    ],
    historyAlt: 'タイ・クラボウの歴史',
    locationsTitle: '本社・工場・グループ会社をつなぐ',
    locations: [
      { label: '本社', address: 'シンドーンタワー2 9階、Wireless Road, Bangkok 10330' },
      { label: '工場', address: '14/8, 14/12 Phaholyothin Road, Khlong Luang, Pathum Thani 12120' },
      { label: 'TTDF', address: 'Bang Pu Mai, Samut Prakan 10280' },
    ],
    locationsAlt: 'タイ国内の拠点',
  },
};
