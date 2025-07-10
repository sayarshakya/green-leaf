'use client';

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 w-full h-10 bg-white border-t shadow-md z-50 flex items-center justify-center px-6 text-sm text-black transition-all duration-300"
    >
      © {new Date().getFullYear()} My App. All rights reserved.
    </footer>
  );
}
