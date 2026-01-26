import { MapPin, Star } from "iconoir-react";
import { motion } from "motion/react";

type MarketplaceCardProps = {
  image: string;
  plan: "free" | "bronze" | "silver" | "gold";
  title: string;
  price: number;
  location?: string;
  condition: string;
};

const planStyles = {
  bronze: "ring-1 ring-white/40",
  silver: "ring-2 ring-white/60",
  gold: "ring-2 ring-white shadow-md",
};

export function MarketplaceCard({
  image,
  plan,
  title,
  price,
  location,
  condition,
}: MarketplaceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group w-full rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-xl cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Plan Badge */}
        {plan !== "free" && (
          <span
            className={`absolute top-2 left-2 flex items-center gap-1
              bg-[#12ab5a] text-white text-[10px] font-semibold
              px-2.5 py-1 rounded-full capitalize            `}
          >
            <Star />
            {plan}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-1.5">
        {/* Price */}
        <p className="text-[#14ca69] text-sm font-semibold">
          ₦{price.toLocaleString()}
        </p>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
          {title}
        </h3>

        {/* Meta */}
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          {location && (
            <div className="flex items-center gap-1 min-w-0">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}

          <span className="capitalize whitespace-nowrap">{condition}</span>
        </div>
      </div>
    </motion.div>
  );
}
