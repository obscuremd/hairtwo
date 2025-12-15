"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const media = [
    {
      image:
        "https://images.unsplash.com/photo-1693755807658-17ce5331aacb?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      primary_text: "Mo's Signatures",
      secondary_text: "Alimosho, Lagos State",
      category: "make up",
    },
    {
      image:
        "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      primary_text: "Elevated Cutz",
      secondary_text: "Warri, Delta State",
      category: "Barber",
    },
    {
      image:
        "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      primary_text: "Wellness Spa",
      secondary_text: "Sango Ota, Ogun State",
      category: "Skin Care",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1723867490491-10519f8ed969?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      primary_text: "Wellness Spa",
      secondary_text: "Sango Ota, Ogun State",
      category: "Skin Care",
    },
  ];

  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(([prev]) => [(prev + 1) % media.length, 1]);
    }, 5000);

    return () => clearInterval(interval);
  }, [media.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100vw" : "-100vw",
    }),
    center: {
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100vw" : "100vw",
    }),
  };

  return (
    <main className="relative w-full min-h-[600px] h-[80vh] overflow-hidden bg-black">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "tween",
            duration: 1.6,
            ease: [0.4, 0, 0.2, 1], // ultra-smooth (Material curve)
          }}
          className="absolute inset-0"
        >
          <Image
            src={media[index].image}
            alt={`hero image ${index}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/70" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-between p-4 text-tertiary-c">
        <div className="pt-[30%] md:pt-[10%] w-[90%] md:w-[70%] flex flex-col gap-5 items-center text-center">
          <h1 className="text-3xl md:text-6xl font-semibold">
            Nigeria&apos;s <span className="text-[#3ad688]">No.1</span>
             Free Stylists and Beauty Marketplace!
          </h1>
          <p className="text-xl text-secondary">
            Discover barbers, stylists, hair salons, skin care and wellness
            professionals near you
          </p>
          <div className="relative md:w-[70%] w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 text-tertiary-c" />
            <Input
              type="text"
              placeholder="I'm looking for ..."
              className="pl-10 py-6 md:py-8 text-[#898989] bg-[#141416] border-0 text-md md:text-lg font-semibold"
            />
          </div>
        </div>
        <div className="w-[30%] md:w-[10%] flex gap-2 items-center pb-10">
          {media.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-full w-full ${
                index === idx ? "bg-[#4ec63e] h-[6]" : "bg-secondary h-1"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
