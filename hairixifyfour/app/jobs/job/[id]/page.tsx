"use client";

import JobHero from "@/screens/JobScreen/JobHero";
import JobDescription from "@/screens/JobScreen/JobDescription";
import JobSidebar from "@/screens/JobScreen/JobSidebar";
import { RecommendedJob } from "@/screens/JobScreen/RecommendedJob";

export default function JobPage() {
  return (
    <div className="mt-10 md:mt-0 space-y-10">
      <JobHero />

      <div className="px-5 md:px-[68px] flex flex-col lg:flex-row gap-8">
        {/* MAIN CONTENT */}
        <div className="lg:w-2/3 space-y-8">
          <JobDescription />
        </div>

        {/* SIDEBAR */}
        <div className="lg:w-1/3">
          <JobSidebar />
        </div>
      </div>

      <div className="px-5 md:px-[68px]">
        <RecommendedJob />
      </div>
    </div>
  );
}
