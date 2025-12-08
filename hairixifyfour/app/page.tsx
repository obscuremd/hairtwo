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
    <div className="min-h-screen items-center justify-center max-w-full">
      <Hero />
      <div className="w-full px-5 md:px-20 space-y-0 md:space-y-16 pt-6 md:pt-16">
        <Recommended />
        <HomeCard1 />
        <HomeCard2 />
        <HomeCard4 />
        <HomeCard3 />
        <SearchScreen />
        <Article />
      </div>
    </div>
  );
}
