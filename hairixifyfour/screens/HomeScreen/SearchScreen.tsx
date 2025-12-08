import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SearchScreen() {
  return (
    <div className="md:w-[80%] w-full py-14 px-4 mx-auto">
      <h2 className="text-center text-3xl font-extrabold mb-10">
        Explore Available Stylists & Beauty Services by City
      </h2>

      <Tabs defaultValue="Service">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-c/10 to-transparent border border-primary-c/30 space-y-10">
          <TabsList className="bg-transparent p-1 rounded-xl flex gap-2">
            {/* Service Providers Tab */}
            <TabsTrigger
              value="Service"
              className={`
                data-[state=active]:bg-secondary-c
                data-[state=active]:text-tertiary-c
                bg-transparent text-secondary-c
                rounded-sm md:px-6 md:py-5
                md:text-lg
                data-[state=active]:border-secondary-c
                transition
              `}
            >
              Service Providers
            </TabsTrigger>

            {/* Beauty Products Tab */}
            <TabsTrigger
              value="Beauty"
              className={`
                data-[state=active]:bg-secondary-c
                data-[state=active]:text-tertiary-c
                bg-transparent text-secondary-c
                rounded-sm md:px-6 md:py-5
                md:text-lg
                data-[state=active]:border-secondary-c
                transition
              `}
            >
              Beauty Products
            </TabsTrigger>
          </TabsList>

          {/* Location Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {locationData.map((data, idx) => (
              <button
                key={idx}
                className="bg-white border md:p-2 p-1 rounded-lg hover:border-primary-c hover:text-primary-c text-sm md:text-md transition text-start"
              >
                {data}
              </button>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  );
}

const locationData = [
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
];
