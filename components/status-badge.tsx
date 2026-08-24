export function StatusBadge({ status }: { status: "Open" | "In review" | "Draft" | "Published" | "New" | "Closed" }) {
  return <span className={`status-badge status-${status.toLowerCase().replace(" ", "-")}`}>{status}</span>;
}
