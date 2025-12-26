"use client";

import { Button } from "@/components/ui/button";
import Hero from "@/screens/ServiceProviderScreen/Hero";
import Reviews from "@/screens/ServiceProviderScreen/Reviews";
import Services from "@/screens/ServiceProviderScreen/Services";

export default function index() {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="">
      <Hero />
      <div className="space-y-2 p-5 md:p-[68px] bg-[#F3FAF4]">
        <p className="text-xl md:text-[2rem] font-bold">About Us</p>
        <p className="md:text-lg font-medium">
          For any kind of make up - Owanbe, video/photoshoot, traditional,
          registry/court - We got your covered.
        </p>
      </div>
      <Services />
      <Reviews />
    </div>
  );
}
