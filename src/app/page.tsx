"use client";

import { useState } from "react";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ResultCard } from "@/components/ResultCard";
import { LoadingState } from "@/components/LoadingState";
import { ErrorAlert } from "@/components/ErrorAlert";
import type { VideoInfo } from "@/lib/video";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const handleSearch = async (url: string) => {
    // 0. Store the original search URL
    setVideoUrl(url);
    // 1. URL Validation
    if (!url.includes("http")) {
      setError("Please enter a valid URL including http:// or https://");
      return;
    }

    // 2. Strict Domain Whitelist
    const allowedDomains = [
      "tiktok.com",
      "instagram.com",
      "youtube.com",
      "youtu.be",
      "facebook.com",
      "pinterest.com"
    ];

    const isAllowed = allowedDomains.some(domain => url.toLowerCase().includes(domain));
    if (!isAllowed) {
      setError("Supported platforms: TikTok, Instagram, YouTube, Facebook, and Pinterest.");
      return;
    }

    setLoading(true);
    setError(null);
    setVideoInfo(null);

    try {
      const response = await axios.post("/api/download", { url });
      
      if (response.data && response.data.url) {
        setVideoInfo(response.data);
        setLoading(false);
      } else {
        throw new Error(response.data.error || "Video URL not found.");
      }
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || "Unable to fetch video. Try another link.";
      setError(msg);
      setLoading(false);
    }
  };

  const reset = () => {
    setVideoInfo(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {!videoInfo && !loading && (
          <div className="max-w-6xl mx-auto">
            <Hero onSearch={handleSearch} isLoading={loading} />
          </div>
        )}
        
        {loading && <LoadingState />}
        
        {error && (
          <div className="max-w-3xl mx-auto px-4 py-8">
            <ErrorAlert message={error} onClear={() => setError(null)} />
          </div>
        )}
        
        {videoInfo && !loading && (
          <div className="max-w-5xl mx-auto">
            <ResultCard info={videoInfo} videoUrl={videoUrl} onReset={reset} />
          </div>
        )}

        {/* Home Features Section */}
        {!videoInfo && !loading && (
          <section className="bg-gray-50/50 py-32 border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">Why choose VYTRIXE?</h2>
                <p className="text-gray-500 mt-4 text-lg">The world's most advanced video downloader platform.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Ultra Fast", desc: "Our servers process downloads in record time.", icon: "⚡" },
                  { title: "High Quality", desc: "Download in HD, 4K and even 8K when available.", icon: "🌟" },
                  { title: "No Registration", desc: "No account needed. Just paste the link and download.", icon: "🛡️" }
                ].map((feature, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

