import Hero from "@/screens/ServiceProviderScreen/Hero";
import Reviews from "@/screens/ServiceProviderScreen/Reviews";
import Services from "@/screens/ServiceProviderScreen/Services";

export default function index() {
  return (
    <div className="space-y-12">
      <Hero />
      <div className="space-y-2">
        <p className="text-4xl font-semibold text-primary-c">About Us</p>
        <p className="text-lg font-medium ">
          For any kind of make up - Owanbe, video/photoshoot, traditional,
          registry/court - We got your covered.
        </p>
      </div>
      <Services />
      <Reviews />
    </div>
  );
}
