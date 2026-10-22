import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
// Wedding song: audio track extracted from the hero video
const music = { url: "/media/wedding-music.mp3" };
import { Cover } from "@/components/wedding/Cover";
import { Hero } from "@/components/wedding/Hero";
import { Dates } from "@/components/wedding/Dates";
import { Closing, Countdown, Gallery, MusicToggle, Story, Venue } from "@/components/wedding/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dhyaani Weds Vinotha — Wedding Invitation" },
      { name: "description", content: "Join us for the wedding of Dhyaani & Vinotha at The Royal Mahal, Vayalur, Trichy — 21 & 22 November 2026." },
      { property: "og:title", content: "Dhyaani Weds Vinotha" },
      { property: "og:description", content: "Reception 21 Nov · Muhurtham 22 Nov 2026 at The Royal Mahal, Trichy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [datesRevealed, setDatesRevealed] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);

  const open = () => {
    setOpened(true);
    const a = audio.current;
    if (a && localStorage.getItem("music") !== "off") {
      a.volume = 0.6;
      a.play().then(() => setPlaying(true)).catch((e) => { setPlaying(false); console.error("Music playback failed", e); });
    }
    setTimeout(() => setCoverGone(true), 2600);
  };
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch((e) => { setPlaying(false); console.error("Music playback failed", e); });
      localStorage.setItem("music", "on");
    } else {
      a.pause();
      setPlaying(false);
      localStorage.setItem("music", "off");
    }
  };

  useEffect(() => {
    document.body.style.overflow = coverGone ? "" : "hidden";
  }, [coverGone]);

  return (
    <main className="relative">
      <audio
        ref={audio}
        src={music.url}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          console.error(`Wedding song failed to load: ${music.url}`);
        }}
      />
      {!coverGone && <Cover onOpen={open} />}
      <Hero active={opened} />
      <Dates onRevealed={() => setDatesRevealed(true)} />
      {datesRevealed && <Countdown />}
      <Story />
      <Venue />
      <Gallery />
      <Closing />
      {opened && <MusicToggle playing={playing} onToggle={toggle} />}
    </main>
  );
}
