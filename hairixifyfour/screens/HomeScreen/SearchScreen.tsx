import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SearchScreen() {
  return (
    <div className="w-full py-10 md:py-[68px] md:px-0 lg:px-[142px] mx-auto">
      <h2 className="text-center text-xl md:text-[2rem] font-bold mb-7">
        Explore Popular Stylists & Beauty Product by City
      </h2>

      <Tabs defaultValue="Service">
        <div className="md:p-10 p-5 rounded-2xl bg-linear-to-br from-primary-c/10 to-transparent border border-primary-c/30 space-y-10">
          <TabsList className="bg-transparent p-1 rounded-xl flex">
            {/* Service Providers Tab */}
            <TabsTrigger
              value="Service"
              className={`
                data-[state=active]:bg-[#017C3B]
                data-[state=active]:text-tertiary-c
                bg-transparent text-secondary-c
                rounded-sm px-4 py-5
                md:text-lg
                transition
              `}
            >
              Service Providers
            </TabsTrigger>

            {/* Beauty Products Tab */}
            <TabsTrigger
              value="Beauty"
              className={`
                data-[state=active]:bg-[#017C3B]
                data-[state=active]:text-tertiary-c
                bg-transparent text-secondary-c
                rounded-sm px-4 py-5
                md:text-lg
                transition
              `}
            >
              Beauty Products
            </TabsTrigger>
          </TabsList>

          {/* Location Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-7">
            {locationData.map((data, idx) => (
              <button
                key={idx}
                className="bg-white py-2 px-4 rounded-lg border-2 hover:border-primary-c hover:text-primary-c text-xs md:text-sm lg:text-md font-medium transition text-start"
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
  "Warri Central",
  "Warri Central",
  "Warri Central",
  "Warri Central",
  "Lagelu Ogbomosho North",
  "Lagelu Ogbomosho North",
  "Lagelu Ogbomosho North",
  "Lagelu Ogbomosho North",
  "Lagos Island",
  "Lagos Island",
  "Lagos Island",
  "Lagos Island",
  "Akoko South Akure East",
  "Akoko South Akure East",
  "Akoko South Akure East",
  "Akoko South Akure East",
  "Gwagwalada",
  "Gwagwalada",
  "Gwagwalada",
  "Gwagwalada",
];
