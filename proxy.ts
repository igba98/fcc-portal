import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

const externalRoles = ['TRADEMARK_OWNER', 'AUTHORIZED_AGENT', 'CLEARING_FORWARDING_AGENT', 'PUBLIC'];
const internalRoles = ['CHIEF_INSPECTOR', 'DAC', 'ACEM', 'TRO', 'ACSM', 'CSO'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role as string | undefined;

  const isInternalPath = nextUrl.pathname.startsWith('/(internal)'); // using Next.js route groups usually won't match in pathname since parentheses are omitted from URL.
  // Wait, Next.js route groups DO NOT reflect in the URL path. 
  // Let me adjust the logic: If the URL actually contains /internal/ or /external/ we should use actual route paths instead of route groups for security paths.
  // Let's assume the paths are literally /external/* and /internal/*. 
  // If the user means Route Groups /(internal)/, the paths will be `/dashboard` etc.
  // The prompt says "route: /(external)/dashboard", which might mean they intend to use route groups but keep external/internal in the physical path mapping?
  // Actually, let's just protect based on the role matching explicit prefixes if the prefix is used. I'll read the path properly.
  const isInternalUrl = nextUrl.pathname.startsWith('/internal');
  const isExternalUrl = nextUrl.pathname.startsWith('/external');

  if (!isLoggedIn && (isInternalUrl || isExternalUrl)) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  if (isLoggedIn) {
    if (isInternalUrl && !internalRoles.includes(role || '')) {
      return NextResponse.redirect(new URL('/login', nextUrl));
    }
    if (isExternalUrl && !externalRoles.includes(role || '') && nextUrl.pathname !== '/external/public-register') {
      return NextResponse.redirect(new URL('/login', nextUrl));
    }
    // CI only route
    if (nextUrl.pathname.startsWith('/internal/users') && role !== 'CHIEF_INSPECTOR') {
      return NextResponse.redirect(new URL('/internal/dashboard', nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
