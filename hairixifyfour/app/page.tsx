import Article from "@/screens/HomeScreen/Articles";
import Hero from "@/screens/HomeScreen/Hero";
import HomeCard4, {
  HomeCard1,
  HomeCard2,
  HomeCard3,
} from "@/screens/HomeScreen/HomeCard";
import SearchScreen from "@/screens/HomeScreen/SearchScreen";
import { Recommended } from "@/screens/HomeScreen/Shops";

export default function Home() {
  return (
    <div className="min-h-screen max-w-full relative">
      <Hero />

      <div className="w-full px-5 md:px-[60px] pt-6 md:pt-16 space-y-16">
        <Recommended />
      </div>

      {/* Cards with background */}
      {/* background */}

      <div className="w-full px-5 md:px-[60px] space-y-16 -mb-[20%]">
        <HomeCard1 />
      </div>
      <HomeCard2 />

      <div className="w-full px-5 md:px-[60px] pt-6 md:pt-16 space-y-16">
        <HomeCard4 />
        <HomeCard3 />
        <SearchScreen />
        <Article />
      </div>
    </div>
  );
}
