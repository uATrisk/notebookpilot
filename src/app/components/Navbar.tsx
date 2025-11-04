'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const isClient = typeof window !== 'undefined';
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    await logout();
    // Refresh the page to update the UI
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="font-bold text-xl text-emerald-400">
              Notebook Pilot
            </Link>
          </div>

          {/* Center: Nav links (centered on desktop) */}
          <div className="hidden sm:flex sm:flex-1 sm:justify-center sm:space-x-8">
              {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-emerald-300 underline underline-offset-4'
                    : 'text-gray-300 hover:text-emerald-300'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isClient && !loading && user && (
              <Link
                href="/dashboard"
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/dashboard'
                    ? 'text-emerald-300 underline underline-offset-4'
                    : 'text-gray-300 hover:text-emerald-300'
                }`}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Right: Auth / Mobile button */}
          <div className="flex items-center">
            <div className="hidden sm:flex sm:items-center">
              {isClient && !loading && user ? (
                <>
                  <span className="text-sm font-medium text-gray-300 mr-4">
                    Welcome, {user?.name ?? 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-emerald-300 hover:text-emerald-200"
                  >
                    Logout
                  </button>
                </>
              ) : isClient && !loading ? (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-300 hover:text-emerald-300"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="ml-4 text-sm font-medium text-black bg-emerald-400 px-4 py-2 rounded-md hover:bg-emerald-500"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <span className="text-sm text-gray-400">Loading...</span>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden ml-2">
              <button
                onClick={() => setMobileOpen((s) => !s)}
                aria-expanded={mobileOpen}
                aria-label="Toggle menu"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-emerald-900/30"
              >
                {mobileOpen ? (
                  // X icon
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  // Hamburger
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${mobileOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href ? 'bg-emerald-900 text-emerald-200' : 'text-gray-300 hover:bg-emerald-900/30'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isClient && !loading && user && (
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/dashboard' ? 'bg-emerald-900 text-emerald-200' : 'text-gray-300 hover:bg-emerald-900/30'
                }`}
              >
                Dashboard
              </Link>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              {isClient && !loading && user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-300">Welcome, {user?.name ?? 'User'}</div>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-emerald-300">Logout</button>
                </>
              ) : isClient && !loading ? (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-300">Login</Link>
                  <Link href="/signup" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-black bg-emerald-400 rounded-md">Sign Up</Link>
                </>
              ) : (
                <div className="px-3 py-2 text-sm text-gray-400">Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}