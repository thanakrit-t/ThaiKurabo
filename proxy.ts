import { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/proxy';
import { getLocaleFromPathname } from '@/lib/i18n';

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-page-locale', getLocaleFromPathname(request.nextUrl.pathname));

  return updateSession(new NextRequest(request, { headers: requestHeaders }));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
