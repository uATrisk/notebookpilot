import { NextRequest, NextFetchEvent } from 'next/server';
import { verifyToken } from './user';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export async function authenticateRequest(request: NextRequest): Promise<AuthenticatedRequest> {
  const authHeader = request.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return request as AuthenticatedRequest;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return request as AuthenticatedRequest;
  }

  // In a real app, you would fetch user details from database
  // For now, we'll just attach the user ID
  (request as AuthenticatedRequest).user = {
    id: decoded.userId,
    email: '', // Would be fetched from DB in real implementation
    name: '',  // Would be fetched from DB in real implementation
  };

  return request as AuthenticatedRequest;
}