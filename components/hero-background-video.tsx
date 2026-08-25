"use client";

import { useEffect, useRef } from "react";

export function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isVisible = true;

    const syncPlayback = () => {
      if (reducedMotion.matches || document.hidden || !isVisible) {
        video.pause();
        return;
      }

      void video.play().catch(() => {
        // The poster remains visible if a browser blocks autoplay.
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.1 },
    );

    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-background-video"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/images/technology-hero.png"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/video/kurabo.mp4" type="video/mp4" />
    </video>
  );
}
