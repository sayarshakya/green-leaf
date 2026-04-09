import '@/app/utils/fontawesome'
import '@/app/globals.css';
import { robotoMono } from '../lib/fonts';
import type { Metadata } from 'next';
import { UserProvider } from './components/UserContext';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Green Leaf',
  description: 'Green Leaf Loan Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="en" className={robotoMono.variable}>
    <body className="m-0 p-0 bg-gray-100 font-sans">
      <main className="flex-1 pt-4 pb-24 px-4 sm:px-6 md:px-8 min-h-screen overflow-auto w-full bg-white">
        <UserProvider>{children}</UserProvider>
      </main>
      <Analytics />
    </body>
  </html>
  );
}