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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero / Recommended */}
      <div className="pt-[72px]">
        <Recommended />
      </div>

      {/* Main Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        {/* Divider */}
        <Separator className="mb-8 bg-gray-200" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold capitalize">
              {category ?? "Marketplace"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Showing {generalData.length} products
            </p>
          </div>

          {/* Sort */}
          <select className="border rounded-md px-3 py-2 text-sm w-[180px]">
            <option>Sort by: Popular</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8">
          <Filters />

          {/* Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
            {generalData.map((item, idx) => (
              <Link
                key={idx}
                href={`/marketplace/product/${idx}`}
                className="group"
              >
                <MarketplaceCard {...item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
