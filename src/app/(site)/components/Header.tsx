'use client';

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/' },
  { name: 'Profile', href: '/profile' },
  { name: 'History', href: '/history' },
];

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
    await signOut(auth);
    router.push('/login'); // redirect to login after logout
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 w-full h-16 bg-white shadow-md z-50 flex items-center justify-between px-6 transition-all duration-300"
    >
      <div className="p-10 text-xl font-semibold text-gray-800">Green Leaf</div>
      <nav className="flex space-x-4 px-4 py-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-4 py-2 rounded transition ${
              pathname === link.href
                ? 'bg-green-700 text-white font-semibold'
                : 'hover:bg-green-100 text-black'
            }`}
          >
            <span>{link.name}</span>
          </Link>
        ))}
         <button
          onClick={handleLogout}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
