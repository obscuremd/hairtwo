"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const media = [
    {
      image:
        "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?w=600&auto=format&fit=crop&q=60",
      primary_text: "Mo's Signatures",
      secondary_text: "Alimosho, Lagos State",
      category: "Make up",
      description:
        "Award-winning makeup artistry specializing in bridal glam, editorial beauty, and premium skin-based finishes.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&auto=format&fit=crop&q=60",
      primary_text: "Elevated Cutz",
      secondary_text: "Warri, Delta State",
      category: "Barber",
      description:
        "A premium grooming lounge offering fades, beard sculpting, traditional trims, and male luxury haircare.",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1683134297492-cce5fc6dae31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3BhfGVufDB8fDB8fHww",
      primary_text: "Wellness Spa",
      secondary_text: "Sango Ota, Ogun State",
      category: "Skin Care",
      description:
        "Holistic spa providing massages, facials, aromatherapy and complete rejuvenation therapy.",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1664301489002-2fed4596c101?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fFNhbG9ufGVufDB8fDB8fHww",
      primary_text: "Sleek Strands Salon",
      secondary_text: "Victoria Island, Lagos",
      category: "Hair Styling",
      description:
        "Specialists in extensions, silk press, braids, luxury wigs and hair-texture repair treatments.",
    },
  ];

  // Sync big image with selected carousel item
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setIndex(api.selectedScrollSnap());
    };

    handleSelect();
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <main className="w-full flex flex-col md:flex-row gap-6 items-center justify-between text-tertiary-c">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 md:w-[45%] w-full">
        {/* TEXT SECTION */}
        <div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug">
            <span className="text-primary-c">No.1</span> Free stylists and
            marketplace website!
          </h1>
          <p className="text-lg font-light">
            Discover barbers, stylists, hair salons and therapy professionals
            around you...
          </p>

          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary-c" />
            <Input
              placeholder="I'm looking for..."
              className="pl-10 text-tertiary-c"
            />
          </div>
        </div>

        {/* IMAGE FOR MOBILE ONLY */}
        {isMobile && (
          <div className="relative w-full h-[300px] rounded-3xl overflow-hidden">
            <Image
              src={media[index].image}
              alt=""
              fill
              className="object-cover object-center transition-all duration-500"
            />
            {/* MOBILE TEXT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-4">
              <h2 className="text-xl font-bold text-white drop-shadow-md">
                {media[index].primary_text}
              </h2>
              <p className="text-white/90 text-sm drop-shadow-md">
                {media[index].secondary_text}
              </p>
              <p className="text-white/80 text-xs mt-2">
                {media[index].description}
              </p>
            </div>
          </div>
        )}

        {/* MEDIA CAROUSEL */}
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: true }}
          className="w-full"
        >
          <CarouselContent className="flex items-center py-4">
            {media.map((item, i) => (
              <CarouselItem
                key={i}
                className="basis-[75%] md:basis-[75%] lg:basis-[50%]"
              >
                <div
                  className={cn(
                    "bg-muted flex gap-3 items-center rounded-2xl p-2 transition-all duration-300 cursor-pointer",
                    index === i
                      ? "scale-[1.05] ring-2 ring-primary-c shadow-xl"
                      : "opacity-60"
                  )}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="object-cover w-24 h-24 rounded-xl"
                  />
                  <div className="w-36">
                    <h1 className="text-lg font-bold truncate">
                      {item.primary_text}
                    </h1>
                    <p className="text-sm font-light truncate">
                      {item.secondary_text}
                    </p>
                    <Badge className="mt-1 capitalize">{item.category}</Badge>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* RIGHT SIDE LARGE IMAGE */}
      {!isMobile && (
        <div className="relative w-full md:w-[55%] h-[500px] rounded-3xl overflow-hidden">
          <Image
            src={media[index].image}
            alt=""
            fill
            className="object-cover object-center transition-all duration-500"
          />

          {/* TEXT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/50 to-transparent" />

          <div className="absolute bottom-6 left-6 max-w-[80%]">
            <h2 className="text-3xl font-bold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              {media[index].primary_text}
            </h2>
            <p className="text-white/85">{media[index].secondary_text}</p>
            <p className="text-white/80 mt-3 text-sm leading-relaxed">
              {media[index].description}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
