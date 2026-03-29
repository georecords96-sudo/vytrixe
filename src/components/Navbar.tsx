"use client";

import Link from "next/link";
import { Play } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 shrink-0 transition-transform hover:scale-105 active:scale-95 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
            <Play size={20} fill="currentColor" />
          </div>
          <span className="text-xl sm:text-3xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 uppercase">
            Vytrixe
          </span>
        </Link>
        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          <Link href="/download-tiktok-video" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">TikTok</Link>
          <Link href="/download-instagram-video" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Instagram</Link>
          <Link href="/download-youtube-video" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">YouTube</Link>
          <Link href="/download-facebook-video" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Facebook</Link>
          <Link href="/download-pinterest-video" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Pinterest</Link>
        </div>
        <button 
          onClick={() => {
            const element = document.getElementById('download-form');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              window.location.href = '/#download-form';
            }
          }}
          className="rounded-full bg-blue-600 px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 shrink-0"
        >
          Download Video Now
        </button>
      </div>
    </nav>
  );
}
