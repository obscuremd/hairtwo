"use client";
import { ProductCard } from "@/components/localComponents/productCard";
import { shopMedia } from "@/lib/dummyData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

export function Recommended({
  category,
  providers,
}: {
  category: string;
  providers: Provider[];
}) {
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
      <h2 className="text-xl md:text-[2rem] font-bold capitalize">
        Recommended {category} Providers
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
        {providers.map((item, idx) => (
          <Link key={idx} href={`/stylists/product/${item.id}`}>
            <ProductCard
              address={`${item.local.name}`}
              category={item.category.slug}
              primary_text={item.business_name}
              description={item.address}
              image={
                `https://api5.project.hairxify.com/${item.user.gallery?.[0]?.image}` ||
                "https://images.unsplash.com/photo-1667021836621-ef302544b61f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZW1wdHklMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
