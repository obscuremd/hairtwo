"use client";

import { Button } from "@/components/ui/button";
import Hero from "@/screens/ServiceProviderScreen/Hero";
import Reviews from "@/screens/ServiceProviderScreen/Reviews";
import Services from "@/screens/ServiceProviderScreen/Services";

export default function index() {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="space-y-12">
      <Hero />
      {isMobile && (
        <div className="flex flex-col md:items-end items-start -mt-5">
          <p className="text-lg">
            Jasmyne Naturalle International is currently open
          </p>
          <Button className="bg-secondary-c text-primary-c">
            Check their Buisness Hours
          </Button>
        </div>
      )}
      <div className="space-y-2">
        <p className="text-4xl font-semibold text-primary-c">About Us</p>
        <p className="text-lg font-medium ">
          For any kind of make up - Owanbe, video/photoshoot, traditional,
          registry/court - We got your covered.
        </p>
      </div>
      <Services />
      <Reviews />
    </div>
  );
}
