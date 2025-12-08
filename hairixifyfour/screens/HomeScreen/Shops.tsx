"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Recommended() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const cardWidth = 240; // width + gap
  const visibleCount = 3; // how many cards visible on large screens
  const maxScroll = (media.length - visibleCount) * cardWidth;

  const scrollTo = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    let newPos =
      direction === "right" ? scrollPos + cardWidth : scrollPos - cardWidth;

    if (newPos < 0) newPos = 0;
    if (newPos > maxScroll) newPos = maxScroll;

    setScrollPos(newPos);

    scrollRef.current.scrollTo({
      left: newPos,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full py-5 px-4">
      <h2 className="text-2xl md:text-3xl font-bold">
        Recommended Stylist Providers
      </h2>

      {/* Arrow Buttons */}
      {scrollPos > 0 && (
        <button
          onClick={() => scrollTo("left")}
          className="absolute top-1/2 -translate-y-1/2 left-1 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronLeft className="w-5 h-5 text-primary-c" />
        </button>
      )}

      {scrollPos < maxScroll && (
        <button
          onClick={() => scrollTo("right")}
          className="absolute top-1/2 -translate-y-1/2 right-1 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronRight className="w-5 h-5 text-primary-c" />
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex w-full overflow-hidden gap-6 py-4 scroll-smooth"
      >
        {media.map((item, idx) => (
          <ProductCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}

export function Trending() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);

  const cardWidth = 240; // card width + gap
  const visibleCount = 3; // visible on desktop
  const maxScroll = (media.length - visibleCount) * cardWidth;

  const totalSections =
    media.length > visibleCount ? media.length - visibleCount + 1 : 1;

  const currentSection = Math.round(scrollPos / cardWidth);

  const scrollTo = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    let newPos =
      direction === "right" ? scrollPos + cardWidth : scrollPos - cardWidth;

    if (newPos < 0) newPos = 0;
    if (newPos > maxScroll) newPos = maxScroll;

    setScrollPos(newPos);

    scrollRef.current.scrollTo({
      left: newPos,
      behavior: "smooth",
    });
  };

  // Update scrollPos when user manually swipes on mobile
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollPos(container.scrollLeft);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold">
        Trending Beauty Marketplace Products
      </h2>

      {/* Arrow Buttons */}
      {scrollPos > 0 && (
        <button
          onClick={() => scrollTo("left")}
          className="absolute top-1/2 -translate-y-1/2 left-1 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronLeft className="w-5 h-5 text-primary-c" />
        </button>
      )}

      {scrollPos < maxScroll && (
        <button
          onClick={() => scrollTo("right")}
          className="absolute top-1/2 -translate-y-1/2 right-1 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronRight className="w-5 h-5 text-primary-c" />
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex w-full overflow-hidden gap-6 py-4 scroll-smooth"
      >
        {media.map((item, idx) => (
          <ProductCard key={idx} {...item} />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {Array.from({ length: totalSections }).map((_, idx) => (
          <div
            key={idx}
            className={`
              w-3 h-3 rounded-full transition-all
              ${idx === currentSection ? "bg-primary-c" : "bg-gray-300"}
            `}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  image,
  primary_text,
  secondary_text,
  address,
  description,
  category,
}: {
  image: string;
  primary_text: string;
  secondary_text: string;
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
        <span className="bg-primary-c text-white text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-2 left-2 w-[90%] text-white">
        <h3 className="text-base font-bold drop-shadow">{primary_text}</h3>

        {/* Address row */}
        <div className="flex items-center gap-1 text-[11px] opacity-90 mt-[2px]">
          <MapPin className="w-3 h-3" />
          <span>{address}</span>
        </div>

        {/* Description */}
        <p className="text-[11px] mt-2 line-clamp-2 opacity-80 drop-shadow">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

const media = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?w=600&auto=format&fit=crop&q=60",
    primary_text: "Mo's Signatures",
    secondary_text: "Alimosho, Lagos State",
    category: "Make up",
    address: "Alimosho, Lagos",
    description:
      "Award-winning makeup artistry specializing in bridal glam, editorial beauty, and premium skin-based finishes.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&auto=format&fit=crop&q=60",
    primary_text: "Elevated Cutz",
    secondary_text: "Warri, Delta State",
    category: "Barber",
    address: "Warri, Delta",
    description:
      "A premium grooming lounge offering fades, beard sculpting, traditional trims, and male luxury haircare.",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1683134297492-cce5fc6dae31?w=600&auto=format&fit=crop&q=60",
    primary_text: "Wellness Spa",
    secondary_text: "Sango Ota, Ogun State",
    category: "Skin Care",
    address: "Sango Ota, Ogun",
    description:
      "Holistic spa providing massages, facials, aromatherapy and complete rejuvenation therapy.",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1664301489002-2fed4596c101?w=600&auto=format&fit=crop&q=60",
    primary_text: "Sleek Strands Salon",
    secondary_text: "Victoria Island, Lagos",
    category: "Hair Styling",
    address: "Victoria Island, Lagos",
    description:
      "Specialists in extensions, silk press, braids, luxury wigs and hair-texture repair treatments.",
  },

  // 👇 NEW ONES ADDED

  {
    image:
      "https://plus.unsplash.com/premium_photo-1661507250205-79ffef5cdeb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVhcmQlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D",
    primary_text: "Golden Beard Studio",
    secondary_text: "Lekki Phase 1, Lagos",
    category: "Barber",
    address: "Lekki, Lagos",
    description:
      "Premium men's grooming studio offering beard shaping, bald fades, hot towel shaving and beard hydration treatments.",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1664537435460-35963d8e413e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2tpbmNhcmUlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D",
    primary_text: "Glow Theory Skincare",
    secondary_text: "Ikeja, Lagos State",
    category: "Skin Care",
    address: "Ikeja, Lagos",
    description:
      "Advanced skincare clinic with exfoliation peels, acne therapy, deep pore cleansing and personalized skin diagnostics.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=60",
    primary_text: "Braids by Tara",
    secondary_text: "Surulere, Lagos",
    category: "Hair Styling",
    address: "Surulere, Lagos",
    description:
      "Specializing in knotless braids, Ghana weaving, tribal braids, bohemian braids and protective haircare.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFpbCUyMHNhbG9ufGVufDB8fDB8fHww",
    primary_text: "Elite Nail Atelier",
    secondary_text: "Port Harcourt, Rivers",
    category: "Nails",
    address: "Port Harcourt",
    description:
      "Luxury nail artistry offering gel design, acrylic sculpting, chrome nails, cuticle treatment and hand spa.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?w=600&auto=format&fit=crop&q=60",
    primary_text: "Luxe Lash Bar",
    secondary_text: "Abuja, FCT",
    category: "Make up",
    address: "Wuse 2, Abuja",
    description:
      "Specialists in lash extension, lash lifting, brow sculpting, brow micro-shading and hybrid lash-care.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&auto=format&fit=crop&q=60",
    primary_text: "Zen Massage Clinic",
    secondary_text: "Abeokuta, Ogun State",
    category: "Wellness",
    address: "Abeokuta, Ogun",
    description:
      "Therapeutic massage experts offering Swedish massage, deep tissue relief, reflexology and body relaxation experience.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&auto=format&fit=crop&q=60",
    primary_text: "The Barber Lounge",
    secondary_text: "Benin City, Edo",
    category: "Barber",
    address: "Benin City",
    description:
      "Top-tier barbers offering hair-detailing, straight-razor lining, beard tinting and aesthetic grooming service.",
  },
];
