import '../admin/portal.css';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return children;
}
