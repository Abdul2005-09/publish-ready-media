import { useEffect, useRef } from "react";
import video from "@/assets/wedding-video.mp4.asset.json";
import poster from "@/assets/wedding-video-poster.jpg.asset.json";

export function Hero({ active }: { active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!active) {
      v.pause();
      return;
    }
    v.muted = true;
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [active]);
  return (
    <section className="relative isolate flex h-[88svh] min-h-[560px] items-center justify-center overflow-hidden md:h-screen">
      <video
        ref={ref}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        src={video.url}
        poster={poster.url}
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        aria-hidden
      />
    </section>
  );
}
