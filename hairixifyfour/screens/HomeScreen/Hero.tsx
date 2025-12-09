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

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [media.length]);

  return (
    <main className="relative w-full h-[80vh] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index} // important
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={media[index].image}
            alt={`hero image ${index}`}
            fill
            className="object-cover "
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-between p-4 text-tertiary-c bg-linear-to-b from-black/50 to-black/70 ">
        <div className="pt-[30%] md:pt-[10%] w-[90%] md:w-[70%] flex flex-col gap-5 items-center text-center">
          <h1 className="text-3xl md:text-6xl font-bold">
            Nigeria&apos;s <span className="text-primary-c">No.1</span>
             Free stylists and Beauty marketplace!
          </h1>
          <p className="text-2xl font-light text-secondary">
            Discover barbers, stylists, hair salons skin care and wellness
            professionals near you
          </p>
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary-c" />
            <Input
              type="text"
              placeholder="Im looking for ..."
              className="pl-10 py-6 text-tertiary-c bg-foreground border-0"
            />
          </div>
        </div>
        <div className="w-[30%] md:w-[10%] flex gap-2 items-center">
          {media.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-full ${
                index === idx
                  ? "bg-primary-c w-3/4 h-[6]"
                  : "bg-secondary w-1/4 h-1"
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
