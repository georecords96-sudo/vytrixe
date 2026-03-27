import Link from "next/link";
import { Globe, Share2, Mail, Play } from "lucide-react";
import { AdPlaceholder } from "@/components/AdPlaceholder";

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link 
              href="/" 
              className="flex items-center gap-2 mb-4 transition-transform hover:scale-105 active:scale-95 origin-left group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow">
                <Play size={16} fill="currentColor" />
              </div>
              <img 
                src="/logo.png" 
                alt="Vytrixe" 
                className="h-8 w-auto" 
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-gray-500">
              The fastest and most reliable way to download videos from TikTok, Instagram, YouTube, Facebook and Pinterest with Vytrixe. High quality, zero clutter.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">Platforms</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/download-tiktok-video" className="hover:text-blue-600">TikTok Downloader</Link></li>
              <li><Link href="/download-instagram-video" className="hover:text-blue-600">Instagram Downloader</Link></li>
              <li><Link href="/download-youtube-video" className="hover:text-blue-600">YouTube Downloader</Link></li>
              <li><Link href="/download-facebook-video" className="hover:text-blue-600">Facebook Downloader</Link></li>
              <li><Link href="/download-pinterest-video" className="hover:text-blue-600">Pinterest Downloader</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <AdPlaceholder slot="bottom" className="mt-12 opacity-50" />
        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-50 pt-8 sm:flex-row">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Vytrixe Downloader. All rights reserved.
          </p>
          <div className="mt-4 flex items-center gap-6 sm:mt-0">
            <Globe size={18} className="text-gray-400 hover:text-blue-400 cursor-pointer" />
            <Share2 size={18} className="text-gray-400 hover:text-gray-900 cursor-pointer" />
            <Mail size={18} className="text-gray-400 hover:text-red-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
