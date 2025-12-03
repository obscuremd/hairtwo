import { Calendar, Heart, Tag } from "lucide-react";

export default function Article() {
  return (
    <div className="w-full py-10 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-primary-c mb-5">
        Articles and News
      </h2>
      <h3 className="text-center text-xl md:text-2xl font-semibold mb-4">
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
    <div className="flex flex-col gap-8 rounded-3xl p-4 w-[350px] shrink-0">
      <img
        src={image}
        alt="image"
        className="object-cover h-[250px] w-full rounded-3xl"
      />

      <h3 className="h-[2em] text-xl font-semibold ">{title}</h3>

      <p className="h-[3em] text-sm leading-relaxed">{description}</p>

      <div className="w-full flex justify-between items-center text-sm text-secondary-cs">
        <div className="flex gap-1 text-nowrap items-center text-primary-c">
          <Tag className="w-4 h-4" />
          <p className="w-[7em] truncate">{category}</p>
        </div>
        <div className="flex gap-1 text-nowrap items-center">
          <Calendar className="w-4 h-4" />
          <p>{date}</p>
        </div>
        <div className="flex gap-1 text-nowrap items-center">
          <Heart className="w-4 h-4" />
          <p>{likes} Likes</p>
        </div>
      </div>
    </div>
  );
}

export const articleData = [
  {
    image:
      "https://images.unsplash.com/photo-1629397685944-7073f5589754?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D",
    title: "Discover Everything Hairxify Does",
    description:
      "Hairxify is revolutionising the beauty and wellness industry by connecting clients with top professionals...",
    category: "Beauty and style",
    date: "20/11/2024",
    likes: 24,
  },
  {
    image:
      "https://images.unsplash.com/photo-1607008829749-c0f284a49fc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D",
    title: "5 Daily Beauty Habits That Transform Your Skin",
    description:
      "A simple guide highlighting everyday routines—hydration, sunscreen, and good nutrition improve skin health...",
    category: "Beauty and style",
    date: "20/11/2024",
    likes: 24,
  },
  {
    image:
      "https://images.unsplash.com/photo-1626379501846-0df4067b8bb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D",
    title: "Why Self-Care Is Not a Luxury",
    description:
      "Explore science-backed wellness habits like meditation, massage, aromatherapy and more...",
    category: "Beauty and wellness",
    date: "20/11/2024",
    likes: 24,
  },
  {
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFpciUyMHNhbG9ufGVufDB8fDB8fHww",
    title: "Why Self-Care Is Not a Luxury",
    description:
      "Explore science-backed wellness habits like meditation, massage, aromatherapy and more...",
    category: "Beauty and wellness",
    date: "20/11/2024",
    likes: 24,
  },
];
