'use client';

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 h-10 bg-white border-t shadow z-50 flex items-center justify-center px-4 text-xs sm:text-sm text-black"
    >
      © {new Date().getFullYear()} Green Leaf. All rights reserved.
    </footer>
  );
}
