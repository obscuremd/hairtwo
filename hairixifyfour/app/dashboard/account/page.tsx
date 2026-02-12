"use client";
import { useState } from "react";
import {
  Edit,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Star,
  Clock,
  Check,
  X,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// -------------------- Data Types --------------------
type Service = {
  id: number;
  name: string;
  price: string;
  duration: string;
};

type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
};

type Availability = {
  day: string;
  times: string[];
  available: boolean;
};

// -------------------- Sample Data --------------------
const profile = {
  name: "John Smith",
  profession: "Brand & Identity Designer",
  image:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
};

const businessInfo = {
  description:
    "Award-winning designer specializing in brand identity, logo design, and visual storytelling. With over 10 years of experience helping businesses create memorable brand experiences.",
  location: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  email: "john@designstudio.com",
  website: "www.johnsmithdesign.com",
  instagram: "@johnsmithdesign",
  facebook: "John Smith Design",
};

const gallery = [
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop",
];

const services: Service[] = [
  {
    id: 1,
    name: "Brand Identity Design",
    price: "$2,500",
    duration: "2-3 weeks",
  },
  { id: 2, name: "Logo Design", price: "$800", duration: "1 week" },
  {
    id: 3,
    name: "Visual Identity System",
    price: "$3,500",
    duration: "3-4 weeks",
  },
  { id: 4, name: "Brand Strategy Session", price: "$500", duration: "2 hours" },
  { id: 5, name: "Packaging Design", price: "$1,200", duration: "1-2 weeks" },
];

const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Exceptional work! John perfectly captured our brand vision and delivered beyond expectations.",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    date: "1 month ago",
    comment: "Professional, creative, and easy to work with. Highly recommend!",
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 4,
    date: "2 months ago",
    comment:
      "Great designer with excellent communication throughout the project.",
  },
];

const availability: Availability[] = [
  {
    day: "Monday",
    times: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
    available: true,
  },
  {
    day: "Tuesday",
    times: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
    available: true,
  },
  { day: "Wednesday", times: ["9:00 AM - 1:00 PM"], available: true },
  {
    day: "Thursday",
    times: ["9:00 AM - 12:00 PM", "2:00 PM - 5:00 PM"],
    available: true,
  },
  { day: "Friday", times: ["9:00 AM - 3:00 PM"], available: true },
  { day: "Saturday", times: [], available: false },
  { day: "Sunday", times: [], available: false },
];

