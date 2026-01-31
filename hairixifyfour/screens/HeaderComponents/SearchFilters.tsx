"use client";
import { Input } from "@/components/ui/input";
import { Filter, MapPin, SearchIcon } from "lucide-react";
import { useParams } from "next/navigation";

export function SearchFilters() {
  const { category } = useParams<{ category?: string }>();
  const activeCategory = category?.toLowerCase();

  return (
    <div className="w-full bg-[#09090b] md:h-[70px] md:py-0 gap-2 md:gap-5 flex flex-col md:flex-row items-center p-5 md:px-[60px]">
      <div className="relative w-full h-[40px]">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
        <Input
          type="text"
          placeholder="Search Services Providers"
          className="pl-10 text-[#898989] bg-white border-0 text-md md:text-md h-[40px]"
        />
      </div>
      <div className="md:w-1/2 flex gap-2 md:gap-5">
        <div className="relative w-full h-[40px]">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
          <Input
            type="text"
            placeholder="Where"
            className="pl-10 text-[#898989] bg-white border-0 text-md md:text-md h-[40px]"
          />
        </div>
        <div className="relative w-full h-[40px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-10 " />
          <Input
            type="text"
            placeholder="Filter"
            className="pl-10 text-[#898989] bg-white border-0 text-md md:text-md h-[40px]"
          />
        </div>
      </div>
    </div>
  );
}
