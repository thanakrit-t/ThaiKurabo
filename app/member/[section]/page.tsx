import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { PortalShell } from "@/components/portal-shell";

const labels: Record<string, string> = { contacts: "My contacts", applications: "Applications", profile: "My profile" };
export default async function MemberSection({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; const title = labels[section] ?? "Member area"; return <PortalShell kind="member" title={title}><section className="portal-section empty-state"><div className="punch-symbol" aria-hidden="true" /><h2>{section === "profile" ? "Keep your details ready." : `Your ${title.toLowerCase()} will appear here.`}</h2><p>This is a designed empty state. Records will be loaded from Supabase in the integration phase.</p><Link href={section === "contacts" ? "/member/contacts/new" : section === "applications" ? "/en/careers" : "/member/profile/edit"} className="button button-primary">{section === "profile" ? "Edit profile" : section === "contacts" ? "Create contact request" : "Browse open roles"}<ArrowIcon /></Link></section></PortalShell>; }
