"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ResultCard } from "@/components/ResultCard";
import { AdsterraAds } from "@/components/AdsterraAds";
import { AdNative } from "@/components/AdNative";
import { LoadingState } from "@/components/LoadingState";
import { ErrorAlert } from "@/components/ErrorAlert";
import { VideoInfo } from "@/lib/video";
import { ADS_SCRIPTS } from "@/lib/adsConfig";

interface SEOPageProps {
  platform: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  faqData?: { question: string; answer: string }[];
}

const ALL_PLATFORMS = [
  { name: "TikTok Video", path: "/download-tiktok-video" },
  { name: "TikTok No Watermark", path: "/tiktok-downloader-no-watermark" },
  { name: "Free TikTok", path: "/free-tiktok-video-downloader" },
  { name: "Instagram Reels", path: "/download-instagram-reels" },
  { name: "Instagram Video", path: "/instagram-video-downloader" },
  { name: "YouTube Video", path: "/download-youtube-video" },
  { name: "Free YouTube", path: "/free-youtube-downloader" },
  { name: "Facebook Video", path: "/download-facebook-video" },
  { name: "Facebook Downloader", path: "/facebook-video-downloader" },
  { name: "Pinterest Video", path: "/download-pinterest-video" },
  { name: "Pinterest Downloader", path: "/pinterest-video-downloader" },
  { name: "No Watermark Tool", path: "/download-video-without-watermark" },
  { name: "Free Online Tool", path: "/free-video-downloader-online" },
  { name: "Best Downloader 2026", path: "/best-video-downloader-2026" },
  { name: "MP4 from Link", path: "/download-mp4-from-link" },
];

export function SEOPage({ platform, title, subtitle, content, faqData }: SEOPageProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const handleSearch = async (url: string) => {
    setVideoUrl(url);
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
      setError(err.response?.data?.error || `Failed to process ${platform} video.`);
      setLoading(false);
    }
  };

  // Generate Schema.org JSON-LD for FAQ
  const jsonLd = faqData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      
      <main className="flex-1">
        {!videoInfo && !loading && <Hero onSearch={handleSearch} isLoading={loading} />}
        
        {loading && <LoadingState />}
        
        {error && <ErrorAlert message={error} onClear={() => setError(null)} />}
        
        {videoInfo && !loading && (
          <ResultCard 
            info={videoInfo} 
            videoUrl={videoUrl}
            onReset={() => setVideoInfo(null)} 
          />
        )}

        <AdsterraAds 
          zoneId={ADS_SCRIPTS.BANNER_MID.key} 
          format={ADS_SCRIPTS.BANNER_MID.format}
          minHeight={ADS_SCRIPTS.BANNER_MID.minHeight}
          className="my-12"
        />

        <div className="container mx-auto px-4 py-20 max-w-4xl prose prose-blue lg:prose-lg">
          {content}
        </div>

        <AdNative />

        {/* Internal Linking Section */}
        <section className="bg-gray-50 py-20 border-t border-gray-100">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore More Downloaders</h2>
            <p className="text-gray-500 mb-12 max-w-2xl mx-auto italic">High-quality, free, and secure video downloading tools for all major platforms.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {ALL_PLATFORMS.filter(p => p.path !== pathname).map((p) => (
                <a
                  key={p.name}
                  href={p.path}
                  className="px-4 py-4 rounded-2xl bg-white border border-gray-200 text-gray-700 font-semibold hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-lg text-sm"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
