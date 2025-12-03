import Article from "@/screens/HomeScreen/Articles";
import Hero from "@/screens/HomeScreen/Hero";
import HomeCard from "@/screens/HomeScreen/HomeCard";
import SearchScreen from "@/screens/HomeScreen/SearchScreen";

export default function Home() {
  const media = [
    {
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNraW5jYXJlfGVufDB8fDB8fHww",
      primary_text:
        "Discover and Book Beauty and Wellness Professionals Near You!",
      secondary_text:
        "Easily find and book appointments with top-rated beauty and wellness experts in your area. Browse profiles, read reviews, and book appointments effortlessly to enhance your self-care routine!",
      button_text: "Book Your Appointment",
    },
    {
      image:
        "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNraW5jYXJlfGVufDB8fDB8fHww",
      primary_text: "Shop Top Beauty And Wellness Products",
      secondary_text: "No.1 marketplace for all stylist products in Nigeria.",
      button_text: "Shop Stylist Products",
    },
    {
      image:
        "https://images.unsplash.com/photo-1629397685944-7073f5589754?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D",
      primary_text: "Find Your Dream Beauty and Wellness Job!",
      secondary_text:
        "Explore exciting career opportunities in the beauty and wellness industry. Whether you're a stylist, therapist, or beauty expert, our platform connects you with top employers seeking talented professionals.",
      button_text: "Shop Stylist Products",
    },
  ];

  return (
    <div className="min-h-screen items-center justify-center flex flex-col gap-16">
      <Hero />
      <div className="flex flex-col gap-4">
        {media.map((item, index) => (
          <HomeCard
            key={index}
            image={item.image}
            primary_text={item.primary_text}
            secondary_text={item.secondary_text}
            button_text={item.button_text}
            reverse={index === 1}
          />
        ))}
      </div>
      <SearchScreen />
      <Article />
    </div>
  );
}
