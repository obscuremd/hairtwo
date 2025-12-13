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
    <div className="min-h-screen items-center justify-center max-w-full relative">
      <Hero />
      <div className="absolute h-[190vh] md:h-screen w-screen md:w-[95vw] -z-50 bg-[#F3FAF4] bottom-[50%] md:bottom-[50%] md:left-[2%]" />
      <div className="w-full px-5 md:px-15 space-y-0 md:space-y-16 pt-6 md:pt-16">
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
