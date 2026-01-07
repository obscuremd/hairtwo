"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Description() {
  return (
    <main className="relative w-full p-5 md:p-[68px] flex flex-col gap-3">
      <h1 className="text-xl md:text-[28px] font-semibold leading-[113%] ">
        Jasmyne Naturalle International
      </h1>
      <p className="text-lg text-[#bababa]">
        1, Raji Oba Bus Stop, Alimosho, Lagos
      </p>

      <div className="flex gap-2">
        <p className="text-lg text-[#56F09F] flex gap-2">
          <Star />
          4.95
        </p>
        <p className="text-lg text-[#bababa]">(438 Reviews)</p>
      </div>

      <div className="flex gap-3">
        <Button className="bg-secondary-c w-fit">Book Your Appointment</Button>
        <Button variant={"secondary"} className="w-fit">
          Send a message
        </Button>
      </div>
    </main>
  );
}
