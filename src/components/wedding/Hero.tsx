import { useEffect, useRef } from "react";
const video = { url: "/media/hero.mp4" };
const poster = { url: "/media/poster.jpg" };
import { Petals } from "./shared";

export function Hero({ active }: { active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!active) return;
    v.muted = true;
    v.play().catch(() => {});
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/60" />
      <Petals count={10} />
      <div className="mx-auto w-full max-w-4xl px-6 text-center">
        <p className="hero-intro mx-auto max-w-md font-serif text-base italic leading-relaxed sm:text-lg md:text-xl">
          Under aligned stars and with hearts united, two families become one as a beautiful new journey begins.
        </p>
        <p className="hero-await mt-6 font-display text-[0.7rem] tracking-[0.38em] sm:text-sm">AWAITING YOUR GRACIOUS PRESENCE</p>
        <h1 className="mt-5 font-script leading-[0.95]">
          <span className="hero-name block text-7xl sm:text-8xl md:text-9xl">Dhyaani</span>
          <span className="hero-weds my-3 block font-display text-xs tracking-[0.6em] sm:text-sm">WEDS</span>
          <span className="hero-name block text-7xl sm:text-8xl md:text-9xl">Vinotha</span>
        </h1>
      </div>
    </section>
  );
}
