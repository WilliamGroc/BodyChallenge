import { decode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const unprotectedPaths = [
  '/auth/signin',
  '/auth/signup',
  '/'
]

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('next-auth.session-token');

  if (authCookie?.value) {
    const decoded = await decode({ token: authCookie?.value, secret: process.env.NEXTAUTH_SECRET! });
    if (decoded?.exp && ((decoded.exp as number) * 1000) > Date.now()) {
      if (request.nextUrl.pathname === '/auth/signin')
        return NextResponse.redirect(new URL('/', request.url));

      return NextResponse.next();
    }
  }

  if (!unprotectedPaths.includes(request.nextUrl.pathname))
    return NextResponse.redirect(new URL('/auth/signin', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};