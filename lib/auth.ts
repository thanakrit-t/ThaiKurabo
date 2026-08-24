import { redirect } from 'next/navigation';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) return null;

  return {
    id: data.claims.sub,
    email: typeof data.claims.email === 'string' ? data.claims.email : null,
  };
}

export async function requireUser() {
  if (!isSupabaseConfigured()) return null;
  const user = await getCurrentUser();
  if (!user) redirect('/login');
  return user;
}

export async function requireRole(roleCode: string) {
  if (!isSupabaseConfigured()) return null;
  const user = await requireUser();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('has_role', { required_role: roleCode });
  if (error || !data) redirect('/member');
  return user;
}
