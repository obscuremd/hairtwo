"use client";

import { jobData } from "@/lib/dummyData";
import { JobCard } from "@/screens/JobScreen/JobCard";
import { useParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
      <div className=" mx-auto px-4 md:px-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-16">
          {jobData.map((job, idx) => (
            <JobCard key={idx} {...job} />
          ))}
        </div>
      </div>

      <Pagination className="pb-16">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
