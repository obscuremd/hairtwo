"use client";

import { motion } from "framer-motion";
import { Calendar, Heart, Tag } from "lucide-react";

export default function Article() {
  return (
    <div className="w-full py-10 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-primary-c mb-5">
        Articles and News
      </h2>
      <h3 className="text-center text-xl md:text-2xl font-semibold mb-8">
        Checkout Latest Articles And News From Our Blog
      </h3>
      <div className="flex w-full overflow-x-auto gap-6 py-4">
        {articleData.map((item, idx) => (
          <ArticleCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
}

function ArticleCard({
  image,
  title,
  description,
  category,
  date,
  likes,
}: {
  image: string;
  title: string;
  description: string;
  category: string;
  date: string;
  likes: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative w-[350px] md:w-[400px] lg:w-[450px] h-[450px] rounded-3xl overflow-hidden flex-shrink-0 cursor-pointer"
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent" />

      {/* Tag Badge top-left */}
      <div className="absolute top-4 left-4">
        <span className="bg-primary-c text-white text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Bottom-left content */}
      <div className="absolute bottom-4 left-4 text-white w-[90%]">
        <h3 className="text-xl md:text-2xl font-bold drop-shadow-md">
          {title}
        </h3>
        <p className="text-sm md:text-base mt-1 line-clamp-3 drop-shadow-md">
          {description}
        </p>

        {/* Small buttons for date and likes */}
        <div className="flex gap-3 mt-3">
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs">
            <Heart className="w-4 h-4" />
            <span>{likes} Likes</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const articleData = [
  {
    image:
      "https://images.unsplash.com/photo-1629397685944-7073f5589754?w=600&auto=format&fit=crop&q=60",
    title: "Discover Everything Hairxify Does",
    description:
      "Hairxify is revolutionising the beauty and wellness industry by connecting clients with top professionals...",
    category: "Beauty & Style",
    date: "20/11/2024",
    likes: 24,
  },
  {
    image:
      "https://images.unsplash.com/photo-1607008829749-c0f284a49fc4?w=600&auto=format&fit=crop&q=60",
    title: "5 Daily Beauty Habits That Transform Your Skin",
    description:
      "A simple guide highlighting everyday routines—hydration, sunscreen, and good nutrition improve skin health...",
    category: "Beauty & Style",
    date: "20/11/2024",
    likes: 24,
  },
  {
    image:
      "https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?w=600&auto=format&fit=crop&q=60",
    title: "Why Self-Care Is Not a Luxury",
    description:
      "Explore science-backed wellness habits like meditation, massage, aromatherapy and more...",
    category: "Beauty & Wellness",
    date: "20/11/2024",
    likes: 24,
  },
  {
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&auto=format&fit=crop&q=60",
    title: "The Best Hair Treatments This Season",
    description:
      "Learn about the top treatments that nourish, protect, and style your hair while enhancing natural beauty...",
    category: "Hair Care",
    date: "21/11/2024",
    likes: 30,
  },
];
