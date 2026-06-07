import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/verify/(.*)',
  '/api/webhooks/clerk(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/admin-login(.*)',
  '/privacy-policy(.*)',
  '/terms-of-service(.*)'
]);

const isAdminRoute = createRouteMatcher([
  '/admin',
  '/admin/(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // 1. If it's an admin route, verify the cookie and bypass Clerk completely
  if (isAdminRoute(req)) {
    const adminSession = req.cookies.get('admin_session');
    if (!adminSession || adminSession.value !== 'veraforge_admin_secure_session_token') {
      return NextResponse.redirect(new URL('/admin-login', req.url));
    }
    return NextResponse.next();
  }

  // 2. For standard routes, let Clerk handle them
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html|css|js|gif|svg|jpg|jpeg|png|webp|jwk|ico|csv|txt|xml|otf|ttf|woff|woff2)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
