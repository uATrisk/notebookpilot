'use client';

import { useState } from 'react';

export default function Contact() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Have questions or feedback? Reach out to us!
          </p>
        </div>
      </div>
    </div>
  );
}
