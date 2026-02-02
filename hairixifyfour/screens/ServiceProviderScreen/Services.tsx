/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BookingModal } from "@/components/localComponents/bookingModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Tabs, TabsList } from "@radix-ui/react-tabs";

import { useState } from "react";
import { motion } from "motion/react";

export default function Services() {
  return (
    <Tabs
      defaultValue="services"
      className="bg-white px-5 md:px-[68px] py-12 space-y-12"
    >
      {/* HEADER */}
      <TabsList className="bg-transparent flex gap-8 border-b border-border pb-4">
        <TabsTrigger
          value="services"
          className="relative bg-transparent border-none shadow-none min-h-[48px] flex items-center
    text-muted-foreground text-xl md:text-[1.5rem] font-bold
    transition-all duration-200
    data-[state=active]:text-black
    data-[state=active]:md:text-[1.75rem]
    focus:outline-none"
        >
          Services
        </TabsTrigger>

        <TabsTrigger
          value="profile"
          className="relative bg-transparent border-none shadow-none min-h-[48px] flex items-center
    text-muted-foreground text-xl md:text-[1.5rem] font-bold
    transition-all duration-200
    data-[state=active]:text-black
    data-[state=active]:md:text-[1.75rem]
    focus:outline-none"
        >
          Profile Info
        </TabsTrigger>
      </TabsList>

      {/* CONTENT */}
      <TabsContent
        value="services"
        className="focus:outline-none animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
      >
        <Service />
      </TabsContent>

      <TabsContent
        value="profile"
        className="max-w-3xl focus:outline-none animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
      >
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          For any kind of make up — Owanbe, video/photoshoot, traditional,
          registry/court — we’ve got you covered.
        </p>
      </TabsContent>
    </Tabs>
  );
}

