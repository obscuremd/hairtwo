import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { clientTestimonials, providerTestimonials } from "@/lib/dummyData";

export default function Reviews({ category }: { category: string }) {
  return (
    <div className={` flex flex-col gap-4 w-full`}>
      <div className="flex flex-col gap-5 justify-center text-center">
        <h3 className="text-xl md:text-[2rem] font-bold">
          {category} - Customer Reviews
        </h3>
      </div>
      <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={clientTestimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={providerTestimonials}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}
