'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? '').trim();
}

function destination(path: string, key: 'error' | 'message', value: string) {
  const params = new URLSearchParams({ [key]: value });
  return `${path}?${params.toString()}`;
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
}

export async function signIn(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(destination('/login', 'error', 'Supabase is not configured yet. Add the project URL and publishable key to .env.local.'));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: text(formData, 'email'),
    password: text(formData, 'password'),
  });

  if (error) redirect(destination('/login', 'error', error.message));
  redirect('/member');
}

export async function signUp(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(destination('/register', 'error', 'Supabase is not configured yet. Add the project URL and publishable key to .env.local.'));
  }

  if (formData.get('privacyAccepted') !== 'on') {
    redirect(destination('/register', 'error', 'Please accept the privacy notice and terms of use.'));
  }

  const password = text(formData, 'password');
  if (password.length < 8) {
    redirect(destination('/register', 'error', 'Password must contain at least 8 characters.'));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: text(formData, 'email'),
    password,
    options: {
      emailRedirectTo: `${siteUrl()}/auth/callback?next=/member`,
      data: {
        first_name: text(formData, 'firstName'),
        last_name: text(formData, 'lastName'),
        preferred_locale: text(formData, 'locale') || 'en',
      },
    },
  });

  if (error) redirect(destination('/register', 'error', error.message));
  redirect(destination('/login', 'message', 'Check your email to confirm your account, then sign in.'));
}

export async function requestPasswordReset(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect(destination('/forgot-password', 'error', 'Supabase is not configured yet. Add the project URL and publishable key to .env.local.'));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(text(formData, 'email'), {
    redirectTo: `${siteUrl()}/auth/callback?next=/member/profile`,
  });

  if (error) redirect(destination('/forgot-password', 'error', error.message));
  redirect(destination('/forgot-password', 'message', 'If the account exists, reset instructions have been sent.'));
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect('/login');
}
