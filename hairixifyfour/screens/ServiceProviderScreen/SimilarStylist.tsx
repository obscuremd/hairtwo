"use client";
import { ProductCard } from "@/components/localComponents/productCard";
import { shopMedia } from "@/lib/dummyData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export function SimilarStylist() {
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
    <div className="relative w-full p-5 md:p-[68px] md:pt-0">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl md:text-[2rem] font-bold capitalize">
          Similar Stylist Providers
        </h2>
        <h2 className="text-md font-semibold text-primary-c">Show More</h2>
      </div>

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
        {shopMedia.slice(0, 5).map((item, idx) => (
          <Link key={idx} href={`/product/${idx}`}>
            <ProductCard {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
}
