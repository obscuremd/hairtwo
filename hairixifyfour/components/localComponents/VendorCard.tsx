import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

type Service = {
  id: string;
  name: string;
  description?: string;
  duration: string;
  price: number;
  discount?: number;
  discountedPrice?: number;
};

type VendorCardProps = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  distance: string;
  location: string;
  services: Service[];
};

export default function VendorCard({
  id,
  name,
  image,
  rating,
  reviews,
  distance,
  location,
  services,
}: VendorCardProps) {
  return (
    <div className="w-full bg-white border rounded-xl p-5 flex flex-col md:flex-row gap-6 hover:shadow-md transition">
      {/* Left: Vendor Image */}
      <div className="relative w-full h-72 md:w-2/6 shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Right: Vendor Info */}
      <div className="flex-1 space-y-4 w-full md:w-4/6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-5 justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">{name}</h3>
            <p className="text-sm text-gray-500">
              {distance} • {location}
            </p>
          </div>

          <div className="bg-[#12ab5a] text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm flex items-center gap-2">
            <p className="text-sm font-bold">{rating.toFixed(1)}</p>
            <p className="text-xs">({reviews} reviews)</p>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex justify-between items-start border-t pt-3"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{service.name}</p>
                {service.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {service.description}
                  </p>
                )}
                {service.discount && (
                  <Badge className="text-[#004737] bg-[#12ab594a]">
                    Save up to {service.discount}%
                  </Badge>
                )}
              </div>

              <div className="flex flex-col items-end">
                <div className="flex gap-2">
                  {/* Original price */}
                  <p
                    className={` ${service.discountedPrice ? "line-through text-muted-foreground text-sm" : "text-sm font-semibold"}`}
                  >
                    {service.price === 0 ? "Free" : `$${service.price}`}
                  </p>

                  {/* Discounted price (only show if it exists) */}
                  {service.discountedPrice !== undefined && (
                    <p className="text-sm font-semibold">
                      {service.discountedPrice === 0
                        ? "Free"
                        : `$${service.discountedPrice}`}
                    </p>
                  )}
                </div>

                <p className="text-xs text-gray-400">{service.duration}</p>

                <Link
                  href={`/book/${id}?service=${service.id}`}
                  className="inline-block mt-2 text-xs font-medium text-primary-c hover:underline"
                >
                  <Button className="bg-secondary-c h-8">Book</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
