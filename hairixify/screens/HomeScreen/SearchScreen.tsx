export default function SearchScreen() {
  return (
    <div className="w-full py-10 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-primary-c mb-5">
        Find your Service Providers and Stylist items by State & City
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locationData.map((section, idx) => (
          <div key={idx} className="flex flex-col items-center w-full">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              {section.category}
            </h3>
            <div className="bg-accent p-6 rounded-xl w-full">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                {section.items.map((loc, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-2 text-lg text-primary hover:underline text-nowrap"
                  >
                    <span>›</span> {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const locationData = [
  {
    category: "Location by stylist service providers",
    items: [
      "Warri",
      "Yola North",
      "Wuduli",
      "Yola South",
      "Warri North",
      "Warri Central",
      "Umauhmi south",
      "Uruanu",
      "Ukwani",
      "Ukwa West",
      "Umu Nneochi",
      "Egbeda",
      "Sokoto",
      "Ukwu East",
      "Sango Ota",
      "Shomolu",
      "Iyana Ipaja",
    ],
  },
  {
    category: "Location by stylist Marketplace",
    items: [
      "Warri",
      "Yola North",
      "Wuduli",
      "Yola South",
      "Warri North",
      "Warri Central",
      "Umauhmi south",
      "Uruanu",
      "Ukwani",
      "Ukwa West",
      "Umu Nneochi",
      "Egbeda",
      "Sokoto",
      "Ukwu East",
      "Sango Ota",
      "Shomolu",
      "Iyana Ipaja",
    ],
  },
];
