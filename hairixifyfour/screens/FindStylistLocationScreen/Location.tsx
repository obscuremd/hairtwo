import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function Location({ category }: { category: string }) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-10 mx-auto">
      <h2 className="text-center text-xl md:text-[2rem] font-bold">
        Explore {category} Provider by City
      </h2>

      {/* Location Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-7 w-full">
        {locationData.map((data, idx) => (
          <Link
            className="w-full"
            key={idx}
            href={`/find-stylist/${category}/${data}`}
          >
            <button className="w-full bg-white py-4 px-4 rounded-lg border-2 hover:border-primary-c hover:text-primary-c text-sm md:text-md font-medium transition text-start">
              {category} in {data}
            </button>
          </Link>
        ))}
      </div>
      <Button className="bg-secondary-c w-fit">Use My Location</Button>
    </div>
  );
}

const locationData = [
  "Warri Central",
  "Warri Central",
  "Warri Central",
  "Warri Central",
  "Lagelu Ogbomosho North",
  "Lagelu Ogbomosho North",
  "Lagelu Ogbomosho North",
  "Lagelu Ogbomosho North",
  "Lagos Island",
  "Lagos Island",
  "Lagos Island",
  "Lagos Island",
  "Akoko South Akure East",
  "Akoko South Akure East",
  "Akoko South Akure East",
  "Akoko South Akure East",
  "Gwagwalada",
  "Gwagwalada",
  "Gwagwalada",
  "Gwagwalada",
];
