"use client";

import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, type Locale } from "@/lib/i18n";
import styles from "./cookie-consent.module.css";

const STORAGE_KEY = "thai_kurabo_cookie_consent";
const CONSENT_VERSION = "2026-08-25.1";
const CONSENT_MAX_AGE_DAYS = 180;
const OPTIONAL_CATEGORIES = ["analytics", "preferences", "marketing"] as const;
const CONSENT_ACTIONS = ["accept_all", "reject_optional", "save_preferences"] as const;

type OptionalCategory = (typeof OPTIONAL_CATEGORIES)[number];
type ConsentAction = (typeof CONSENT_ACTIONS)[number];
type OptionalChoices = Record<OptionalCategory, boolean>;
type ConsentCategories = OptionalChoices & { necessary: true };

export type CookieConsentRecord = {
  version: string;
  consentId: string;
  action: ConsentAction;
  categories: ConsentCategories;
  savedAt: string;
  expiresAt: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ThaiKuraboCookieConsent?: {
      openSettings: () => void;
      getConsent: () => CookieConsentRecord | null;
      reset: () => void;
    };
  }
}

const deniedChoices: OptionalChoices = { analytics: false, preferences: false, marketing: false };

const consentCopy = {
  th: {
    bannerLabel: "การตั้งค่าความเป็นส่วนตัวและคุกกี้",
    title: "คุณเลือกได้ว่าจะให้เราใช้คุกกี้แบบใด",
    summary: "เราใช้เทคโนโลยีที่จำเป็นเพื่อให้เว็บไซต์ทำงาน ส่วนการวิเคราะห์ การปรับแต่ง และการตลาดจะไม่ทำงานจนกว่าคุณจะยินยอม คุณเปลี่ยนหรือถอนความยินยอมภายหลังได้",
    cookiePolicy: "นโยบายคุกกี้",
    privacyNotice: "ประกาศความเป็นส่วนตัว",
    reject: "ปฏิเสธที่ไม่จำเป็น",
    settings: "ตั้งค่าคุกกี้",
    accept: "ยอมรับทั้งหมด",
    modalTitle: "ตั้งค่าความเป็นส่วนตัว",
    modalDescription: "เลือกคุกกี้แต่ละประเภทแยกกันได้ คุกกี้ที่จำเป็นปิดไม่ได้เพราะใช้สำหรับความปลอดภัย การเข้าสู่ระบบ และการจดจำตัวเลือกนี้",
    close: "ปิดหน้าต่างตั้งค่าคุกกี้",
    necessary: "คุกกี้ที่จำเป็น",
    necessaryStatus: "เปิดใช้งานเสมอ",
    necessaryDescription: "ทำให้ฟังก์ชันพื้นฐาน ความปลอดภัย การเข้าสู่ระบบ และการบันทึกตัวเลือกความยินยอมทำงานได้",
    analytics: "คุกกี้วิเคราะห์",
    analyticsDescription: "ช่วยวัดการใช้งานเว็บไซต์เพื่อปรับปรุงประสิทธิภาพ โดยลดการระบุตัวบุคคลเท่าที่ทำได้",
    preferences: "คุกกี้เพื่อการปรับแต่ง",
    preferencesDescription: "จดจำตัวเลือกเพื่อปรับประสบการณ์ให้เหมาะกับคุณ เช่น ภาษา หรือบริการภายนอกที่เลือกเปิดใช้",
    marketing: "คุกกี้การตลาด",
    marketingDescription: "ใช้วัดผลโฆษณาหรือแสดงเนื้อหาการตลาดที่เกี่ยวข้อง และอาจเกี่ยวข้องกับผู้ให้บริการภายนอก",
    allowCategory: (category: string) => `อนุญาต${category}`,
    save: "บันทึกตัวเลือก",
    saved: "บันทึกการตั้งค่าคุกกี้แล้ว",
    saveError: "เบราว์เซอร์บันทึกตัวเลือกไม่ได้ โปรดลองอีกครั้งหรือตรวจการตั้งค่าพื้นที่จัดเก็บของเบราว์เซอร์",
  },
  en: {
    bannerLabel: "Privacy and cookie choices",
    title: "Choose which cookies we may use",
    summary: "We use necessary technology to operate this website. Analytics, preference, and marketing technologies stay off until you consent. You can change or withdraw your consent later.",
    cookiePolicy: "Cookie policy",
    privacyNotice: "Privacy notice",
    reject: "Reject non-essential",
    settings: "Cookie settings",
    accept: "Accept all",
    modalTitle: "Privacy settings",
    modalDescription: "Choose each category separately. Necessary technology cannot be disabled because it supports security, sign-in, and remembering this choice.",
    close: "Close cookie settings",
    necessary: "Necessary",
    necessaryStatus: "Always active",
    necessaryDescription: "Supports core functions, security, sign-in, and storage of your consent choice.",
    analytics: "Analytics",
    analyticsDescription: "Helps measure website use and improve performance while minimizing identification where possible.",
    preferences: "Preferences",
    preferencesDescription: "Remembers choices that tailor your experience, such as language or optional third-party services.",
    marketing: "Marketing",
    marketingDescription: "Measures advertising or presents relevant marketing and may involve third-party providers.",
    allowCategory: (category: string) => `Allow ${category}`,
    save: "Save choices",
    saved: "Cookie settings saved",
    saveError: "Your browser could not save this choice. Please try again or check its storage settings.",
  },
  ja: {
    bannerLabel: "プライバシーとCookieの設定",
    title: "使用を許可するCookieを選択できます",
    summary: "当サイトの運営に必要な技術のみ常時使用します。分析、設定、マーケティング用の技術は、同意いただくまで使用しません。同意は後から変更・撤回できます。",
    cookiePolicy: "Cookieポリシー",
    privacyNotice: "プライバシー通知",
    reject: "任意Cookieを拒否",
    settings: "Cookie設定",
    accept: "すべて許可",
    modalTitle: "プライバシー設定",
    modalDescription: "カテゴリーごとに選択できます。セキュリティ、ログイン、この選択の保存に必要な技術は無効にできません。",
    close: "Cookie設定を閉じる",
    necessary: "必要なCookie",
    necessaryStatus: "常に有効",
    necessaryDescription: "基本機能、セキュリティ、ログイン、同意設定の保存に使用します。",
    analytics: "分析Cookie",
    analyticsDescription: "可能な限り個人の特定を抑えながら、利用状況を測定し、性能改善に役立てます。",
    preferences: "設定Cookie",
    preferencesDescription: "言語や任意の外部サービスなど、利用体験を調整するための選択を保存します。",
    marketing: "マーケティングCookie",
    marketingDescription: "広告効果の測定や関連情報の表示に使用し、外部事業者が関与する場合があります。",
    allowCategory: (category: string) => `${category}を許可`,
    save: "選択を保存",
    saved: "Cookie設定を保存しました",
    saveError: "ブラウザに設定を保存できませんでした。もう一度試すか、ストレージ設定をご確認ください。",
  },
} satisfies Record<Locale, Record<string, string | ((value: string) => string)>>;

