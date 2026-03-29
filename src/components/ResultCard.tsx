"use client";

import { motion } from "framer-motion";
import { Download, Play, ExternalLink, ArrowLeft } from "lucide-react";
import { VideoInfo } from "@/lib/video";
import Image from "next/image";
import { AdPlaceholder } from "./AdPlaceholder";

interface ResultCardProps {
  info: VideoInfo;
  videoUrl: string;
  onReset: () => void;
}

export function ResultCard({ info, videoUrl, onReset }: ResultCardProps) {
  const handleDownload = () => {
    if (info.url) {
      window.open(info.url, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <button 
        onClick={onReset}
        className="mb-8 flex items-center gap-3 px-6 py-3 rounded-full bg-gray-50 text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-white border border-gray-100 shadow-sm transition-all active:scale-95"
      >
        <ArrowLeft size={18} />
        Download another video
      </button>

      <div className="overflow-hidden rounded-3xl bg-white shadow-soft border border-gray-100">
        <div className="flex flex-col md:flex-row">
          {/* Preview Section */}
          <div className="relative aspect-video w-full md:w-1/2 bg-gray-900 overflow-hidden">
            {info.thumbnail ? (
              <Image
                src={info.thumbnail}
                alt={info.title || "preview"}
                fill
                className="object-cover opacity-80"
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                <Play size={24} className="opacity-20" />
                <span className="text-xs font-bold uppercase tracking-widest opacity-50">No preview available</span>
              </div>
            )}
            {info.thumbnail && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                  <Play size={24} fill="white" />
                </div>
              </div>
            )}
            {info.duration && (
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm z-10">
                {Math.floor(info.duration / 60)}:{(info.duration % 60).toString().padStart(2, '0')}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col p-8 md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600">
                {info.platform || "Video Ready"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight mb-4">
              {info.title}
            </h2>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Ready to download instantly
            </p>

            <div className="space-y-4 mt-auto">
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full relative flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50/30 p-4 transition-all group hover:bg-blue-50"
              >
                <span className="absolute -top-2.5 right-4 rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-bold text-white shadow-lg z-10">
                  HD Quality
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-colors">
                    <Download size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-gray-900">Descargar Video</p>
                    <p className="text-[11px] font-bold text-gray-400">
                      Enlace directo • Alta velocidad
                    </p>
                  </div>
                </div>
                <ExternalLink size={16} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <AdPlaceholder slot="content" className="!my-2" />

              <div className="pt-4 text-center space-y-2">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter animate-pulse">
                  🔥 Available for a limited time
                </p>
                <p className="text-[10px] font-bold text-gray-400 flex items-center justify-center gap-2">
                  Safe • No watermark • Free
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
