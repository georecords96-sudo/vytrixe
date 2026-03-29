import { exec } from "child_process";

/**
 * Detects the platform and returns the appropriate yt-dlp command.
 * Use yt-dlp.exe for Windows (local) and yt-dlp for Linux (VPS).
 */
function getYtDlpCommand(url: string) {
  const isWindows = process.platform === "win32";
  const cmd = isWindows ? "yt-dlp.exe" : "yt-dlp";
  return `${cmd} -j "${url}"`;
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: "No URL provided" }, { status: 400 });
    }

    const command = getYtDlpCommand(url);

    return new Promise((resolve) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          const isWindows = process.platform === "win32";
          
          // Friendly error message for missing local yt-dlp
          if (isWindows && stderr.includes("not recognized")) {
            return resolve(
              Response.json({ 
                error: "Local environment error: install yt-dlp.exe or verify it's in your PATH. On VPS, it will work automatically." 
              }, { status: 500 })
            );
          }
          
          console.error("YT-DLP ERROR:", stderr);
          return resolve(Response.json({ error: "Failed to process video: " + stderr }, { status: 500 }));
        }

        try {
          const data = JSON.parse(stdout);
          resolve(
            Response.json({
              title: data.title,
              thumbnail: data.thumbnail,
              url: data.url,
              duration: data.duration,
              platform: data.extractor_key
            })
          );
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          resolve(Response.json({ error: "Invalid response from video processor" }, { status: 500 }));
        }
      });
    });
  } catch (err) {
    console.error("Server error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
