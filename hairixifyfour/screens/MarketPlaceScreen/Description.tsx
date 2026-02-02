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
      <section className="space-y-6 rounded-2xl border p-5">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900">
          Product Information
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {productDetails.map((item) => (
            <div
              key={item.label}
              className="space-y-1 rounded-lg border border-gray-200 px-4 py-3"
            >
              {/* Label */}
              <p className="text-xs uppercase tracking-wide text-gray-500">
                {item.label}
              </p>

              {/* Value */}
              <p className="text-sm font-medium text-gray-900">{item.value}</p>
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
    </div>
  );
}
