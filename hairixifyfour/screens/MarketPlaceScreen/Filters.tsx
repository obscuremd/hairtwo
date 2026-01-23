/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";

const marketplaceTypes = [
  "beauty accessories",
  "beauty care",
  "facial care",
  "fragrances",
  "hair beauty",
  "haircare products",
  "makeup",
  "nail, hands & foot care",
  "skincare",
  "wigs & hair extensions",
];

const brands = [
  "L’Oréal",
  "Maybelline",
  "MAC",
  "Fenty Beauty",
  "Nivea",
  "Dove",
  "Shea Moisture",
];

const conditions = ["new", "used"];
const warranties = ["no warranty", "1 week", "2 weeks", "1 month"];
const genders = ["male", "female", "unisex"];

function FilterBlock({ title, children }: any) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold">{title}</p>
      {children}
    </div>
  );
}

function FilterContent() {
  return (
    <div className="space-y-6">
      {/* Category */}
      <FilterBlock title="Marketplace Types">
        <Input placeholder="Search category" />
        <div className="space-y-2">
          {marketplaceTypes.map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm">
              <Checkbox />
              <span className="capitalize">{item}</span>
            </label>
          ))}
        </div>
      </FilterBlock>

      {/* Brand */}
      <FilterBlock title="Brand">
        <Input placeholder="Search brand" />
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm">
              <Checkbox />
              {brand}
            </label>
          ))}
        </div>
      </FilterBlock>

      {/* Condition */}
      <FilterBlock title="Product Condition">
        <div className="space-y-2">
          {conditions.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <Checkbox />
              {c}
            </label>
          ))}
        </div>
      </FilterBlock>

      {/* Warranty */}
      <FilterBlock title="Warranty">
        <div className="space-y-2">
          {warranties.map((w) => (
            <label key={w} className="flex items-center gap-2 text-sm">
              <Checkbox />
              {w}
            </label>
          ))}
        </div>
      </FilterBlock>

      {/* Gender */}
      <FilterBlock title="Gender">
        <div className="space-y-2">
          {genders.map((g) => (
            <label key={g} className="flex items-center gap-2 text-sm">
              <Checkbox />
              {g}
            </label>
          ))}
        </div>
      </FilterBlock>

      {/* Price */}
      <FilterBlock title="Price Range">
        <Slider
          defaultValue={[20000, 150000]}
          min={0}
          max={300000}
          step={5000}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$0</span>
          <span>$300,000</span>
        </div>
      </FilterBlock>
    </div>
  );
}

export default function Filters() {
  return (
    <>
      <aside className="hidden md:block w-[260px] shrink-0">
        <div className="sticky top-[90px] space-y-6">
          <FilterContent />
        </div>
      </aside>
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </SheetTrigger>

          <SheetContent side="bottom" className="h-[85vh] overflow-y-auto p-5">
            <div className="pb-20">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <FilterContent />
              <div className="mt-6 flex gap-3">
                <Button className="flex-1">Apply Filters</Button>
                <Button variant="outline" className="flex-1">
                  Reset
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
