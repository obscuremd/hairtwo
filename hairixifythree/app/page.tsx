import Article from "@/screens/HomeScreen/Articles";
import Hero from "@/screens/HomeScreen/Hero";
import { HomeCard1, HomeCard2, HomeCard3 } from "@/screens/HomeScreen/HomeCard";
import SearchScreen from "@/screens/HomeScreen/SearchScreen";
import { Recommended, Trending } from "@/screens/HomeScreen/Shops";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center flex flex-col gap-16">
      <Hero />
      <Trending />
      <Recommended />
      <HomeCard1 />
      <HomeCard2 />
      <HomeCard3 />
      <SearchScreen />
      <Article />
    </div>
  );
}
