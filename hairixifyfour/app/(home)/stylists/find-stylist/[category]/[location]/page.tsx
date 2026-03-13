"use client";

import VendorCard from "@/components/localComponents/VendorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { vendors } from "@/lib/dummyData";
import { Recommended } from "@/screens/FindStylistLocationScreen/Recommended";
import { Filter } from "iconoir-react";
import { useParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Page() {
  const { category, location } = useParams<{
    category: string;
    location: string;
  }>();

  const cleanCategory = decodeURIComponent(category);
  const cleanLocation = decodeURIComponent(location);

  return (
    <div>
      <div className="p-5 pt-10 md:p-[68px] md:pt-[50px] space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {cleanCategory} Near Me in {cleanLocation}
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse top-rated providers, compare services, and book instantly
          </p>
        </div>

        {/* Results */}
        <div className="pt-2">
          <Recommended />
        </div>
      </div>

      <div className="p-5 md:px-[68px] mx-auto space-y-6">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} {...vendor} />
        ))}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
