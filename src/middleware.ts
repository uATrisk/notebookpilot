import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define which routes require authentication
const protectedRoutes = ['/dashboard', '/profile'];
const authRoutes = ['/login', '/signup'];

// Verify JWT token in edge runtime
async function verifyToken(token: string): Promise<{ userId: number } | null> {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'fallback_secret_key'
    );
    
    const { payload } = await jwtVerify(token, secret);
    return { userId: payload.userId as number };
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  
  // If accessing a protected route without a token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If accessing auth routes while logged in, redirect to home
  if (token && isAuthRoute) {
    try {
      const decoded = await verifyToken(token);
      if (decoded) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // Token is invalid, allow access to auth routes
    }
  }
  
  // If token exists, verify it
  if (token) {
    try {
      const decoded = await verifyToken(token);
      if (!decoded && isProtectedRoute) {
        // Token is invalid and trying to access protected route
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
      }
    } catch (error) {
      // Token verification failed
      if (isProtectedRoute) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};