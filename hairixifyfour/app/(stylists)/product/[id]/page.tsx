"use client";

import { Button } from "@/components/ui/button";
import About from "@/screens/ServiceProviderScreen/About";
import Amenities from "@/screens/ServiceProviderScreen/Amenities";
import Hero from "@/screens/ServiceProviderScreen/Hero";
import Reviews from "@/screens/ServiceProviderScreen/Reviews";
import Services from "@/screens/ServiceProviderScreen/Services";

export default function index() {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="">
      <div className="flex flex-col md:flex-row gap-5">
        <div className=" md:w-4/6">
          <Hero />
          <Services />
          <Amenities />
        </div>
        <div className="md:w-2/6">
          <About />
        </div>
      </div>
      <Reviews />
    </div>
  );
}
