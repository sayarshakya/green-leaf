'use client';

import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/app/components/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCannabis, faBars, faTimes, faUser, faGauge, faMoneyBillTransfer, faUserTie, faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Loading from '@/app/components/Loading';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { userData, loading } = useUser();

  const role = userData?.role || 'USER';

  const links = [
  { name: 'Dashboard', href: '/dashboard', icon: faGauge },
  { name: 'Deposit', href: '/deposit', icon: faMoneyBillTransfer },
  { name: 'Profile', href: '/profile', icon: faUser },
   ...(role === 'ADMIN' ? [{ name: 'Account', href: '/account', icon : faUserTie }] : []),
];

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  if( loading) return <Loading />;
  
  return (
     <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50 flex items-center justify-between px-4 sm:px-6 md:px-8">
      {/* Logo / Title */}
     <Link href="/dashboard">
      <div className="flex items-center text-lg sm:text-xl font-semibold text-gray-800 cursor-pointer">
        <FontAwesomeIcon icon={faCannabis} className="text-green-600 text-3xl mr-2" />
        Green Leaf
      </div>
    </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2 sm:gap-4 flex-wrap">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-1 rounded border text-sm sm:text-base transition-colors duration-200 ${
              pathname === link.href
                ? 'border-green-600 text-green-700 font-semibold'
                : 'border-transparent text-black hover:border-green-500 hover:text-green-700'
            }`}
          >
            <FontAwesomeIcon icon={link.icon} className="w-4" /> {link.name}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm sm:text-base rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          Logout <FontAwesomeIcon icon={faPersonWalkingArrowRight} className="w-4" />
        </button>
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-gray-700 text-2xl focus:outline-none"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md flex flex-col items-start gap-2 px-4 py-3 md:hidden z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full px-3 py-2 rounded text-sm transition ${
                pathname === link.href
                  ? 'bg-green-100 text-green-700 font-semibold'
                  : 'hover:bg-gray-100 text-gray-800'
              }`}
            >
            <FontAwesomeIcon icon={link.icon} className="w-4" /> {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
            className="w-full px-3 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout <FontAwesomeIcon icon={faPersonWalkingArrowRight} className="w-4" />
          </button>
        </div>
      )}
    </header>
  );
}