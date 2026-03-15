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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// duration from API is already in minutes
function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours && mins) return `${hours}h ${mins}mins`;
  if (hours) return `${hours}h`;
  return `${mins}mins`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Services({
  services,
  provider,
}: {
  services: ServiceGroup[];
  provider: Provider;
}) {
  const activeGroups = services.filter(
    (g) => g.status === "active" && g.services?.length > 0,
  );

  return (
    <Tabs
      defaultValue="services"
      className="bg-white px-5 md:px-[68px] py-12 space-y-12"
    >
      {/* Header */}
      <TabsList className="bg-transparent flex gap-8 border-b border-border pb-4 h-auto">
        <TabsTrigger
          value="services"
          className="relative bg-transparent border-none shadow-none min-h-[48px] flex items-center
            text-muted-foreground text-xl md:text-[1.5rem] font-bold transition-all duration-200
            data-[state=active]:text-black data-[state=active]:md:text-[1.75rem] focus:outline-none"
        >
          Services
        </TabsTrigger>
        <TabsTrigger
          value="profile"
          className="relative bg-transparent border-none shadow-none min-h-[48px] flex items-center
            text-muted-foreground text-xl md:text-[1.5rem] font-bold transition-all duration-200
            data-[state=active]:text-black data-[state=active]:md:text-[1.75rem] focus:outline-none"
        >
          Profile Info
        </TabsTrigger>
      </TabsList>

      {/* Services tab */}
      <TabsContent
        value="services"
        className="focus:outline-none animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
      >
        {activeGroups.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No services available at the moment.
          </p>
        ) : (
          <ServiceList groups={activeGroups} provider={provider} />
        )}
      </TabsContent>

      {/* Profile tab */}
      <TabsContent
        value="profile"
        className="max-w-3xl focus:outline-none animate-in fade-in-0 slide-in-from-bottom-1 duration-300"
      >
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {provider.business_name}
        </p>
      </TabsContent>
    </Tabs>
  );
}

// ─── Service list ─────────────────────────────────────────────────────────────

function ServiceList({
  groups,
  provider,
}: {
  groups: ServiceGroup[];
  provider: Provider;
}) {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="space-y-6">
        {groups.map((group, groupIdx) => (
          <div
            key={group.id ?? groupIdx}
            className="rounded-2xl border border-border bg-card shadow-sm"
          >
            <Accordion
              type="multiple"
              defaultValue={groups.map((_, i) => `group-${i}`)}
            >
              <AccordionItem
                value={`group-${groupIdx}`}
                className="border-none"
              >
                <AccordionTrigger className="p-4 hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex flex-col gap-2 items-start">
                      <p className="text-lg md:text-xl font-bold text-[#4a996f]">
                        {group.name}
                      </p>
                      <div className="h-[2px] w-full bg-[#4a996f7e]" />
                    </div>
                    <span className="text-sm text-muted-foreground shrink-0 ml-4">
                      {group.services.length}{" "}
                      {group.services.length === 1 ? "service" : "services"}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-4">
                  <div className="divide-y divide-border">
                    {group.services
                      .filter((s) => s.status !== "inactive")
                      .map((service, idx) => {
                        const price = parseFloat(service.price);
                        const discountedPrice = service.discount_price
                          ? parseFloat(service.discount_price)
                          : undefined;
                        const durationMins = parseInt(service.duration, 10);
                        const hasImages =
                          service.images && service.images.length > 0;

                        return (
                          <div
                            key={service.id ?? idx}
                            className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                          >
                            {/* Left */}
                            <div className="space-y-2 md:max-w-[65%]">
                              <p className="text-lg font-medium">
                                {service.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {service.description}
                              </p>

                              {hasImages && (
                                <div className="flex gap-2">
                                  {service.images!.map((src, i) => (
                                    <motion.img
                                      key={i}
                                      src={`https://api5.project.hairxify.com/${src.image}`}
                                      alt=""
                                      className="h-[40px] w-[40px] rounded-md object-cover cursor-pointer"
                                      whileHover={{ scale: 1.08 }}
                                    />
                                  ))}
                                </div>
                              )}

                              {discountedPrice !== undefined && (
                                <Badge className="text-[#004737] bg-[#12ab594a]">
                                  Save Up to{" "}
                                  {Math.round(
                                    ((price - discountedPrice) / price) * 100,
                                  )}
                                  %
                                </Badge>
                              )}
                            </div>

                            {/* Right */}
                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 min-w-[140px]">
                              <div className="flex gap-2 items-baseline">
                                <p
                                  className={
                                    discountedPrice !== undefined
                                      ? "line-through text-muted-foreground text-lg"
                                      : "text-lg font-semibold"
                                  }
                                >
                                  {price === 0 ? "Free" : `₦${price}`}
                                </p>
                                {discountedPrice !== undefined && (
                                  <p className="text-lg font-semibold">
                                    {discountedPrice === 0
                                      ? "Free"
                                      : `₦${discountedPrice}`}
                                  </p>
                                )}
                              </div>

                              <p className="text-sm text-muted-foreground">
                                {isNaN(durationMins)
                                  ? service.duration
                                  : formatTime(durationMins)}
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
                        );
                      })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>

      {/* Booking modal — real provider data, no more mock */}
      {selectedService && (
        <BookingModal
          serviceId={selectedService.id ?? 0}
          providerId={String(provider.id)}
          title={selectedService.title}
          description={selectedService.description}
          price={parseFloat(selectedService.price)}
          duration={parseInt(selectedService.duration, 10)}
          businessHours={provider.business_hours}
          closeModal={() => setOpen(false)}
        />
      )}
    </Dialog>
  );
}
