import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const media = [
  {
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNraW5jYXJlfGVufDB8fDB8fHww",
    primary_text: "",
    secondary_text: "",
    button_text: "",
  },
  {
    image: "",
    primary_text: "",
    secondary_text: "",
    button_text: "",
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

export function HomeCard1() {
  return (
    <div className={`md:p-5 py-10 flex flex-col md:flex-row gap-8 `}>
      <div className="flex flex-col gap-5 md:w-1/2">
        <h3 className=" text-xl md:text-3xl font-bold">
          Discover and Book Beauty and Wellness Professionals Near You!
        </h3>
        <img
          src={
            "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmVhdXR5JTIwc2Fsb258ZW58MHx8MHx8fDA%3D"
          }
          alt="image"
          className="object-cover w-full md:h-[500px] rounded-3xl "
        />
      </div>
      <div className="md:w-1/2 space-y-5">
        <img
          src={
            "https://images.unsplash.com/photo-1477332552946-cfb384aeaf1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2VsbG5lc3N8ZW58MHx8MHx8fDA%3D"
          }
          alt="image"
          className="object-cover w-full md:h-[400px] rounded-3xl"
        />
        <p className="md:text-lg font-medium">
          Easily find and book appointments with top-rated beauty and wellness
          experts in your area. Browse profiles, read reviews, and book
          appointments effortlessly to enhance your self-care routine!
        </p>
        <Button className="bg-secondary-c w-fit">Book Your Appointment</Button>
      </div>
    </div>
  );
}
export function HomeCard2() {
  return (
    <div className="md:px-5 py-10 flex flex-col md:flex-row items-center gap-8 w-full">
      <div className="flex flex-col gap-5 md:w-1/3">
        <h3 className=" text-3xl md:text-4xl font-bold">
          Shop Top Beauty And Wellness Products
        </h3>
        <p className="md:text-2xl font-light">
          No.1 marketplace for all stylist products in Nigeria.
        </p>
        <Button className="bg-secondary-c w-fit">Shop Stylist Products</Button>
      </div>
      <div className="w-full md:w-2/3 flex flex-wrap justify-center gap-2">
        <img
          src={
            "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNraW5jYXJlfGVufDB8fDB8fHww"
          }
          alt="image"
          className="object-cover w-[60%] h-[150px] md:h-[300px] rounded-3xl "
        />
        <img
          src={
            "https://images.unsplash.com/photo-1598528738936-c50861cc75a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D"
          }
          alt="image"
          className="object-cover w-[30%] h-[150px] md:h-[300px] rounded-3xl col-span-1"
        />
        <img
          src={
            "https://plus.unsplash.com/premium_photo-1673628167571-532a6c5f5d16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D"
          }
          alt="image"
          className="object-cover w-[30%] h-[150px] md:h-[300px] rounded-3xl "
        />
        <img
          src={
            "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJlYXV0eSUyMHByb2R1Y3RzfGVufDB8fDB8fHww"
          }
          alt="image"
          className="object-cover w-[60%] h-[150px] md:h-[300px] rounded-3xl "
        />
      </div>
    </div>
  );
}
export function HomeCard3() {
  return (
    <div className={`px-5 py-10 flex flex-col gap-4 max-w-screen`}>
      <div className="flex flex-col gap-5 justify-center text-center">
        <h3 className="text-xl md:text-3xl font-bold">
          Book Trusted Beauty & Wellness Experts in Your Area
        </h3>
        <p className="text-sm md:text-lg font-medium">
          Find professionals backed by genuine client testimonials, real
          portfolio photos, and proven results. Booking your next appointment
          has never felt more confident or effortless.
        </p>
      </div>
      <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={clientTestimonials}
          direction="right"
          speed="slow"
        />
      </div>
      <div className=" rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
          items={providerTestimonials}
          direction="left"
          speed="slow"
        />
      </div>
    </div>
  );
}

const providerTestimonials = [
  {
    quote:
      "My clients doubled after joining this platform. The booking system makes my work smoother and more professional.",
    name: "Darren Cole",
    profession: "Men’s Barber",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "I’ve been discovered by multiple new clients thanks to the marketplace exposure. Amazing experience!",
    name: "Emily Stone",
    profession: "Hair Stylist",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=600&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "This site makes it easy to showcase my portfolio and attract customers interested in creative cuts.",
    name: "Leo Martins",
    profession: "Fade Specialist",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "I love how easy it is for clients to view my work, pricing, and availability in one place.",
    name: "Aisha Blake",
    profession: "Braids Artist",
    image: "/profiles/stylist4.jpg",
  },
  {
    quote:
      "A perfect platform for freelancers in the beauty industry. My revenue has noticeably increased!",
    name: "Rafael Cohen",
    profession: "Beard & Grooming Expert",
    image:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=600&auto=format&fit=crop&q=60",
  },
];

const clientTestimonials = [
  {
    quote:
      "I finally found a stylist who understands my hair type — best experience ever!",
    name: "Sophia Turner",
    profession: "Verified Client",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "Booking an appointment was incredibly easy. I could browse styles and compare prices instantly.",
    name: "Marcus Lee",
    profession: "Repeat Customer",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "I discovered my favorite braids artist here — I’m not going anywhere else!",
    name: "Nadia Hassan",
    profession: "Platform User",
    image:
      "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=600&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "Being able to read real reviews made me feel confident in choosing the right barber.",
    name: "James Carter",
    profession: "Client",
    image:
      "https://images.unsplash.com/photo-1614284692214-0e99ac4bcfa8?w=600&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "The entire experience feels premium. Great customer support and seamless booking.",
    name: "Daniela Rossi",
    profession: "Super Satisfied Customer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60",
  },
];
