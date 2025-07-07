import React from 'react';
import { Sidebar } from '@/components/tools/shared/Sidebar';
import { Header } from '@/components/tools/shared/Header';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 