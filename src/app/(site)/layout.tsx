import '@/app/globals.css';
import type { Metadata } from 'next';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Green Leaf',
  description: 'Green Leaf - Your Loan Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedRoute>
         <div className="h-screen flex flex-col">
          <Header />
          <div className="flex-1 overflow-y-auto pt-16 pb-16 bg-white">
            {children}
          </div>
          <Footer />
        </div>
        </ProtectedRoute>
    </>
  );
}
