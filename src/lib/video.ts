import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import os from "os";

const isWindows = process.platform === "win32";
const ytdlpPath = process.env.YT_DLP_PATH || (isWindows ? "C:\\yt-dlp\\yt-dlp.exe" : "yt-dlp");

console.log(`[OS: ${process.platform}] Using yt-dlp path:`, ytdlpPath);

const execPromise = promisify(exec);

export interface VideoInfo {
  title: string;
  thumbnail: string;
  url: string;
  duration?: number;
  platform?: string;
}

const PLATFORM_MAP: Record<string, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  pinterest: "Pinterest",
};

interface CacheEntry {
  data: VideoInfo;
  timestamp: number;
  isFull: boolean;
}

const videoCache = new Map<string, CacheEntry>();
const CACHE_TTL = 20 * 60 * 1000; // 20 minutes

function getCachedItem(url: string, requireFull: boolean): VideoInfo | null {
  const entry = videoCache.get(url);
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_TTL;
  if (isExpired) {
    videoCache.delete(url);
    return null;
  }

  if (requireFull && !entry.isFull) return null;

  return entry.data;
}

export async function getVideoMeta(videoUrl: string): Promise<VideoInfo> {
  const cached = getCachedItem(videoUrl, false);
  if (cached) {
    console.log("Cache hit (meta):", videoUrl);
    return cached;
  }

  try {
    const { stdout } = await execPromise(
      `"${ytdlpPath}" -j --flat-playlist --no-warnings --no-check-certificate --quiet "${videoUrl}"`
    );
    const data = JSON.parse(stdout);

    const info = {
      title: data.title,
      thumbnail: data.thumbnail,
      duration: data.duration || 0,
      url: videoUrl,
      originalUrl: videoUrl,
      platform: PLATFORM_MAP[data.extractor_key.toLowerCase()] || data.extractor_key,
    };

    videoCache.set(videoUrl, {
      data: info,
      timestamp: Date.now(),
      isFull: false
    });

    return info;
  } catch (error: any) {
    throw new Error(`Failed to get video meta: ${error.message}`);
  }
}

export async function getVideoInfo(videoUrl: string): Promise<VideoInfo> {
  const cached = getCachedItem(videoUrl, true);
  if (cached) {
    console.log("Cache hit (full):", videoUrl);
    return cached;
  }

  try {
    const { stdout, stderr } = await execPromise(
      `"${ytdlpPath}" -j --no-playlist --no-warnings --no-check-certificate --skip-download --no-write-auto-subs --no-write-subs --no-write-thumbnail --no-check-formats --no-mtime --quiet "${videoUrl}"`
    );
    if (stderr && !stdout) {
      throw new Error(stderr);
    }
    const data = JSON.parse(stdout);

    const info = {
      title: data.title,
      thumbnail: data.thumbnail,
      duration: data.duration,
      url: videoUrl,
      originalUrl: videoUrl,
      platform: PLATFORM_MAP[data.extractor_key.toLowerCase()] || data.extractor_key,
      formats: (data.formats || [])
        .filter((f: any) => f.vcodec !== "none" || f.acodec !== "none")
        .map((f: any) => ({
          url: f.url,
          ext: f.ext,
          quality: f.format_note || (f.height ? f.height + "p" : "HD"),
          filesize: f.filesize || f.filesize_approx || 0,
          format_id: f.format_id,
          height: f.height,
          vcodec: f.vcodec,
          acodec: f.acodec,
        }))
        .reverse(),
    };

    videoCache.set(videoUrl, {
      data: info,
      timestamp: Date.now(),
      isFull: true
    });

    return info;
  } catch (error: any) {
    throw new Error(`Failed to get video info: ${error.message}`);
  }
}

export async function cleanupTempFiles() {
  const tempDir = path.join(os.tmpdir(), "vytrixe");
  if (!fs.existsSync(tempDir)) return;

  const files = fs.readdirSync(tempDir);
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  for (const file of files) {
    const filePath = path.join(tempDir, file);
    const stats = fs.statSync(filePath);
    if (now - stats.mtimeMs > oneHour) {
      fs.unlinkSync(filePath);
    }
  }
}

export async function downloadVideo(videoUrl: string, formatId: string): Promise<{ filePath: string; fileName: string }> {
  const tempDir = path.join(os.tmpdir(), "vytrixe");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(7);
  const fileName = `vytrixe_${timestamp}_${randomSuffix}.mp4`;
  const filePath = path.join(tempDir, fileName);

  try {
    // We use -o to specify output path
    // We also add --no-part to avoid .part files if possible for cleaner streaming
    await execPromise(
      `"${ytdlpPath}" -f "${formatId}" --no-part -o "${filePath}" "${videoUrl}"`
    );
    
    if (!fs.existsSync(filePath)) {
      throw new Error("File was not created by yt-dlp");
    }
  } catch (error: any) {
    throw new Error(`Download failed: ${error.message}`);
  }

  return { filePath, fileName };
}
