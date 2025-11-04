'use client';

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user && !error) {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [user, loading, error, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You need to be logged in to view this page.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Dashboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Welcome to your dashboard, {user.name}!
          </p>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-left">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-4">User Information</h2>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">{user.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">{user.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Member since:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}