import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  playbackId: string;
}

export function VideoPlayer({ playbackId }: VideoPlayerProps) {
  const src = `https://stream.mux.com/${playbackId}.m3u8`;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(
    function setupVideoElement() {
      let hls: Hls;
      if (videoRef.current) {
        const video = videoRef.current;

        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // Some browsers (safari and ie edge) support HLS natively
          video.src = src;
        } else if (Hls.isSupported()) {
          // This will run in all other modern browsers
          hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(video);
        } else {
          console.error("This is a legacy browser that doesn't support MSE");
        }
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
      };
    },
    [videoRef],
  );

  return <video controls ref={videoRef} className="w-full" />;
}
