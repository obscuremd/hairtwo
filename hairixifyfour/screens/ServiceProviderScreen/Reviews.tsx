/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Star, StarSolid } from "iconoir-react";
import Image from "next/image";

export default function Reviews() {
  return (
    <div className="p-5 md:p-[68px]">
      <div className="space-y-10">
        <div className="flex flex-col gap-5 md:flex-row justify-between">
          <div>
            <p className=" text-xl md:text-[1.5rem] font-bold ">
              Reviews (436)
            </p>

            <div className="flex items-center gap-2">
              <div className="text-primary-c flex gap-1">
                <StarSolid className="w-4 h-4" />
                <StarSolid className="w-4 h-4" />
                <StarSolid className="w-4 h-4" />
                <StarSolid className="w-4 h-4" />
                <Star className="w-4 h-4" />
              </div>
              <p className="text-md font-bold">4.95 / 5</p>
              <p className="text-sm font-medium">(1,238 Reviews)</p>
            </div>
          </div>
          <p className="text-md font-semibold text-primary-c">Write a Review</p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 flex flex-col md:flex-row gap-6 md:gap-10">
          {/* LEFT: Rating Summary */}
          <div className="flex flex-col items-start justify-center gap-2 min-w-[140px]">
            <p className="text-[3rem] font-bold leading-none">4.95</p>

            <div className="flex items-center gap-1 text-primary-c">
              <StarSolid className="w-4 h-4" />
              <StarSolid className="w-4 h-4" />
              <StarSolid className="w-4 h-4" />
              <StarSolid className="w-4 h-4" />

              <Star className="w-4 h-4" />
            </div>

            <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              Based on 1,238 reviews
            </p>
          </div>

          {/* RIGHT: Rating Breakdown */}
          <div className="flex flex-col gap-3 w-full">
            {[
              { star: 5, value: 87 },
              { star: 4, value: 36 },
              { star: 3, value: 23 },
              { star: 2, value: 12 },
              { star: 1, value: 40 },
            ].map((item) => (
              <div
                key={item.star}
                className="flex items-center gap-3 text-sm font-medium"
              >
                {/* Star label */}
                <span className="w-4 text-muted-foreground">{item.star}</span>

                {/* Progress */}
                <Progress value={item.value} className="h-2" />

                {/* Percentage */}
                {/* <span className="w-10 text-right text-muted-foreground">
                  {item.value}%
                </span> */}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {reviews.map((item, index) => (
            <ReviewCard key={index} review={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: any }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="relative w-[40px] h-[40px]">
          <Image
            src={review.image}
            alt={review.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <p className="font-bold leading-tight">{review.name}</p>
          {/* Stars */}
          <div className="flex gap-1 text-primary-c text-xs">
            {Array.from({ length: 5 }).map((_, i) =>
              i < review.rating ? (
                <StarSolid key={i} className="w-4 h-4" />
              ) : (
                <Star key={i} className="w-4 h-4" />
              )
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground whitespace-nowrap">
          {review.date}
        </p>
      </div>

      {/* Review Text */}
      <p className="text-sm text-muted-foreground leading-relaxed md:w-[50%]">
        {review.review}
      </p>
    </div>
  );
}

const reviews = [
  {
    name: "Sophia Turner",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60",
    rating: 5,
    date: "Mar 12, 2024",
    review:
      "I finally found a stylist who understands my hair type — best experience ever!. I discovered my favorite braids artist here — I’m not going anywhere else!",
  },
  {
    name: "Marcus Lee",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
    rating: 4,
    date: "Feb 28, 2024",
    review:
      "Booking an appointment was incredibly easy. Browsing styles and pricing saved me so much time. I finally found a stylist who understands my hair type — best experience ever!",
  },
  {
    name: "Nadia Hassan",
    image:
      "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=600&auto=format&fit=crop&q=60",
    rating: 5,
    date: "Jan 19, 2024",
    review:
      "I discovered my favorite braids artist here — I’m not going anywhere else!",
  },
  {
    name: "James Carter",
    image:
      "https://images.unsplash.com/photo-1614284692214-0e99ac4bcfa8?w=600&auto=format&fit=crop&q=60",
    rating: 4,
    date: "Jan 3, 2024",
    review:
      "Reading real customer reviews helped me confidently choose the right barber.",
  },
  {
    name: "Daniela Rossi",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60",
    rating: 5,
    date: "Dec 21, 2023",
    review:
      "Everything feels premium — from booking to the final service. Highly recommended.",
  },
  {
    name: "Aisha Bello",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60",
    rating: 5,
    date: "Dec 9, 2023",
    review:
      "Professional, friendly, and very skilled. I left feeling confident and satisfied. I discovered my favorite braids artist here — I’m not going anywhere else!",
  },
  {
    name: "Kelvin Omoregie",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60",
    rating: 4,
    date: "Nov 25, 2023",
    review:
      "Great service and clean environment. I’ll definitely be booking again.",
  },
  {
    name: "Linda Chen",
    image:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?w=600&auto=format&fit=crop&q=60",
    rating: 5,
    date: "Nov 10, 2023",
    review:
      "The attention to detail was impressive. My expectations were exceeded.",
  },
  {
    name: "Samuel Johnson",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60",
    rating: 4,
    date: "Oct 18, 2023",
    review:
      "Smooth booking experience and excellent customer service throughout.",
  },
  {
    name: "Fatima Al-Khalid",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=60",
    rating: 5,
    date: "Oct 2, 2023",
    review:
      "I felt listened to and taken care of. Truly a standout experience.",
  },
];
