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
      <div className="p-5 md:p-[68px] space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {cleanCategory} Near Me in {cleanLocation}
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse top-rated providers, compare services, and book instantly
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Search */}
          <div className="w-full lg:max-w-md">
            <Input
              placeholder="Search for a business or service"
              className="h-11"
            />
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" className=" gap-2">
              <Filter />
              Filters
            </Button>

            <Select>
              <SelectTrigger className="h-11 w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="reviews">Highest Reviews</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="pt-2">
          <Recommended />
        </div>
      </div>

      <div className="p-5 md:p-[68px] mx-auto space-y-6">
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
