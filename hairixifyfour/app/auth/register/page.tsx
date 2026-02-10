/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Facebook,
  Google,
  GoogleCircle,
  GoogleCircleSolid,
  Trash,
  X,
} from "iconoir-react";
import { AnimatePresence, motion } from "framer-motion";

export default function RegistrationFlow() {
  const [step, setStep] = useState(0);

  return (
    <div className="py-10">
      {step === 0 && <AccountSetup setStep={setStep} />}
      {step === 1 && <AboutYou setStep={setStep} />}
      {step === 2 && <BusinessCategory setStep={setStep} />}
      {step === 3 && <WorkLocation setStep={setStep} />}
      {step === 4 && <TeamSize setStep={setStep} />}
      {step === 5 && <BusinessHours setStep={setStep} />}
      {step === 6 && <Services setStep={setStep} />}
      {step === 7 && <GoLive setStep={setStep} />}
      {step === 8 && <Success />}
    </div>
  );
}

/* ---------- STEP 1 ---------- */

function AccountSetup({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  return (
    <StepWrapper
      title="Create your account"
      description="Start by setting up your login details. This will be used to manage your business on Hairxify."
    >
      <Field label="Email address">
        <Input placeholder="you@example.com" />
      </Field>

      <Field label="Password">
        <Input type="password" />
      </Field>

      <Separator />

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Or continue with a social account
        </p>
        <div className="flex gap-3">
          <Button
            variant={"secondary"}
            className="flex-1 font-semibold bg-black text-white hover:bg-black/70"
          >
            <GoogleCircleSolid />
            Google
          </Button>
          <Button
            variant="secondary"
            className="flex-1 font-semibold bg-black text-white hover:bg-black/70"
          >
            <Facebook />
            Facebook
          </Button>
          <Button
            variant="secondary"
            className="flex-1 font-semibold bg-black text-white hover:bg-black/70"
          >
            <X />
            Twitter
          </Button>
        </div>
      </div>

      <Nav setStep={setStep} />
    </StepWrapper>
  );
}

/* ---------- STEP 2 ---------- */

function AboutYou({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) {
  return (
    <StepWrapper
      title="Tell us about you"
      description="This information helps customers recognize your business and trust your services."
    >
      <Field label="Business name">
        <Input placeholder="Glow Touch Salon" />
      </Field>

      <Field label="Full name">
        <Input placeholder="Jane Doe" />
      </Field>

      <Field label="Phone number">
        <Input placeholder="+1 234 567 890" />
      </Field>

      <Nav setStep={setStep} />
    </StepWrapper>
  );
}

/* ---------- STEP 3 ---------- */

function BusinessCategory({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <StepWrapper
      title="Choose your business category"
      description="Select the category that best represents the services you offer. This helps clients find you easily."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[40vh] overflow-y-auto pr-1">
        {stylistDropdownData.map((item) => {
          const isSelected = selected === item.title;

          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setSelected(item.title)}
              className={`
                relative flex items-start gap-4 rounded-2xl border p-4 text-left transition
                ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }
              `}
            >
              {/* Checkbox */}
              <div className="pt-1">
                <Checkbox checked={isSelected} />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h3 className="font-medium leading-none">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <Nav setStep={setStep} />
    </StepWrapper>
  );
}

/* ---------- STEP 4 ---------- */

function WorkLocation({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const [type, setType] = useState<"my-place" | "client">("client");

  return (
    <StepWrapper
      title="Where do you provide your services?"
      description="Let us know how you work so we can tailor bookings and visibility."
    >
      {/* Card-style radio options */}
      <div className="flex flex-col gap-4">
        <WorkOption
          value="client"
          title="At client’s location"
          description="You travel to your clients."
          selected={type === "client"}
          onSelect={() => setType("client")}
        />
        <WorkOption
          value="my-place"
          title="At my place"
          description="Clients visit your business location."
          selected={type === "my-place"}
          onSelect={() => setType("my-place")}
        />
      </div>

      {/* Animated address fields */}
      <AnimatePresence initial={false}>
        {type === "my-place" && (
          <motion.div
            key="address-fields"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden pt-4 space-y-4"
          >
            <Field label="Street address">
              <Input />
            </Field>
            <Field label="City">
              <Input />
            </Field>
            <Field label="Country">
              <Input />
            </Field>
            <Field label="Zip code">
              <Input />
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      <Nav setStep={setStep} />
    </StepWrapper>
  );
}

/* ---------- Professional Card Option ---------- */
function WorkOption({
  value,
  title,
  description,
  selected,
  onSelect,
}: {
  value: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        relative flex items-start gap-4 rounded-2xl border p-4 text-left transition
        ${selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
      `}
    >
      {/* Checkbox indicator */}
      <div className="pt-1">
        <Checkbox checked={selected} />
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="font-medium leading-none">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}

/* ---------- STEP 5 ---------- */

function TeamSize({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) {
  return (
    <StepWrapper
      title="Team size"
      description="This helps us tailor tools and recommendations for your business."
    >
      <RadioGroup className="space-y-3">
        {["Just me", "2–3", "4–6", "More than 6"].map((o) => (
          <Option key={o} value={o} title={o} />
        ))}
      </RadioGroup>

      <Nav setStep={setStep} />
    </StepWrapper>
  );
}

/* ---------- STEP 6 ---------- */

function BusinessHours({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <StepWrapper
      title="Business hours"
      description="Set your availability so clients can book you at the right time."
    >
      <div className="space-y-4">
        {days.map((day) => (
          <div key={day} className="grid grid-cols-3 gap-4 items-center">
            <span className="text-sm font-medium">{day}</span>
            <Input type="time" />
            <Input type="time" />
          </div>
        ))}
      </div>

      <Nav setStep={setStep} />
    </StepWrapper>
  );
}

/* ---------- STEP 7 ---------- */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Link from "next/link";

interface Service {
  title: string;
  time?: string;
  price?: string;
  description?: string;
}

export function Services({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const [services, setServices] = useState<Service[]>([
    {
      title: "Dayo Cutz",
      time: "1hr",
      price: "2000",
      description: "a fresh cut for fresh kings",
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newService, setNewService] = useState<Service>({
    title: "",
    time: "",
    price: "",
    description: "",
  });

  const handleAddService = () => {
    if (newService.title.trim() === "") return; // require title
    setServices([...services, newService]);
    setNewService({ title: "", time: "", price: "", description: "" });
    setDialogOpen(false);
  };

  const handleDeleteService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  return (
    <StepWrapper
      title="Add your services"
      description="List the services you offer so clients know exactly what to book."
    >
      {/* Add Service Button */}
      <Button variant="outline" onClick={() => setDialogOpen(true)}>
        + Add service
      </Button>

      {/* Services list */}
      <div className="space-y-4 mt-4">
        {services.map((service, i) => (
          <div
            key={i}
            className="
    flex items-center justify-between gap-4
    p-4 rounded-xl border border-gray-200
    shadow-sm hover:shadow-lg transition-shadow duration-300
    bg-white
  "
          >
            {/* Left: title + description */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {service.title}
              </h3>
              {service.description && (
                <p className="text-sm text-gray-500 truncate mt-1 line-clamp-2">
                  {service.description}
                </p>
              )}
            </div>

            {/* Right: time + price */}
            <div className="flex flex-col items-end justify-center ml-4 text-sm text-gray-700">
              {service.price && (
                <span className="font-medium text-gray-900 mt-1">
                  ${service.price}
                </span>
              )}
              {service.time && (
                <span className="text-gray-600">{service.time}</span>
              )}
            </div>

            {/* Delete button */}
            <Button
              variant="ghost"
              size="icon"
              className=" text-red-500 hover:text-red-600 transition-colors duration-200"
              onClick={() => handleDeleteService(i)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Dialog for adding a new service */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add a new service</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <Field label="Service title">
              <Input
                value={newService.title}
                onChange={(e) =>
                  setNewService({ ...newService, title: e.target.value })
                }
                placeholder="Haircut, Facial, etc."
              />
            </Field>

            <Field label="Estimated time">
              <Input
                value={newService.time}
                onChange={(e) =>
                  setNewService({ ...newService, time: e.target.value })
                }
                placeholder="30 min, 1 hr, etc."
              />
            </Field>

            <Field label="Price">
              <Input
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
                placeholder="$50"
              />
            </Field>

            <Field label="Description (optional)">
              <Input
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                placeholder="A brief description of the service"
              />
            </Field>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddService}>Add Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Nav setStep={setStep} />
    </StepWrapper>
  );
}

/* ---------- STEP 8 ---------- */

function GoLive({ setStep }: { setStep: Dispatch<number> }) {
  return (
    <StepWrapper
      title="Go live"
      description="Choose when your profile should become visible to clients."
    >
      <Input type="date" />

      <Button className="w-full mt-4" onClick={() => setStep(9)}>
        Finish setup
      </Button>
    </StepWrapper>
  );
}

/* ---------- SUCCESS ---------- */

function Success() {
  return (
    <div className="max-w-xl mx-auto text-center py-20 space-y-4">
      <h1 className="text-3xl font-bold">🎉 You’re all set</h1>
      <p className="text-muted-foreground">
        Your Hairxify profile is ready. You can now start attracting clients.
      </p>
      <Link href={"/dashboard/appointments"}>
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  );
}

/* ---------- SHARED ---------- */

function StepWrapper({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Option({
  value,
  title,
  description,
}: {
  value: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <RadioGroupItem value={value} />
      <div>
        <Label className="font-medium">{title}</Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

function Nav({ setStep }: { setStep: Dispatch<SetStateAction<number>> }) {
  return (
    <div className="flex justify-between pt-6">
      <Button variant="ghost" onClick={() => setStep((s: number) => s - 1)}>
        Back
      </Button>
      <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
    </div>
  );
}

/* ---------- DATA ---------- */

export const stylistDropdownData = [
  { title: "Aesthetics", description: "Non-surgical beauty treatments." },
  { title: "Barbershop", description: "Professional grooming and cuts." },
  { title: "Hair Salon", description: "Cuts, coloring, styling." },
  { title: "Makeup", description: "Bridal and event makeup." },
  { title: "Nail Salon", description: "Manicure and pedicure." },
  { title: "Spa", description: "Relaxation and wellness services." },
];
