import { MapPin } from "iconoir-react";
import { motion } from "motion/react";

type MarketplaceCardProps = {
  image: string;
  title: string;
  price: number;
  location?: string;
  condition: string;
};

export function MarketplaceCard({
  image,
  title,
  price,
  location,
  condition,
}: MarketplaceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-[220px] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-[160px] w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Category Badge */}
        <span className="absolute top-2 left-2 bg-[#12ab5a] text-white text-[10px] font-semibold px-2 py-1 rounded-full capitalize">
          {condition}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 space-y-1">
        {/* Price */}
        <p className="text-[#14ca69] text-sm font-semibold">
          ${price.toLocaleString()}
        </p>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>

        {/* Location */}
        {location && (
          <div className="flex items-center gap-1 text-[11px] text-gray-500">
            <MapPin className="w-3 h-3" />
            <span className="line-clamp-1">{location}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
