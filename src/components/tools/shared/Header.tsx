"use client";

import React from 'react';
import Link from 'next/link';
import { BellIcon, UserIcon } from '@heroicons/react/24/outline';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Neural Command
          </Link>
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium">Live</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <BellIcon className="w-5 h-5" />
          </button>
          <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <UserIcon className="w-5 h-5" />
            <span className="text-sm font-medium">User</span>
          </button>
        </div>
      </div>
    </header>
  );
}; 