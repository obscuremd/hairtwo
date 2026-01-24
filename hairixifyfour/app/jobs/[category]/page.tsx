"use client";

import { jobData } from "@/lib/dummyData";
import { JobCard } from "@/screens/JobScreen/JobCard";
import { useParams } from "next/navigation";

export default function JobsPage() {
  const { category } = useParams<{ category?: string }>();

  return (
    <div className="">
      {/* HEADER */}
      <div className="p-5 md:p-[68px]">
        <h1 className="text-3xl font-bold capitalize">
          Recent {category ?? "Beauty"} Jobs
        </h1>
        <p className="text-muted-foreground mt-1">
          Beauty Salons, Barbers, Hair Stylists, Massage & Makeup Artists
        </p>
      </div>

      {/* JOB LIST */}
      <div className=" mx-auto px-4 md:px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobData.map((job, idx) => (
            <JobCard key={idx} {...job} />
          ))}
        </div>
      </div>
    </div>
  );
}
