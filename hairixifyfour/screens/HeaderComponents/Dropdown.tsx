import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export function Dropdown({ data }: { data: dropdownTypes[] }) {
  const { category } = useParams<{ category?: string }>();
  const activeCategory = category?.toLowerCase();

  return (
    // OUTER WRAPPER (controls shape & background)
    <div className="w-full bg-[#09090b] overflow-hidden md:px-[68px] px-5">
      {/* SCROLL CONTAINER */}
      <div
        className="
      flex items-center justify-center
      gap-2 md:gap-6
      overflow-x-auto
      py-3
      scrollbar-thin scrollbar-thumb-muted
      scrollbar-track-transparent
    "
        style={{ scrollbarGutter: "stable" }}
      >
        {data.map((item, index) => {
          const hrefCategory = item.href.split("/").pop()?.toLowerCase();
          const isActive = hrefCategory === activeCategory;

          return (
            <Link key={index} href={item.href} className="shrink-0">
              <div
                className={`
              group flex flex-col items-center justify-between
              w-[84px] min-h-[76px] px-2 pb-1
              text-xs font-medium transition
              ${isActive ? "text-[#3ad688]" : "text-muted-foreground"}
            `}
              >
                {/* Icon */}
                <div
                  className={`
                flex h-10 w-10 items-center justify-center rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? "bg-[#1CAB70] text-white"
                    : "bg-[#003226] text-[#3ad688] group-hover:bg-[#003226]/60"
                }
              `}
                >
                  {item.icon}
                </div>

                {/* Label */}
                <span
                  className={`
                mt-1 text-center leading-tight line-clamp-2
                ${isActive ? "text-[#3ad688]" : "group-hover:text-muted"}
              `}
                >
                  {item.title}
                </span>
              </div>
            </Link>
          );
        })}

        {/* RIGHT SPACER */}
        <div className="shrink-0 md:w-[68px] w-5" />
      </div>
    </div>
  );
}
