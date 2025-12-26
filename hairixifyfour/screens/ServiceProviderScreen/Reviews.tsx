import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Input } from "@/components/ui/input";
import { Star, StarHalf } from "lucide-react";

export default function Reviews() {
  return (
    <div className="p-5 md:p-[68px]">
      <div className="space-y-2">
        <p className=" text-xl md:text-[2rem] font-bold ">Reviews (436)</p>
        <div className="flex items-center gap-5">
          <div className="text-primary-c flex gap-1">
            <Star className="w-4 h-4" />
            <Star className="w-4 h-4" />
            <Star className="w-4 h-4" />
            <Star className="w-4 h-4" />
            <Star className="w-4 h-4" />
          </div>
          <p className=" text-lg md:text-[1.5rem] font-bold">4.95 / 5</p>
        </div>
        <p className="md:text-lg font-medium">
          Hairixify guarantees that reviews with the &quot;Verified Hairixify
          user&quot; tag have been added by registered Hairixify users who have
          had an appointment with the provider.
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
