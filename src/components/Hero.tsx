"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, ArrowRight, Shield, Zap, Star } from "lucide-react";
import { AdsterraAds } from "./AdsterraAds";
import { ADS_SCRIPTS } from "@/lib/adsConfig";

interface HeroProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
}

export function Hero({ onSearch, isLoading }: HeroProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch(url.trim());
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-24">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-100 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <AdsterraAds 
          zoneId={ADS_SCRIPTS.BANNER_TOP.key} 
          format={ADS_SCRIPTS.BANNER_TOP.format}
          minHeight={ADS_SCRIPTS.BANNER_TOP.minHeight}
          className="mb-12"
        />

        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold text-blue-600 border border-blue-100 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              Official Vytrixe Downloader
            </div>
            
            <h1 className="text-5xl font-black tracking-tight text-gray-900 sm:text-7xl lg:text-8xl leading-[1.1] mb-6">
              Download Videos <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Instantly</span>
            </h1>
            
            <p className="mt-8 max-w-2xl mx-auto text-lg font-medium text-gray-500 sm:text-xl leading-relaxed">
              Download TikTok, Instagram, YouTube, Facebook and Pinterest videos fast and free. <br className="hidden md:block" /> No watermark, HD quality, 100% free.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-6">
              {[
                { text: "No Watermark", icon: <Zap size={16} />, color: "text-blue-600", bg: "bg-blue-50" },
                { text: "HD Quality", icon: <Star size={16} />, color: "text-purple-600", bg: "bg-purple-50" },
                { text: "100% Free", icon: <Shield size={16} />, color: "text-green-600", bg: "bg-green-50" }
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 px-5 py-2.5 ${item.bg} ${item.color} rounded-2xl border border-white/50 shadow-sm font-bold text-sm`}>
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            id="download-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-16 w-full max-w-4xl px-4"
          >
            <div className="group relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-[32px] bg-white p-2 shadow-2xl shadow-blue-500/10 transition-all focus-within:ring-4 focus-within:ring-blue-500/10 border border-gray-100">
              <div className="hidden sm:flex pl-4 pr-2 text-gray-400">
                <Link2 size={24} />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your video link here..."
                className="flex-1 bg-transparent px-6 sm:px-4 py-5 sm:py-4 text-lg text-gray-900 outline-none placeholder:text-gray-400 font-medium"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 rounded-[24px] bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-5 sm:py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
              >
                {isLoading ? "Analyzing video..." : "Download Video Now"}
                {!isLoading && <ArrowRight size={20} />}
              </button>
            </div>

            <p className="mt-6 text-sm font-bold text-gray-400 uppercase tracking-widest opacity-60">
              ⚡ Fast • Secure • No Watermark
            </p>
            
            <div className="mt-16 pt-12 border-t border-gray-100">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-8">Supported Platforms</p>
              <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                {["TikTok", "Instagram", "YouTube", "Facebook", "Pinterest"].map((p) => (
                  <span key={p} className="text-base font-black text-gray-900 tracking-tighter">{p}</span>
                ))}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
