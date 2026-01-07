"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const media = [
    "https://images.unsplash.com/photo-1693755807658-17ce5331aacb?q=80&w=1171&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=1170&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1723867490491-10519f8ed969?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=80&w=1170&auto=format&fit=crop",
  ];

  const HERO_INTERVAL = 4000;

  const [index, setIndex] = useState(0);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* ---------- RESPONSIVE CONFIG ---------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const THUMB_WIDTH = isMobile ? 110 : 160;
  const VISIBLE_THUMBS = isMobile ? 3 : 4;

  const maxThumbIndex = Math.max(media.length - VISIBLE_THUMBS, 0);

  /* ---------- AUTO SCROLL ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % media.length;

        if (next > thumbIndex + VISIBLE_THUMBS - 1) {
          setThumbIndex((t) => Math.min(t + 1, maxThumbIndex));
        }

        return next;
      });
    }, HERO_INTERVAL);

    return () => clearInterval(interval);
  }, [thumbIndex, maxThumbIndex, VISIBLE_THUMBS, media.length]);

  /* ---------- CONTROLS ---------- */
  const moveLeft = () => setThumbIndex((p) => Math.max(p - 1, 0));
  const moveRight = () => setThumbIndex((p) => Math.min(p + 1, maxThumbIndex));

  const selectImage = (idx: number) => {
    setIndex(idx);

    if (idx < thumbIndex) setThumbIndex(idx);
    else if (idx > thumbIndex + VISIBLE_THUMBS - 1)
      setThumbIndex(idx - VISIBLE_THUMBS + 1);
  };

  return (
    <section className="relative w-full px-4 pt-4 md:pl-[68px] md:pt-[68px]">
      {/* ---------- MAIN IMAGE ---------- */}
      <div className="relative h-[360px] sm:h-[420px] md:h-[520px] w-full overflow-hidden rounded-xl bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={media[index]}
              alt={`hero-${index}`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
          </motion.div>
        </AnimatePresence>

        {/* TEXT */}
        <div className="absolute bottom-5 left-5 md:left-10 text-white max-w-[90%]">
          <p className="text-xs uppercase tracking-wide text-white/70">
            Barber
          </p>
          <h1 className="mt-1 text-xl sm:text-2xl md:text-4xl font-bold leading-tight">
            Jasmyne Naturalle International
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/80">
            1, Raji Oba Bus Stop, Alimosho, Lagos
          </p>
        </div>
      </div>

      {/* ---------- THUMBNAILS ---------- */}
      <div className=" relative mt-4 bg-black/90 rounded-xl px-4 py-4 ">
        {/* CHEVRONS */}
        {thumbIndex > 0 && (
          <button
            onClick={moveLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
          >
            <ChevronLeft className="h-4 w-4 text-black" />
          </button>
        )}

        {thumbIndex < maxThumbIndex && (
          <button
            onClick={moveRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-2 rounded-full shadow hover:scale-110 transition"
          >
            <ChevronRight className="h-4 w-4 text-black" />
          </button>
        )}

        {/* VIEWPORT */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: -thumbIndex * THUMB_WIDTH }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="flex gap-3"
          >
            {media.map((item, idx) => (
              <button
                key={idx}
                onClick={() => selectImage(idx)}
                className={`relative h-[80px] sm:h-[90px] w-[100px] sm:w-[120px] md:w-[140px]
                shrink-0 rounded-lg overflow-hidden transition-all
                ${
                  idx === index
                    ? "ring-2 ring-green-400 scale-105"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={item} alt="" fill className="object-cover" />
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
