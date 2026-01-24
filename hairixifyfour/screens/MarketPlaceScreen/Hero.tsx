"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heart } from "iconoir-react";

export default function Hero() {
  const media = [
    "https://plus.unsplash.com/premium_photo-1682096515837-81ef4d728980?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2lnfGVufDB8fDB8fHww",

    "https://images.unsplash.com/photo-1663582816182-15cf69d87665?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2lnfGVufDB8fDB8fHww",

    "https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFrZXVwfGVufDB8fDB8fHww",

    "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFrZXVwfGVufDB8fDB8fHww",

    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFnc3xlbnwwfHwwfHx8MA%3D%3D",
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
        <AnimatePresence mode="sync">
          <motion.div
            key={index}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{
              type: "tween",
              duration: 1.6,
              ease: [0.4, 0, 0.2, 1], // ultra-smooth (Material curve)
            }}
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

        <div className="absolute top-2 right-2 text-white max-w-[90%] flex gap-2">
          <Button variant={"secondary"}>
            <Share />
          </Button>
          <Button variant={"secondary"}>
            <Heart />
          </Button>
        </div>

        {/* TEXT */}
        <div className="absolute bottom-5 left-5 md:left-10 text-white max-w-[90%]">
          <p className="w-fit bg-[#12ab5a] text-white text-[10px] font-semibold px-2 py-1 rounded-full capitalize">
            Condition: Used
          </p>
          <h1 className="mt-1 text-xl sm:text-2xl md:text-4xl font-bold leading-tight">
            SDD Vietnam Bone Straight
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/80">
            1, Raji Oba Bus Stop, Alimosho, Lagos
          </p>
        </div>
      </div>

      {/* ---------- THUMBNAILS ---------- */}
      <div className=" relative mt-4 bg-black/90 rounded-xl w-full h-[120px] flex items-center px-5">
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
                className={`relative h-[80px] sm:h-[90px] w-[120px]
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
