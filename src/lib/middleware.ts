import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './user';

export async function protectedRoute(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Token is valid, continue to the route
  return NextResponse.next();
}