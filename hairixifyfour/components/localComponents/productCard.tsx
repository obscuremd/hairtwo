import { MapPin } from "iconoir-react";
import { motion } from "motion/react";

export function ProductCard({
  image,
  primary_text,
  address,
  description,
  category,
}: {
  image: string;
  primary_text: string;
  category: string;
  description: string;
  address: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      className="relative w-[220px] h-[300px] rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer shadow-md"
    >
      {/* Background */}
      <img
        src={image}
        alt={primary_text}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Category Badge */}
      <div className="absolute top-2 left-2">
        <span className="bg-[#12ab5a] text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-2 left-2 w-[90%] text-white pb-[20px]">
        <h3 className="text-base font-bold drop-shadow">{primary_text}</h3>

        {/* Address row */}
        <div className="flex items-center gap-1 text-[11px] opacity-90 mt-[2px]">
          <MapPin className="w-3 h-3" />
          <span>{address}</span>
        </div>

        {/* Description */}
        <p className="text-[11px] mt-2 line-clamp-2 opacity-80 drop-shadow ">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
