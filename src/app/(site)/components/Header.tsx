'use client';

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Loan', href: '/loan' },
  { name: 'Profile', href: '/profile' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 flex items-center justify-between px-4 sm:px-6 md:px-8">
      {/* Logo / Title */}
      <div className="text-lg sm:text-xl font-semibold text-gray-800">Green Leaf</div>

      {/* Navigation */}
      <nav className="flex items-center gap-2 sm:gap-4 flex-wrap">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1 rounded border text-sm sm:text-base transition-colors duration-200 ${
              pathname === link.href
                ? 'border-green-700 text-green-700 font-semibold'
                : 'border-transparent text-black hover:border-green-500 hover:text-green-700'
            }`}
          >
            {link.name}
          </Link>
        ))}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm sm:text-base rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
