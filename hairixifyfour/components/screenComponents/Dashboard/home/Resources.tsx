import { Play, ArrowRight, BookOpen, Video, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    id: 1,
    type: "video",
    title: "Getting Started with Our Platform",
    description:
      "Learn the fundamentals and set up your account in less than 10 minutes with our comprehensive video guide.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    duration: "8 min",
    imagePosition: "left" as const,
  },
  {
    id: 2,
    type: "article",
    title: "Best Practices for Inventory Management",
    description:
      "Discover proven strategies to optimize your inventory levels, reduce costs, and improve customer satisfaction.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    readTime: "5 min read",
    imagePosition: "right" as const,
  },
  {
    id: 3,
    type: "video",
    title: "Advanced Reporting Features",
    description:
      "Unlock the full potential of analytics with custom reports, data visualization, and automated insights.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    duration: "12 min",
    imagePosition: "left" as const,
  },
  {
    id: 4,
    type: "guide",
    title: "Complete Integration Guide",
    description:
      "Step-by-step instructions for connecting your existing tools and automating workflows across platforms.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    readTime: "10 min read",
    imagePosition: "right" as const,
  },
  {
    id: 5,
    type: "video",
    title: "Team Collaboration Masterclass",
    description:
      "Master team management features, permission settings, and collaborative workflows for maximum productivity.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    duration: "15 min",
    imagePosition: "left" as const,
  },
];

export default function Resources() {
  return (
    <div className="">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#003225] mb-1">
            Help & Resources
          </h1>
          <p className="text-xs text-gray-500">
            Everything you need to get the most out of our platform
          </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-4 h-[70vh] overflow-y-scroll">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  resource,
}: {
  resource: {
    id: number;
    type: string;
    title: string;
    description: string;
    image: string;
    duration?: string;
    readTime?: string;
    imagePosition: "left" | "right";
  };
}) {
  const isVideo = resource.type === "video";

  const typeConfig = {
    video: {
      icon: Video,
      color: "text-white",
      bg: "bg-[#3ad688]",
      label: "Video",
    },
    article: {
      icon: FileText,
      color: "text-white",
      bg: "bg-[#003225]",
      label: "Article",
    },
    guide: {
      icon: BookOpen,
      color: "text-white",
      bg: "bg-[#3ad688]",
      label: "Guide",
    },
  };

  const config =
    typeConfig[resource.type as keyof typeof typeConfig] || typeConfig.article;
  const TypeIcon = config.icon;

  return (
    <div className="bg-white border border-[#e6e3d6] rounded-lg overflow-hidden hover:border-[#3ad688]/50 transition-all hover:shadow-sm cursor-pointer group max-w-3xl mx-auto">
      <div className="flex gap-0">
        {/* Image/Video Section */}
        <div className="relative w-32 md:w-40 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#003225]/30 to-transparent z-10" />
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover aspect-[4/3]"
          />

          {/* Type Tag - Top Left */}
          <div className="absolute top-2 left-2 z-30">
            <div
              className={`${config.bg} ${config.color} px-2 py-1 rounded-md shadow-sm flex items-center gap-1`}
            >
              <TypeIcon className="w-3 h-3" strokeWidth={2} />
              <span className="text-xs font-medium">{config.label}</span>
            </div>
          </div>

          {/* Video Play Button Overlay */}
          {isVideo && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="bg-white rounded-full p-2 shadow-md group-hover:scale-110 transition-transform duration-300">
                <Play className="w-4 h-4 text-[#3ad688] fill-[#3ad688]" />
              </div>
            </div>
          )}

          {/* Duration/Read Time - Bottom Right */}
          {(resource.duration || resource.readTime) && (
            <div className="absolute bottom-2 right-2 z-30">
              <div className="bg-[#003225]/80 backdrop-blur-sm text-white px-2 py-0.5 rounded-md text-xs font-medium">
                {resource.duration || resource.readTime}
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-[#003225] leading-tight line-clamp-1 mb-1">
              {resource.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {resource.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-[#3ad688] hover:bg-[#32c279] text-[#003225] font-medium border-0 h-7 text-xs px-3"
            >
              {isVideo ? (
                <>
                  <Play className="w-3 h-3 mr-1 fill-[#003225]" />
                  Watch
                </>
              ) : (
                <>
                  Read
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <button className="text-xs text-gray-500 hover:text-[#003225] transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
