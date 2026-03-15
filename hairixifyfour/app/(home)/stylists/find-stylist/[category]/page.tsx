"use client";

import { Cat } from "@/app/api/cats/route";
import { UseGen } from "@/context/GeneralContext";
import { CATEGORY_DATA } from "@/lib/dummyData";
import Blog from "@/screens/FindStylistScreen/Blog";
import Location from "@/screens/FindStylistScreen/Location";
import { Recommended } from "@/screens/FindStylistScreen/Recommended";
import Reviews from "@/screens/FindStylistScreen/Reviews";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { providers } = UseGen();

  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    fetch("/api/cats")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setCats(d.cat);
      })
      .catch(() => {
        /* fall back to empty silently */
      });
  }, []);

  const subCategory = useMemo(() => {
    for (const cat of cats) {
      const sub = cat.subs?.find((s) => s.slug === category);
      if (sub) return sub;
    }
    return null;
  }, [cats, category]);

  return (
    <section className="p-5 md:p-[68px] space-y-[68px] md:space-y-[68px]">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-14">
        {/* TEXT */}
        <div className="space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold capitalize leading-tight">
            {subCategory?.name} Near You
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ut
            nostrum eveniet nisi. Perspiciatis rem provident incidunt labore
            nisi quia dolorem doloribus id, eligendi, mollitia in non impedit
            minus rerum?Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae reiciendis dolores temporibus facere accusamus vero
            quidem consectetur voluptatum nostrum, exercitationem nihil.
            Reprehenderit consectetur consequuntur pariatur dolor quidem,
            molestiae culpa atque?
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
          {/* <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
            priority
          /> */}

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
        </div>
      </div>
      <Recommended providers={providers} category={subCategory?.name || ""} />
      <Location category={subCategory?.name || ""} />
      <Reviews category={subCategory?.name || ""} />
      <Blog category={subCategory?.name || ""} />
    </section>
  );
}