// -------------------- Main Component --------------------
export default function Page() {
  const [activeTab, setActiveTab] = useState("business");

  return (
    <div className="mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <div className="flex size-12 items-center justify-center rounded-full border p-3">
          <User className="size-6 text-t-secondary" />
        </div>
        <p className="text-3xl font-semibold tracking-tight">Profile</p>
      </div>
      {/* Profile Header */}
      <div className="flex items-start gap-4 p-4 border-b border-gray-200 bg-white">
        <img
          src={profile.image}
          alt={profile.name}
          className="w-20 h-20 rounded-lg object-cover border border-gray-200"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-[#003225] mb-0.5">
            {profile.name}
          </h1>
          <p className="text-sm text-gray-600 mb-2">{profile.profession}</p>
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-4 h-4 text-[#3ad688] fill-[#3ad688]" />
            <span className="font-semibold text-[#003225]">4.8</span>
            <span className="text-gray-500">(127 reviews)</span>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-8 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Edit
        </Button>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1">
            {["business", "gallery", "services", "reviews", "availability"].map(
              (tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-xs py-2 data-[state=active]:bg-[#3ad688] data-[state=active]:text-[#003225]"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ),
            )}
          </TabsList>

          <TabsContent value="business" className="mt-4">
            <BusinessInfoSection info={businessInfo} />
          </TabsContent>
          <TabsContent value="gallery" className="mt-4">
            <GallerySection images={gallery} />
          </TabsContent>
          <TabsContent value="services" className="mt-4">
            <ServicesSection services={services} />
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <ReviewsSection reviews={reviews} />
          </TabsContent>
          <TabsContent value="availability" className="mt-4">
            <AvailabilitySection schedule={availability} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop: Show All Sections */}
      <div className="hidden lg:block space-y-4">
        <GallerySection images={gallery} />
        <BusinessInfoSection info={businessInfo} />
        <ServicesSection services={services} />
        <ReviewsSection reviews={reviews} />
        <AvailabilitySection schedule={availability} />
      </div>
    </div>
  );
}

// -------------------- Sections --------------------
function BusinessInfoSection({ info }: { info: typeof businessInfo }) {
  return (
    <div className="p-4 border-b-2 border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#003225]">Business Info</h2>
        <Button
          size="sm"
          variant="outline"
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-7 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Edit
        </Button>
      </div>
      <p className="text-sm text-gray-700">{info.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#3ad688]" /> {info.location}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#3ad688]" /> {info.phone}
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-[#3ad688]" /> {info.email}
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#3ad688]" /> {info.website}
        </div>
        <div className="flex items-center gap-2">
          <Instagram className="w-4 h-4 text-[#3ad688]" /> {info.instagram}
        </div>
        <div className="flex items-center gap-2">
          <Facebook className="w-4 h-4 text-[#3ad688]" /> {info.facebook}
        </div>
      </div>
    </div>
  );
}

function GallerySection({ images }: { images: string[] }) {
  return (
    <div className="p-4 border-b-2 border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#003225]">Gallery</h2>
        <Button
          size="sm"
          variant="outline"
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-7 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Edit
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-2">
        {/* Two main images, smaller height */}
        <div className="col-span-2 row-span-2 h-36 overflow-hidden rounded-sm">
          <img
            src={images[0]}
            alt="Gallery 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="col-span-2 row-span-2 h-36 overflow-hidden rounded-sm">
          <img
            src={images[1]}
            alt="Gallery 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {/* Four smaller images */}
          {images.slice(2, 6).map((img, idx) => (
            <div
              key={idx}
              className="col-span-1 h-20 overflow-hidden rounded-sm"
            >
              <img
                src={img}
                alt={`Gallery ${idx + 3}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServicesSection({ services }: { services: Service[] }) {
  return (
    <div className="p-4 border-b-2 border-gray-200 ">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#003225]">Service Menu</h2>
        <Button
          size="sm"
          variant="outline"
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-7 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Edit
        </Button>
      </div>
      <div className="space-y-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="border-l-2 border-l-[#3ad688] bg-gray-50 p-3 rounded-sm hover:bg-gray-100 transition-all"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="text-sm font-semibold text-[#003225]">
                  {service.name}
                </h3>
                <p className="text-xs text-gray-600 mt-1">{service.duration}</p>
              </div>
              <span className="font-semibold text-[#3ad688] text-sm">
                {service.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSection({ reviews }: { reviews: Review[] }) {
  return (
    <div className="p-4 border-b-2 border-gray-200 ">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#003225]">
          Ratings & Reviews
        </h2>
        <Button
          size="sm"
          variant="outline"
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-7 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Edit
        </Button>
      </div>
      <div className="space-y-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-l-2 border-l-[#3ad688] bg-gray-50 p-3 rounded-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-sm font-semibold text-[#003225]">
                  {review.name}
                </h4>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < review.rating ? "text-[#3ad688] fill-[#3ad688]" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-gray-500">{review.date}</span>
            </div>
            <p className="text-xs text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AvailabilitySection({ schedule }: { schedule: Availability[] }) {
  return (
    <div className="p-4 ">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#003225]">Availability</h2>
        <Button
          size="sm"
          variant="outline"
          className="border-[#003225] text-[#003225] hover:bg-[#003225] hover:text-white h-7 text-xs"
        >
          <Edit className="w-3 h-3 mr-1" /> Edit
        </Button>
      </div>
      <div className="space-y-2">
        {schedule.map((day) => (
          <div
            key={day.day}
            className={`border-l-2 ${day.available ? "border-l-[#3ad688]" : "border-l-gray-300"} bg-gray-50 p-3 rounded-sm`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-[#003225]">
                  {day.day}
                </h3>
                {day.available ? (
                  <Check className="w-3.5 h-3.5 text-[#3ad688]" />
                ) : (
                  <X className="w-3.5 h-3.5 text-gray-400" />
                )}
              </div>
            </div>
            {day.available ? (
              <div className="mt-1 space-y-0.5 text-xs text-gray-600">
                {day.times.map((time, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-0.5">Unavailable</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
