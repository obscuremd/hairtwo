import {
  Eye,
  Heart,
  Bookmark,
  Package,
  ShieldCheck,
  Tag,
  Layers,
} from "lucide-react";

const productDetails = [
  { label: "Brand", value: "Mide Luxury Hair" },
  { label: "Category", value: "Hair Care" },
  { label: "Sub-category", value: "Wigs & Hair Extensions" },
  { label: "Condition", value: "New" },
  { label: "Warranty", value: "1 month" },
  { label: "Material", value: "100% Human Hair" },
];

export default function Description() {
  return (
    <div className="space-y-4 p-5 md:pr-0 md:p-[68px]">
      {/* PRODUCT DETAILS */}
      <section className="bg-white rounded-2xl border p-5">
        <h2 className="text-2xl font-bold mb-3">Product Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-y-8 gap-x-16 text-sm">
          {productDetails.map((item) => (
            <div key={item.label} className="flex justify-between gap-4">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="bg-white rounded-2xl border p-5">
        <h2 className="text-2xl font-bold mb-3">Product Description</h2>

        <p className="text-sm text-muted-foreground leading-relaxed">
          This premium human hair wig is crafted for comfort, durability, and a
          natural look. Designed for everyday wear, it blends seamlessly and can
          be styled to suit any occasion. Whether you’re going for elegance or
          everyday confidence, this piece delivers exceptional quality and
          value.
        </p>
      </section>

      {/* ENGAGEMENT STATS */}
      <section className="bg-white rounded-2xl border p-5">
        <h2 className="text-2xl font-bold mb-3">Activity</h2>

        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>
              <strong className="text-gray-900">1,245</strong> views
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span>
              <strong className="text-gray-900">87</strong> likes
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            <span>
              <strong className="text-gray-900">34</strong> wishlists
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
