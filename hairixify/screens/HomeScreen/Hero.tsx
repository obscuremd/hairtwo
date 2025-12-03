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
        "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Fsb258ZW58MHx8MHx8fDA%3D",
      primary_text: "Mo's Signatures",
      secondary_text: "Alimosho, Lagos State",
      category: "make up",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2Fsb258ZW58MHx8MHx8fDA%3D",
      primary_text: "Elevated Cutz",
      secondary_text: "Warri, Delta State",
      category: "Barber",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2Fsb258ZW58MHx8MHx8fDA%3D",
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
    <main className="relative w-full h-[80vh] md:h-[80vh]">
      <AnimatePresence>
        <motion.div
          key={index} // important
          initial={{ opacity: 0, x: 100, scale: -0.5 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.5 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={media[index].image}
            alt={`hero image ${index}`}
            fill
            className="object-cover rounded-3xl"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-between p-4 rounded-3xl text-tertiary-c bg-linear-to-b from-black/50 to-black/90 ">
        <div className="pt-[40%] md:pt-[10%] px-10 flex flex-col gap-2 items-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-primary-c">No.1</span>
             Free stylists and marketplace website!
          </h1>
          <p className="text-lg font-light text-secondary">
            Discover barbers, stylists, hair salons and therapy professionals
            around you...
          </p>
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary-c" />
            <Input
              type="text"
              placeholder="Im looking for ..."
              className="pl-10 text-tertiary-c"
            />
          </div>
        </div>
        <div className="self-end space-y-2">
          <div className="w-full flex gap-2">
            {media.map((item, idx) => (
              <div
                key={idx}
                className={`w-1/3 h-1 rounded-full ${
                  index === idx ? "bg-primary-c" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <Link href={`/product/${index}`}>
            <div className="bg-muted flex gap-10 text-secondary-c rounded-2xl p-2">
              <div className="flex gap-2">
                <img
                  src={media[index].image}
                  alt={`hero image ${index}`}
                  className="object-cover w-24 h-14 rounded-xl"
                />

                <div>
                  <h1 className="text-lg font-bold w-28 text-nowrap truncate">
                    {media[index].primary_text}
                  </h1>
                  <p className="text-sm font-light w-28 text-nowrap truncate">
                    {media[index].secondary_text}
                  </p>
                </div>
              </div>
              <Badge className="h-fit">{media[index].category}</Badge>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
