"use client";

import { HomeSkeleton } from "@/components/screenComponents/Main/skeleton";
import { UseGen } from "@/context/GeneralContext";
import Article from "@/screens/HomeScreen/Articles";
import Hero from "@/screens/HomeScreen/Hero";
import HomeCard4, {
  HomeCard1,
  HomeCard2,
  HomeCard3,
} from "@/screens/HomeScreen/HomeCard";
import SearchScreen from "@/screens/HomeScreen/SearchScreen";
import { Recommended } from "@/screens/HomeScreen/Shops";
import { GetProviders } from "@/utils/providers";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [loading, setLoading] = useState(true); // start true — avoids flash
  const { setProviders } = UseGen();

  useEffect(() => {
    async function getProviders() {
      try {
        const response = await GetProviders();
        if (response.success === true) {
          setProviders(response.data);
        } else {
          toast.message(response.message);
        }
      } finally {
        setLoading(false);
      }
    }
    getProviders();
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="min-h-screen max-w-full relative">
      <Hero />

      <div className="w-full px-5 py-10 md:p-[68px]">
        <Recommended />
      </div>

      {/* Cards with background */}
      <div className="relative">
        <div className="absolute inset-x-0 h-[70%] bottom-0 bg-[#F3FAF4] -z-10" />
        <div className="w-full p-5 md:p-[42px] md:space-y-[30px]">
          <HomeCard1 />
          <HomeCard2 />
        </div>
      </div>

      <div className="w-full px-5 md:px-[68px]">
        <HomeCard4 />
        <HomeCard3 />
        <SearchScreen />
        <Article />
      </div>
    </div>
  );
}