function isConsentRecord(value: unknown): value is CookieConsentRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<CookieConsentRecord>;
  const categories = record.categories as Partial<ConsentCategories> | undefined;
  return record.version === CONSENT_VERSION
    && typeof record.consentId === "string"
    && CONSENT_ACTIONS.some((action) => action === record.action)
    && typeof record.savedAt === "string"
    && typeof record.expiresAt === "string"
    && Number.isFinite(Date.parse(record.savedAt))
    && Number.isFinite(Date.parse(record.expiresAt))
    && Boolean(categories)
    && categories?.necessary === true
    && OPTIONAL_CATEGORIES.every((category) => typeof categories?.[category] === "boolean");
}

function readConsent(): CookieConsentRecord | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const value: unknown = JSON.parse(stored);
    if (!isConsentRecord(value) || Date.now() >= Date.parse(value.expiresAt)) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return value;
  } catch {
    return null;
  }
}

function makeConsent(choices: OptionalChoices, action: ConsentAction): CookieConsentRecord {
  const now = new Date();
  return {
    version: CONSENT_VERSION,
    consentId: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    action,
    categories: { necessary: true, ...choices },
    savedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CONSENT_MAX_AGE_DAYS * 86_400_000).toISOString(),
  };
}

function updateGoogleConsent(categories: ConsentCategories, command: "default" | "update") {
  window.dataLayer ??= [];
  window.gtag ??= (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("consent", command, {
    analytics_storage: categories.analytics ? "granted" : "denied",
    ad_storage: categories.marketing ? "granted" : "denied",
    ad_user_data: categories.marketing ? "granted" : "denied",
    ad_personalization: categories.marketing ? "granted" : "denied",
    functionality_storage: categories.preferences ? "granted" : "denied",
    personalization_storage: categories.preferences ? "granted" : "denied",
    security_storage: "granted",
    ...(command === "default" ? { wait_for_update: 500 } : {}),
  });
}

export function CookieConsent() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = consentCopy[locale];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsentRecord | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [choices, setChoices] = useState<OptionalChoices>(deniedChoices);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const openSettings = useCallback(() => {
    const existing = readConsent();
    setChoices(existing?.categories ?? deniedChoices);
    setError("");
    setSettingsOpen(true);
  }, []);

  useEffect(() => {
    const existing = readConsent();
    const initialCategories: ConsentCategories = existing?.categories ?? { necessary: true, ...deniedChoices };
    updateGoogleConsent(initialCategories, existing ? "update" : "default");

    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setConsent(existing);
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (settingsOpen && !dialog.open) dialog.showModal();
    if (!settingsOpen && dialog.open) dialog.close();
  }, [settingsOpen]);

  useEffect(() => {
    window.ThaiKuraboCookieConsent = {
      openSettings,
      getConsent: readConsent,
      reset: () => {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      },
    };
    return () => {
      delete window.ThaiKuraboCookieConsent;
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, [openSettings]);

  function showSavedMessage() {
    setMessage(copy.saved);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setMessage(""), 2800);
  }

  function saveConsent(nextChoices: OptionalChoices, action: ConsentAction) {
    const record = makeConsent(nextChoices, action);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      setError(copy.saveError);
      return;
    }

    const requiresReload = Boolean(consent && OPTIONAL_CATEGORIES.some(
      (category) => consent.categories[category] && !record.categories[category],
    ));

    setConsent(record);
    setChoices(nextChoices);
    setSettingsOpen(false);
    setError("");
    updateGoogleConsent(record.categories, "update");
    window.dispatchEvent(new CustomEvent<CookieConsentRecord>("cookie-consent-updated", { detail: record }));
    showSavedMessage();

    if (requiresReload) setTimeout(() => location.reload(), 800);
  }

  function setCategory(category: OptionalCategory, checked: boolean) {
    setChoices((current) => ({ ...current, [category]: checked }));
  }

  if (!ready) return null;

  return (
    <>
      {!consent && (
        <section className={styles.banner} aria-labelledby="cookie-consent-title" aria-label={copy.bannerLabel}>
          <div className={styles.bannerCopy}>
            <span className={styles.icon} aria-hidden="true"><Cookie size={24} strokeWidth={1.8} /></span>
            <div>
              <h2 id="cookie-consent-title">{copy.title}</h2>
              <p>{copy.summary} <Link href={`/${locale}/cookies`}>{copy.cookiePolicy}</Link> · <Link href={`/${locale}/privacy`}>{copy.privacyNotice}</Link></p>
              {error && <p className={styles.error} role="alert">{error}</p>}
            </div>
          </div>
          <div className={styles.bannerActions}>
            <button className={`${styles.button} ${styles.rejectButton}`} type="button" onClick={() => saveConsent(deniedChoices, "reject_optional")}>{copy.reject}</button>
            <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={openSettings}>{copy.settings}</button>
            <button className={`${styles.button} ${styles.acceptButton}`} type="button" onClick={() => saveConsent({ analytics: true, preferences: true, marketing: true }, "accept_all")}>{copy.accept}</button>
          </div>
        </section>
      )}

      <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="cookie-settings-title" aria-describedby="cookie-settings-description" onCancel={() => setSettingsOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setSettingsOpen(false); }}>
        <section className={styles.modal}>
          <header className={styles.modalHeader}>
            <div><h2 id="cookie-settings-title">{copy.modalTitle}</h2><p id="cookie-settings-description">{copy.modalDescription}</p></div>
            <button className={styles.closeButton} type="button" aria-label={copy.close} onClick={() => setSettingsOpen(false)}><X size={22} /></button>
          </header>

          <div className={styles.modalBody}>
            <article className={styles.category}>
              <div className={styles.categoryTop}><h3>{copy.necessary}</h3><span className={styles.required}>{copy.necessaryStatus}</span></div>
              <p>{copy.necessaryDescription}</p>
            </article>
            {OPTIONAL_CATEGORIES.map((category) => {
              const name = copy[category];
              const description = copy[`${category}Description` as const];
              return (
                <article className={styles.category} key={category}>
                  <div className={styles.categoryTop}>
                    <h3>{name}</h3>
                    <label className={styles.switch}>
                      <input type="checkbox" checked={choices[category]} onChange={(event) => setCategory(category, event.target.checked)} aria-label={copy.allowCategory(name)} />
                      <span aria-hidden="true" />
                    </label>
                  </div>
                  <p>{description}</p>
                </article>
              );
            })}
            <p className={styles.policyLinks}><Link href={`/${locale}/cookies`}>{copy.cookiePolicy}</Link><Link href={`/${locale}/privacy`}>{copy.privacyNotice}</Link></p>
            {error && <p className={styles.error} role="alert">{error}</p>}
          </div>

          <footer className={styles.modalFooter}>
            <button className={`${styles.button} ${styles.rejectButton}`} type="button" onClick={() => saveConsent(deniedChoices, "reject_optional")}>{copy.reject}</button>
            <button className={`${styles.button} ${styles.secondaryButton}`} type="button" onClick={() => saveConsent(choices, "save_preferences")}>{copy.save}</button>
            <button className={`${styles.button} ${styles.acceptButton}`} type="button" onClick={() => saveConsent({ analytics: true, preferences: true, marketing: true }, "accept_all")}>{copy.accept}</button>
          </footer>
        </section>
      </dialog>

      {consent && <button className={styles.settingsButton} type="button" onClick={openSettings} aria-label={copy.settings} title={copy.settings}><Cookie size={23} strokeWidth={1.8} /></button>}
      <div className={styles.toast} role="status" aria-live="polite" aria-atomic="true">{message}</div>
    </>
  );
}
