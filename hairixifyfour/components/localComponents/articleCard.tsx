import { Calendar, Heart } from "iconoir-react";
import { Tag } from "lucide-react";

export function ArticleCard({
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
    <div
      className="
      flex flex-col gap-4 rounded-xl p-3 bg-white border shadow-sm
      hover:shadow-md transition cursor-pointer shrink-0
      w-[250px] md:w-[350px]
    "
    >
      <img
        src={image}
        alt="image"
        className="object-cover h-[160px] md:h-[220px] w-full rounded-lg"
      />

      <div className="flex flex-col gap-1">
        <h3 className="text-base md:text-[1.15rem] font-bold line-clamp-2">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="w-full flex justify-between items-center text-[10px] md:text-xs text-gray-500">
        <div className="flex gap-1 items-center">
          <Tag className="w-3 h-3 md:w-4 md:h-4 text-primary-c" />
          <p className="max-w-[6em] truncate text-primary-c">{category}</p>
        </div>
        <div className="flex gap-1 items-center">
          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
          <p>{date}</p>
        </div>
        <div className="flex gap-1 items-center">
          <Heart className="w-3 h-3 md:w-4 md:h-4" />
          <p>{likes}</p>
        </div>
      </div>
    </div>
  );
}
