import Image from "next/image";
import Link from "next/link";
import { Bell, BriefcaseBusiness, ClipboardList, FileText, LayoutDashboard, LogOut, Menu, Newspaper, Search, Settings, Users } from "lucide-react";

const memberNav = [
  { href: "/member", label: "Overview", icon: LayoutDashboard },
  { href: "/member/contacts", label: "My contacts", icon: ClipboardList },
  { href: "/member/applications", label: "Applications", icon: BriefcaseBusiness },
  { href: "/member/profile", label: "Profile", icon: Users },
];

const adminNav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/contacts", label: "Contact requests", icon: ClipboardList },
  { href: "/admin/applications", label: "Applications", icon: BriefcaseBusiness },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function PortalShell({ kind, title, children }: { kind: "member" | "admin"; title: string; children: React.ReactNode }) {
  const nav = kind === "admin" ? adminNav : memberNav;
  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <Link href="/" className="portal-brand"><Image src="/brand/kurabo-logo.png" alt="KURABO" width={190} height={60} priority /></Link>
        <span className="portal-kind">{kind === "admin" ? "ADMIN CONSOLE" : "MEMBER PORTAL"}</span>
        <nav aria-label={`${kind} navigation`}>{nav.map(({ href, label, icon: Icon }) => <Link href={href} key={href}><Icon size={18} strokeWidth={1.7} /><span>{label}</span></Link>)}</nav>
        <Link href="/" className="portal-exit"><LogOut size={18} strokeWidth={1.7} />Back to website</Link>
      </aside>
      <div className="portal-main">
        <header className="portal-header">
          <button type="button" aria-label="Open navigation" className="portal-menu"><Menu size={21} /></button>
          <div><span>{kind === "admin" ? "Operations" : "Your account"}</span><h1>{title}</h1></div>
          <div className="portal-tools"><label><Search size={17} /><input placeholder="Search" aria-label="Search" /></label><button type="button" aria-label="Notifications"><Bell size={19} /></button><span className="avatar">TK</span></div>
        </header>
        <main className="portal-content">{children}</main>
      </div>
    </div>
  );
}
