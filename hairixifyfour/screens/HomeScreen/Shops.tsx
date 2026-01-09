"use client";

import { ProductCard } from "@/components/localComponents/productCard";
import { shopMedia } from "@/lib/dummyData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function Recommended() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const cardWidth = 240; // width + gap
  const visibleCount = 3; // how many cards visible on large screens
  const maxScroll = (shopMedia.length - visibleCount) * cardWidth;

  const scrollTo = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    let newPos =
      direction === "right" ? scrollPos + cardWidth : scrollPos - cardWidth;

    if (newPos < 0) newPos = 0;
    if (newPos > maxScroll) newPos = maxScroll;

    setScrollPos(newPos);

    scrollRef.current.scrollTo({
      left: newPos,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full ">
      <h2 className="text-xl md:text-[2rem] font-bold">
        Recommended Stylist Providers
      </h2>

      {/* Arrow Buttons */}
      {scrollPos > 0 && (
        <button
          onClick={() => scrollTo("left")}
          className="absolute top-1/2 -translate-y-1/2 left-1 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronLeft className="w-5 h-5 text-primary-c" />
        </button>
      )}

      {scrollPos < maxScroll && (
        <button
          onClick={() => scrollTo("right")}
          className="absolute top-1/2 -translate-y-1/2 right-1 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronRight className="w-5 h-5 text-primary-c" />
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex w-full overflow-hidden gap-6 py-4 scroll-smooth"
      >
        {shopMedia.map((item, idx) => (
          <Link key={idx} href={`/product/${idx}`}>
            <ProductCard {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Trending() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const cardWidth = 240; // card width + gap
  const visibleCount = 3; // visible on desktop
  const maxScroll = (shopMedia.length - visibleCount) * cardWidth;

  const totalSections =
    shopMedia.length > visibleCount ? shopMedia.length - visibleCount + 1 : 1;

  const currentSection = Math.round(scrollPos / cardWidth);

  const scrollTo = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    let newPos =
      direction === "right" ? scrollPos + cardWidth : scrollPos - cardWidth;

    if (newPos < 0) newPos = 0;
    if (newPos > maxScroll) newPos = maxScroll;

    setScrollPos(newPos);

    scrollRef.current.scrollTo({
      left: newPos,
      behavior: "smooth",
    });
  };

  // Update scrollPos when user manually swipes on mobile
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollPos(container.scrollLeft);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full md:px-4">
      <h2 className="text-xl md:text-3xl font-bold text-[#058441]">
        Trending Beauty Marketplace Products
      </h2>

      {/* Arrow Buttons */}
      {scrollPos > 0 && (
        <button
          onClick={() => scrollTo("left")}
          className="absolute top-1/2 -translate-y-1/2 left-1 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronLeft className="w-5 h-5 text-primary-c" />
        </button>
      )}

      {scrollPos < maxScroll && (
        <button
          onClick={() => scrollTo("right")}
          className="absolute top-1/2 -translate-y-1/2 right-1 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronRight className="w-5 h-5 text-primary-c" />
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex w-full overflow-hidden gap-6 py-4 scroll-smooth"
      >
        {shopMedia.map((item, idx) => (
          <ProductCard key={idx} {...item} />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {Array.from({ length: totalSections }).map((_, idx) => (
          <div
            key={idx}
            className={`
              w-3 h-3 rounded-full transition-all
              ${idx === currentSection ? "bg-primary-c" : "bg-gray-300"}
            `}
          />
        ))}
      </div>
    </div>
  );
}
