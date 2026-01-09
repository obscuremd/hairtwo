"use client";

import { CATEGORY_DATA } from "@/lib/dummyData";
import Blog from "@/screens/FindStylistScreen/Blog";
import Location from "@/screens/FindStylistScreen/Location";
import { Recommended } from "@/screens/FindStylistScreen/Recommended";
import Reviews from "@/screens/FindStylistScreen/Reviews";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Page() {
  const { category } = useParams<{ category: string }>();

  const data = CATEGORY_DATA[category as keyof typeof CATEGORY_DATA];

  return (
    <section className="p-5 md:p-[68px] space-y-[68px] md:space-y-[136px]">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-14 items-center">
        {/* TEXT */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold capitalize leading-tight">
            {data.title} Near You
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            {data.description}
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
        </div>
      </div>
      <Recommended category={data.title} />
      <Location category={data.title} />
      <Reviews category={data.title} />
      <Blog category={data.title} />
    </section>
  );
}
