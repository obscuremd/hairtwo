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
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Services() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <div className="p-5 md:p-[68px] flex flex-col gap-11">
      <p className="text-xl md:text-[2rem] font-bold">Services</p>

      <Dialog open={open} onOpenChange={setOpen}>
        {ServicesData.map((item, index) => (
          <Accordion key={index} type="single" collapsible className="w-full">
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger className="flex justify-between [&>svg]:hidden">
                <p className="text-lg md:text-[1.5rem] font-medium">
                  {item.service}
                </p>

                <Button
                  variant="secondary"
                  className="bg-secondary-c text-secondary font-medium text-md flex items-center gap-2"
                >
                  {item.services.length} Services
                  <ChevronDown
                    className="h-4 w-4 transition-transform duration-200 
                    data-[state=open]:rotate-180"
                  />
                </Button>
              </AccordionTrigger>

              <AccordionContent className=" pt-3.5 md:pt-[22.5px]">
                <div className="px-2 md:px-6">
                  {item.services.map((service, idx) => (
                    <div
                      key={idx}
                      className=" py-6 flex flex-col md:flex-row gap-2 justify-between items-center border-b border-b-[#93A3AA]"
                    >
                      <div className="space-y-2">
                        <p className="text-lg md:text-2xl font-medium">
                          {service.title}
                        </p>
                        <p className="md:w-[70%]">{service.description}</p>
                      </div>

                      <div className="flex flex-row md:flex-col justify-between md:justify-center items-end w-full">
                        <p>
                          {service.price === 0 ? "Free" : `$${service.price}`}
                        </p>
                        <p>{formatTime(service.time)}</p>

                        <DialogTrigger asChild>
                          <Button
                            onClick={() => {
                              setSelectedService(service);
                              setOpen(true);
                            }}
                          >
                            Book
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}

        {selectedService && (
          <BookingModal
            {...selectedService}
            closeModal={() => setOpen(false)}
          />
        )}
      </Dialog>
    </div>
  );
}

const ServicesData = [
  {
    service: "Makeup & Beauty",
    services: [
      {
        title: "Virtual Skin Analysis",
        description:
          "A live 15-min session to evaluate your skin type and suggest recommended products & treatments.",
        price: 0,
        time: 900, // 15 min
      },
      {
        title: "Full Glam Makeup",
        description:
          "Professional evening & event makeup including lashes, contouring, highlight & finish setting.",
        price: 150,
        time: 5400, // 1h 30min
      },
      {
        title: "Natural Day Makeup",
        description:
          "Light, fresh and subtle makeup for everyday casual & professional environments.",
        price: 65,
        time: 3600, // 1h
      },
      {
        title: "Bridal Luxury Package",
        description:
          "Includes makeup trial, wedding-day glam, touch-ups, and optional travel services.",
        price: 300,
        time: 14400, // 4h
      },
    ],
  },
  {
    service: "Hair Styling",
    services: [
      {
        title: "Haircut & Style",
        description:
          "Personalized haircut with blow-dry, professional styling and aftercare recommendations.",
        price: 80,
        time: 5400, // 1h 30min
      },
      {
        title: "Deep Hair Treatment",
        description:
          "Restorative hydration service using keratin & protein-rich products to repair damaged hair.",
        price: 55,
        time: 2700, // 45min
      },
      {
        title: "Full Hair Color",
        description:
          "Professional coloring including toner & finish — suitable for full coverage or creative tone changes.",
        price: 120,
        time: 7200, // 2h
      },
      {
        title: "Loc Maintenance",
        description:
          "Root retwisting, cleaning, nourishing and shaping for dreadlock upkeep.",
        price: 95,
        time: 6000, // 1h 40min
      },
    ],
  },
  {
    service: "Spa & Wellness",
    services: [
      {
        title: "Aromatherapy Massage",
        description:
          "Relaxing full-body massage with customized fragrance oils enhancing relaxation & stress relief.",
        price: 110,
        time: 5400, // 1h 30min
      },
      {
        title: "Steam Facial Treatment",
        description:
          "Deep-pore cleansing, exfoliation, steam extraction and finishing serum treatment.",
        price: 70,
        time: 3600, // 1h
      },
      {
        title: "Hot Stone Therapy",
        description:
          "Heated basalt stones applied across the body to relieve muscle tension and promote circulation.",
        price: 140,
        time: 7200, // 2h
      },
      {
        title: "Relaxation Foot Reflexology",
        description:
          "A restorative reflexology session stimulating nerve pathways through targeted pressure points.",
        price: 60,
        time: 2700, // 45min
      },
    ],
  },
];

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let result = "";
  if (hours > 0) result += `${hours}h `;
  if (minutes > 0) result += `${minutes}mins`;

  return result.trim();
}
