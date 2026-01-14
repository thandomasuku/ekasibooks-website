// components/ScreenshotSlider.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Slide = { src: string; alt: string };

export default function ScreenshotSlider({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const count = useMemo(() => slides.length, [slides.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const w = track.clientWidth || 1;
      const i = Math.round(track.scrollLeft / w);
      setActive(Math.max(0, Math.min(count - 1, i)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div
      style={{
        maxWidth: 1050,
        margin: "20px auto 0",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 18px 50px rgba(10,37,64,.10)",
        overflow: "hidden",
        border: "1px solid var(--ring)",
      }}
      aria-label="eKasiBooks app preview slider"
    >
      <div
        ref={trackRef}
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "100%",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        {slides.map((s, idx) => (
          <div key={idx} style={{ scrollSnapAlign: "center" }}>
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>

      <div
        role="tablist"
        aria-label="Slider pagination"
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          padding: "12px 0 16px",
          background: "linear-gradient(to top, rgba(0,0,0,0.04), transparent)",
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              border: 0,
              cursor: "pointer",
              background: i === active ? "var(--brand)" : "rgba(28,79,84,.35)",
              transform: i === active ? "scale(1.06)" : undefined,
              transition: "transform .12s ease, background-color .12s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
