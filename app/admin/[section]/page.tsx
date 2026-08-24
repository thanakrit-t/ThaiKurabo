import { Filter, Plus, SlidersHorizontal } from "lucide-react";
import { PortalShell } from "@/components/portal-shell";
import { StatusBadge } from "@/components/status-badge";

const sectionNames: Record<string, string> = { content: "Content", news: "News", contacts: "Contact requests", applications: "Applications", users: "Users", settings: "Settings" };
const rows = [
  ["Company profile", "Corporate", "22 Aug 2026", "Published"],
  ["Technology overview", "Technology", "21 Aug 2026", "Draft"],
  ["Basic sustainability policy", "Sustainability", "20 Aug 2026", "In review"],
] as const;

export default async function AdminSection({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params; const title = sectionNames[section] ?? "Administration";
  return <PortalShell kind="admin" title={title}><div className="list-toolbar"><div><label className="search-field"><span>Search {title.toLowerCase()}</span><input placeholder={`Search ${title.toLowerCase()}`} /></label><button type="button" className="tool-button"><Filter size={17} />Filters</button><button type="button" className="tool-button"><SlidersHorizontal size={17} />Columns</button></div><button type="button" className="button button-primary"><Plus size={17} />Create new</button></div><section className="portal-section"><div className="data-table admin-table"><div className="table-head"><span>Title / reference</span><span>Category / owner</span><span>Updated</span><span>Status</span></div>{rows.map(([name, category, date, status]) => <button type="button" className="table-row-button" key={name}><strong>{name}</strong><span>{category}</span><time>{date}</time><StatusBadge status={status as "Published" | "Draft" | "In review"} /></button>)}</div><div className="table-footer"><span>Showing 3 illustrative records</span><div><button disabled>Previous</button><button type="button">Next</button></div></div></section></PortalShell>;
}
