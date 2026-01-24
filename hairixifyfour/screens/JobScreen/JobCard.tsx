import Image from "next/image";
import { Briefcase, Clock, Eye } from "lucide-react";
import Link from "next/link";

type JobCardProps = {
  image: string;
  title: string;
  salary: string;
  position: string;
  qualifications: string;
  experience: string;
  jobType: string;
  category: string;
  datePosted: string;
  views: number;
};

export function JobCard({
  image,
  title,
  salary,
  position,
  qualifications,
  experience,
  jobType,
  category,
  datePosted,
  views,
}: JobCardProps) {
  return (
    <Link
      href={`/jobs/job/${title}`}
      className="
        bg-white rounded-2xl border p-4
        flex flex-col sm:flex-row gap-4
        hover:shadow-md transition
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative w-full h-[160px]
          sm:h-[72px] sm:w-[72px]
          shrink-0 overflow-hidden rounded-xl border
        "
      >
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* CONTENT */}
      <div className="flex-1 space-y-3">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {position} • {jobType}
            </p>
          </div>

          <span className="text-sm font-semibold text-[#14ca69]">{salary}</span>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded-full bg-muted whitespace-nowrap">
            {category}
          </span>
          <span className="px-2 py-1 rounded-full bg-muted whitespace-nowrap">
            {experience}
          </span>
          <span className="px-2 py-1 rounded-full bg-muted whitespace-nowrap">
            {qualifications}
          </span>
        </div>

        {/* FOOTER */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {datePosted}
            </div>
            <div className="flex items-center gap-1">
              <Eye size={14} />
              {views}
            </div>
          </div>

          <Briefcase size={18} className="text-[#14ca69]" />
        </div>
      </div>
    </Link>
  );
}
