"use client";

import { MarketplaceCard } from "@/components/localComponents/marketplaceCard";
import { Separator } from "@/components/ui/separator";
import { generalData, recommendedData } from "@/lib/dummyData";
import Filters from "@/screens/MarketPlaceScreen/Filters";
import { Recommended } from "@/screens/MarketPlaceScreen/Recommended";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { category } = useParams<{ category?: string }>();
  return (
    <div>
      <div className="pt-[68px] ">
        <Recommended />
      </div>
      <div className="px-[68px]">
        <Separator className="w-[50%] bg-gray-300" />
      </div>
      <div className="p-4 md:py-[68px] md:px-[68px] flex flex-col md:flex-row gap-10 items-start">
        <Filters />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full">
          {generalData.map((item, idx) => (
            <Link key={idx} href={`/marketplace/product/${idx}`}>
              <MarketplaceCard {...item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
