"use client";

import { Button } from "@/components/ui/button";
import About from "@/screens/MarketPlaceScreen/About";
import Hero from "@/screens/MarketPlaceScreen/Hero";
import Reviews from "@/screens/MarketPlaceScreen/Reviews";
import Description from "@/screens/MarketPlaceScreen/Description";
import { Recommended } from "@/screens/MarketPlaceScreen/Recommended";

export default function index() {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-5">
        <div className=" md:w-4/6">
          <Hero />
          <Description />
        </div>
        <div className="md:w-2/6">
          <About />
        </div>
      </div>
      <Reviews />
      <Recommended />
    </div>
  );
}
