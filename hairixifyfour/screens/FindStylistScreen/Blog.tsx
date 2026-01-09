"use client";
import { ArticleCard } from "@/components/localComponents/articleCard";
import { articleData } from "@/lib/dummyData";
import { Calendar, Heart, Tag } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Blog({ category }: { category: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollStep = () => {
      container.scrollLeft += 1.2; // good sweet spot

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(scrollStep);
    };

    const startScroll = () => {
      stopScroll(); // PROTECT — prevents multiple RAF timers
      animationRef.current = requestAnimationFrame(scrollStep);
    };

    const stopScroll = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    startScroll();

    container.addEventListener("mouseenter", stopScroll);
    container.addEventListener("mouseleave", startScroll);

    return () => {
      stopScroll();
      container.removeEventListener("mouseenter", stopScroll);
      container.removeEventListener("mouseleave", startScroll);
    };
  }, []);

  return (
    <div className="w-full py-10 md:py-[68px] mx-auto">
      <h2 className="text-center text-xl md:text-[2rem] font-bold mb-3">
        {category} Blogs & Articles
      </h2>

      <div
        ref={scrollRef}
        className="flex w-full overflow-x-auto gap-6 py-4 scrollbar-hide"
      >
        {articleData.map((item, idx) => (
          <ArticleCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}
