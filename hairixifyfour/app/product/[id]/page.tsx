"use client";

import { Button } from "@/components/ui/button";
import About from "@/screens/ServiceProviderScreen/About";
import Blog from "@/screens/ServiceProviderScreen/Blog";
import Description from "@/screens/ServiceProviderScreen/Description";
import Hero from "@/screens/ServiceProviderScreen/Hero";
import Reviews from "@/screens/ServiceProviderScreen/Reviews";
import Services from "@/screens/ServiceProviderScreen/Services";

export default function index() {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr] gap-">
        <div className="">
          <Hero />
          <Services />
        </div>
        <About />
      </div>
      <Reviews />
      <Blog />
    </div>
  );
}