/* ------------------ TABS ------------------ */
function Service() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="space-y-6">
        {ServicesData.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-card shadow-sm"
          >
            <Accordion
              type="multiple"
              defaultValue={["item-0", "item-1", "item-2", "item-3"]}
            >
              <AccordionItem value={`item-${index}`} className="border-none">
                <AccordionTrigger className="p-4 hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-2 items-center">
                      <p className="text-lg md:text-xl font-bold text-[#4a996f]">
                        {item.service}
                      </p>
                      <div className="h-[2px] w-full bg-[#4a996f7e]" />
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {item.services.length} services
                      </span>
                      {/* <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" /> */}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-4">
                  <div className="divide-y divide-border">
                    {item.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                      >
                        {/* LEFT */}
                        <div className="space-y-2 md:max-w-[65%]">
                          <p className="text-lg font-medium">{service.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                          {service.portfolio_pictures && (
                            <div className="flex gap-2 ">
                              {service.portfolio_pictures.map((item, index) => (
                                <motion.img
                                  key={index}
                                  src={item}
                                  alt=""
                                  className=" h-[40px] w-[40px] rounded-md object-cover cursor-pointer "
                                />
                              ))}
                            </div>
                          )}
                          {service.discount && (
                            <Badge className="text-[#004737] bg-[#12ab594a]">
                              Save up to {service.discount}%
                            </Badge>
                          )}
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 min-w-[140px]">
                          <div className="flex gap-2">
                            {/* Original price */}
                            <p
                              className={` ${service.discountedPrice ? "line-through text-muted-foreground text-lg" : "text-lg font-semibold"}`}
                            >
                              {service.price === 0
                                ? "Free"
                                : `$${service.price}`}
                            </p>

                            {/* Discounted price (only show if it exists) */}
                            {service.discountedPrice !== undefined && (
                              <p className="text-lg font-semibold">
                                {service.discountedPrice === 0
                                  ? "Free"
                                  : `$${service.discountedPrice}`}
                              </p>
                            )}
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {formatTime(service.time)}
                          </p>

                          <DialogTrigger asChild>
                            <Button
                              className="mt-2 w-fit md:w-auto bg-secondary-c"
                              onClick={() => {
                                setSelectedService(service);
                                setOpen(true);
                              }}
                            >
                              Book now
                            </Button>
                          </DialogTrigger>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>

      {selectedService && (
        <BookingModal {...selectedService} closeModal={() => setOpen(false)} />
      )}
    </Dialog>
  );
}

/* ------------------ DATA ------------------ */

const ServicesData = [
  {
    service: "Makeup & Beauty",
    services: [
      {
        title: "Virtual Skin Analysis",
        description:
          "A live 15-minute consultation to evaluate your skin type and recommend suitable products.",
        price: 150,
        discount: 20,
        discountedPrice: 120,
        time: 900,
        portfolio_pictures: [
          "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyYmVyfGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVyfGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
        ],
      },
      {
        title: "Full Glam Makeup",
        description:
          "Professional event makeup including contouring, lashes and long-lasting finish.",
        price: 150,
        discount: 15,
        discountedPrice: 128,
        time: 5400,
      },
      {
        title: "Natural Day Makeup",
        description:
          "Light and subtle makeup for casual outings or professional settings.",
        price: 65,
        time: 3600,
        portfolio_pictures: [
          "https://plus.unsplash.com/premium_photo-1661542350224-8e3f095ce053?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFyYmVyfGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
        ],
      },
      {
        title: "Bridal Luxury Package",
        description:
          "Trial session, wedding-day glam, touch-ups and optional travel service.",
        price: 300,
        discount: 25,
        discountedPrice: 225,
        time: 14400,
      },
    ],
  },
  {
    service: "Hair Styling",
    services: [
      {
        title: "Haircut & Styling",
        description:
          "Customized haircut with blow-dry styling and aftercare advice.",
        price: 80,
        discount: 10,
        discountedPrice: 72,
        time: 5400,
        portfolio_pictures: [
          "https://plus.unsplash.com/premium_photo-1661645818605-61e1ef1f14e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVyfGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1532710093739-9470acff878f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
        ],
      },
      {
        title: "Deep Hair Treatment",
        description:
          "Keratin-rich treatment to repair damage and restore hydration.",
        price: 55,
        time: 2700,
        portfolio_pictures: [
          "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyYmVyfGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1657105052497-f996284ffff8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
        ],
      },
      {
        title: "Full Hair Color",
        description:
          "Professional coloring with toner and finishing treatment.",
        price: 120,
        discount: 20,
        discountedPrice: 96,
        time: 7200,
        portfolio_pictures: [
          "https://plus.unsplash.com/premium_photo-1661493935776-a76a3e33dddf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1582893561942-d61adcb2e534?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
        ],
      },
      {
        title: "Loc Maintenance",
        description:
          "Root retwisting, cleaning and shaping for healthy dreadlocks.",
        price: 95,
        discount: 15,
        discountedPrice: 81,
        time: 6000,
      },
    ],
  },
  {
    service: "Spa & Wellness",
    services: [
      {
        title: "Aromatherapy Massage",
        description:
          "Relaxing full-body massage using customized essential oils.",
        price: 110,
        discount: 20,
        discountedPrice: 88,
        time: 5400,
      },
      {
        title: "Steam Facial",
        description:
          "Deep cleansing facial with exfoliation, steam extraction and serum.",
        price: 70,
        time: 3600,
        portfolio_pictures: [
          "https://plus.unsplash.com/premium_photo-1663036980825-1fea23dfdf2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
          "https://plus.unsplash.com/premium_photo-1677444491957-ab1e8b9a80fd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1593702295094-aea22597af65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
        ],
      },
      {
        title: "Hot Stone Therapy",
        description:
          "Heated stone massage to relieve muscle tension and improve circulation.",
        price: 140,
        discount: 30,
        discountedPrice: 98,
        time: 7200,
        portfolio_pictures: [
          "https://plus.unsplash.com/premium_photo-1661270415179-f7bcff006edb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVyfGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
        ],
      },
      {
        title: "Foot Reflexology",
        description:
          "Targeted pressure therapy to stimulate relaxation and balance.",
        price: 60,
        discount: 10,
        discountedPrice: 54,
        time: 2700,
        portfolio_pictures: [
          "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyYmVyfGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyYmVyfGVufDB8fDB8fHww",
          "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
        ],
      },
    ],
  },
];

/* ------------------ UTILS ------------------ */

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours && minutes) return `${hours}h ${minutes}mins`;
  if (hours) return `${hours}h`;
  return `${minutes}mins`;
}
