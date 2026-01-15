/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BookingModal } from "@/components/localComponents/bookingModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

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
          className=" relative bg-transparent border-none shadow-none min-h-[48px] flex items-center text-muted-foreground text-xl md:text-3xl font-bold transition-all duration-200 data-[state=active]:text-black data-[state=active]:text-2xl data-[state=active]:md:text-4xl focus:outline-none "
        >
          Services
        </TabsTrigger>

        <TabsTrigger
          value="profile"
          className=" relative bg-transparent border-none shadow-none min-h-[48px] flex items-center text-muted-foreground text-xl md:text-3xl font-bold transition-all duration-200 data-[state=active]:text-black data-[state=active]:text-2xl data-[state=active]:md:text-4xl focus:outline-none "
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
                    <p className="text-lg md:text-xl font-semibold">
                      {item.service}
                    </p>

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
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 min-w-[140px]">
                          <p className="text-lg font-semibold">
                            {service.price === 0 ? "Free" : `$${service.price}`}
                          </p>
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
        price: 0,
        time: 900,
      },
      {
        title: "Full Glam Makeup",
        description:
          "Professional event makeup including contouring, lashes and long-lasting finish.",
        price: 150,
        time: 5400,
      },
      {
        title: "Natural Day Makeup",
        description:
          "Light and subtle makeup for casual outings or professional settings.",
        price: 65,
        time: 3600,
      },
      {
        title: "Bridal Luxury Package",
        description:
          "Trial session, wedding-day glam, touch-ups and optional travel service.",
        price: 300,
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
        time: 5400,
      },
      {
        title: "Deep Hair Treatment",
        description:
          "Keratin-rich treatment to repair damage and restore hydration.",
        price: 55,
        time: 2700,
      },
      {
        title: "Full Hair Color",
        description:
          "Professional coloring with toner and finishing treatment.",
        price: 120,
        time: 7200,
      },
      {
        title: "Loc Maintenance",
        description:
          "Root retwisting, cleaning and shaping for healthy dreadlocks.",
        price: 95,
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
        time: 5400,
      },
      {
        title: "Steam Facial",
        description:
          "Deep cleansing facial with exfoliation, steam extraction and serum.",
        price: 70,
        time: 3600,
      },
      {
        title: "Hot Stone Therapy",
        description:
          "Heated stone massage to relieve muscle tension and improve circulation.",
        price: 140,
        time: 7200,
      },
      {
        title: "Foot Reflexology",
        description:
          "Targeted pressure therapy to stimulate relaxation and balance.",
        price: 60,
        time: 2700,
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
