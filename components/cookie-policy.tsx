import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import styles from "./cookie-policy.module.css";

const policyCopy = {
  th: {
    title: "นโยบายคุกกี้และเทคโนโลยีที่คล้ายกัน",
    updated: "ตรวจทานล่าสุด: 25 สิงหาคม 2569",
    intro: "นโยบายนี้อธิบายว่า Thai Kurabo Co., Ltd. ใช้คุกกี้และพื้นที่จัดเก็บในเบราว์เซอร์อย่างไร เมื่อคุณใช้เว็บไซต์นี้ คุกกี้ที่ไม่จำเป็นจะไม่ทำงานก่อนที่คุณจะเลือกยินยอม",
    choicesTitle: "ตัวเลือกของคุณ",
    choices: "คุณปฏิเสธคุกกี้ที่ไม่จำเป็นได้โดยยังใช้งานเนื้อหาหลักของเว็บไซต์ต่อได้ และเลือกอนุญาตแยกตามประเภทได้ การไม่ตอบแบนเนอร์ไม่ถือเป็นความยินยอม",
    inventoryTitle: "เทคโนโลยีที่ใช้อยู่ในเว็บไซต์",
    inventoryCaption: "รายการเทคโนโลยีที่จัดเก็บข้อมูลบนอุปกรณ์",
    technology: "ชื่อหรือเทคโนโลยี",
    purpose: "วัตถุประสงค์",
    category: "ประเภท",
    duration: "ระยะเวลา",
    consentPurpose: "บันทึกตัวเลือก หมายเลขอ้างอิง เวอร์ชัน และวันหมดอายุของความยินยอมไว้ใน localStorage",
    authPurpose: "รักษาสถานะการเข้าสู่ระบบสมาชิกอย่างปลอดภัยเมื่อเปิดใช้ Supabase และผู้ใช้เข้าสู่ระบบ",
    necessary: "จำเป็น",
    consentDuration: "ไม่เกิน 180 วัน",
    authDuration: "จนกว่าออกจากระบบหรือ session หมดอายุตามการตั้งค่าระบบยืนยันตัวตน",
    optionalStatus: "ขณะตรวจทานครั้งนี้ ไม่พบ Analytics, advertising pixel หรือ marketing SDK ใน source code ของแอป หากเพิ่มบริการดังกล่าว จะต้องอัปเดตรายการนี้และเวอร์ชันความยินยอมก่อนเปิดใช้งาน",
    withdrawTitle: "เปลี่ยนหรือถอนความยินยอม",
    withdraw: "กดปุ่มรูปคุกกี้ที่มุมขวาล่างได้ทุกเมื่อ การถอนจะมีผลกับการประมวลผลในอนาคต และเว็บไซต์จะโหลดใหม่เมื่อจำเป็นเพื่อหยุดบริการที่เคยได้รับอนุญาต",
    contactTitle: "ติดต่อเรา",
    contact: "หากมีคำถามเกี่ยวกับนโยบายนี้หรือการใช้ข้อมูลส่วนบุคคล โปรดติดต่อ Thai Kurabo ผ่าน",
    contactLink: "หน้าติดต่อเรา",
  },
  en: {
    title: "Cookie and similar technologies policy",
    updated: "Last reviewed: 25 August 2026",
    intro: "This policy explains how Thai Kurabo Co., Ltd. uses cookies and browser storage when you use this website. Non-essential technology remains off until you choose to consent.",
    choicesTitle: "Your choices",
    choices: "You may reject non-essential technology and continue using the website's core content. You may also consent separately by category. Ignoring the banner is not treated as consent.",
    inventoryTitle: "Technology used by this website",
    inventoryCaption: "Technology that stores information on your device",
    technology: "Name or technology",
    purpose: "Purpose",
    category: "Category",
    duration: "Retention",
    consentPurpose: "Stores your choices, reference ID, consent version, and expiry date in localStorage.",
    authPurpose: "Maintains a secure member sign-in session when Supabase is configured and you sign in.",
    necessary: "Necessary",
    consentDuration: "Up to 180 days",
    authDuration: "Until sign-out or session expiry under the authentication configuration",
    optionalStatus: "At this review, no analytics, advertising pixel, or marketing SDK was found in the application source. If one is added, this inventory and the consent version must be updated before it is enabled.",
    withdrawTitle: "Change or withdraw consent",
    withdraw: "Use the cookie button at the bottom-right at any time. Withdrawal applies to future processing, and the website reloads when needed to stop a previously permitted service.",
    contactTitle: "Contact us",
    contact: "For questions about this policy or the use of personal data, contact Thai Kurabo through the",
    contactLink: "contact page",
  },
  ja: {
    title: "Cookieおよび類似技術に関するポリシー",
    updated: "最終確認日：2026年8月25日",
    intro: "本ポリシーは、Thai Kurabo Co., Ltd. が当サイトでCookieおよびブラウザストレージをどのように使用するかを説明します。任意の技術は、同意いただくまで無効です。",
    choicesTitle: "選択について",
    choices: "任意の技術を拒否しても、サイトの主要コンテンツを利用できます。カテゴリーごとに同意することもできます。バナーを無視した場合、同意したものとは扱いません。",
    inventoryTitle: "当サイトで使用する技術",
    inventoryCaption: "端末に情報を保存する技術の一覧",
    technology: "名称・技術",
    purpose: "目的",
    category: "区分",
    duration: "保存期間",
    consentPurpose: "選択内容、参照ID、同意バージョン、有効期限をlocalStorageに保存します。",
    authPurpose: "Supabaseが設定され、会員がログインした場合に安全なログイン状態を維持します。",
    necessary: "必須",
    consentDuration: "最大180日",
    authDuration: "ログアウトまたは認証設定に基づくセッション期限まで",
    optionalStatus: "今回の確認時点では、分析、広告ピクセル、マーケティングSDKはアプリケーションのソースにありません。追加する場合は、有効化前に本一覧と同意バージョンを更新します。",
    withdrawTitle: "同意の変更・撤回",
    withdraw: "右下のCookieボタンからいつでも変更できます。撤回は今後の処理に適用され、以前許可したサービスを停止するため必要に応じてページを再読み込みします。",
    contactTitle: "お問い合わせ",
    contact: "本ポリシーまたは個人データの利用に関するご質問は、Thai Kuraboの",
    contactLink: "お問い合わせページ",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export function CookiePolicy({ locale }: { locale: Locale }) {
  const copy = policyCopy[locale];
  return (
    <article className={styles.policy}>
      <header>
        <h2>{copy.title}</h2>
        <p className={styles.updated}>{copy.updated}</p>
        <p>{copy.intro}</p>
      </header>

      <section>
        <h3>{copy.choicesTitle}</h3>
        <p>{copy.choices}</p>
      </section>

      <section>
        <h3>{copy.inventoryTitle}</h3>
        <div className={styles.tableWrap}>
          <table>
            <caption>{copy.inventoryCaption}</caption>
            <thead><tr><th>{copy.technology}</th><th>{copy.purpose}</th><th>{copy.category}</th><th>{copy.duration}</th></tr></thead>
            <tbody>
              <tr><th scope="row">thai_kurabo_cookie_consent<br /><small>Browser localStorage</small></th><td>{copy.consentPurpose}</td><td>{copy.necessary}</td><td>{copy.consentDuration}</td></tr>
              <tr><th scope="row">Supabase authentication storage<br /><small>Cookie / browser storage</small></th><td>{copy.authPurpose}</td><td>{copy.necessary}</td><td>{copy.authDuration}</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.status}>{copy.optionalStatus}</p>
      </section>

      <section>
        <h3>{copy.withdrawTitle}</h3>
        <p>{copy.withdraw}</p>
      </section>

      <section>
        <h3>{copy.contactTitle}</h3>
        <p>{copy.contact} <Link href={`/${locale}/contact`}>{copy.contactLink}</Link>.</p>
      </section>
    </article>
  );
}
