"use client";

import React, { useEffect, useState } from "react";
import { format, addMinutes, parse } from "date-fns";
import { CheckCircle2, Clock, CalendarDays, Loader2, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetProviderServices } from "@/utils/services";
import {
  GetBookedSlots,
  CreateBooking,
  splitName,
  toBookingDate,
} from "@/utils/booking";
import { UseGen } from "@/context/GeneralContext";
import { DatePicker } from "@/components/localComponents/datePicker";
import { TimeScale } from "@/components/localComponents/timeScale";

const STEPS = [
  { label: "Service" },
  { label: "Date & Time" },
  { label: "Client Details" },
  { label: "Confirmed" },
];

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center px-6 pt-5 pb-1">
      {STEPS.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div
              className={`size-6 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors duration-300 ${
                i < step
                  ? "bg-primary text-primary-foreground"
                  : i === step
                    ? "ring-2 ring-primary text-primary bg-background"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </div>
            <span
              className={`text-[10px] font-medium hidden sm:block transition-colors ${
                i === step ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-px mx-2 mb-3.5 transition-colors duration-500 ${
                i < step ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

interface AddBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBookingDialog({
  open,
  onOpenChange,
}: AddBookingDialogProps) {
  const { authProvider } = UseGen();
  const providerId = String(authProvider?.id ?? "");
  const businessHours: IBusinessHours[] = authProvider?.business_hours ?? [];

  // Services
  const [groups, setGroups] = useState<ServiceGroup[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Selected service
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Step
  const [step, setStep] = useState(0);

  // Date & time
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<string | undefined>();
  const [existingBookings, setExistingBookings] = useState<NormalisedBooking[]>(
    [],
  );

  // Client details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Load services on mount
  useEffect(() => {
    async function load() {
      setServicesLoading(true);
      const result = await GetProviderServices();
      if (result.success && result.groups) {
        setGroups(result.groups);
        // Pre-select the first active service
        const firstGroup = result.groups.find((g) => g.status === "active");
        const firstService = firstGroup?.services.find(
          (s) => s.status !== "inactive",
        );
        if (firstService) setSelectedService(firstService);
      }
      setServicesLoading(false);
    }
    if (open) load();
  }, [open]);

  // Fetch booked slots whenever date changes
  useEffect(() => {
    if (!providerId || !date) return;
    async function fetch() {
      const result = await GetBookedSlots(providerId, date ?? new Date());
      if (result.success && result.data) setExistingBookings(result.data);
    }
    fetch();
  }, [providerId, date]);

  const duration = selectedService
    ? parseInt(selectedService.duration, 10)
    : 30;
  const price = selectedService
    ? parseFloat(selectedService.discount_price || selectedService.price)
    : 0;

  const endTimeLabel = (() => {
    if (!date || !timeSlot) return null;
    try {
      const start = parse(timeSlot, "HH:mm", date);
      if (isNaN(start.getTime())) return null;
      return `${format(start, "HH:mm")} – ${format(addMinutes(start, duration), "HH:mm")}`;
    } catch {
      return null;
    }
  })();

  const dateLabel = date ? format(date, "EEE, MMM d, yyyy") : null;

  const canProceedStep0 = !!selectedService;
  const canProceedStep1 = !!date && !!timeSlot;
  const canProceedStep2 =
    !!name.trim() && !!email.trim() && !!phone.trim() && !!password.trim();

  async function handleConfirm() {
    if (!date || !timeSlot || !selectedService) return;
    setSubmitting(true);
    setSubmitError(null);
    const { first_name, last_name } = splitName(name);
    const result = await CreateBooking({
      service: selectedService.id ?? 0,
      booking_start: timeSlot,
      booking_date: toBookingDate(date),
      first_name,
      last_name,
      phone_number: phone,
      email,
      password,
      password_confirmation: password,
    });
    setSubmitting(false);
    if (result.success) {
      setStep(3);
    } else {
      setSubmitError(result.message);
    }
  }

  function handleDone() {
    // Reset everything and close, then refresh to pull the new booking
    setStep(0);
    setDate(undefined);
    setTimeSlot(undefined);
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setSubmitError(null);
    onOpenChange(false);
    window.location.reload();
  }

  // Flat list of all active services for the select
  const allServices = groups
    .filter((g) => g.status === "active")
    .flatMap((g) => g.services.filter((s) => s.status !== "inactive"));

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) handleDone();
        else onOpenChange(true);
      }}
    >
      <DialogContent className="max-w-md gap-0 p-0 overflow-hidden">
        <Stepper step={step} />

        <div className="px-6 pb-6 pt-3 space-y-5">
          {/* ── Step 0: Pick a service ── */}
          {step === 0 && (
            <>
              <DialogHeader className="space-y-0.5">
                <DialogTitle className="text-base">New Appointment</DialogTitle>
                <DialogDescription>
                  Select the service for this booking.
                </DialogDescription>
              </DialogHeader>

              {servicesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="size-5 animate-spin text-muted-foreground" />
                </div>
              ) : allServices.length === 0 ? (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No active services found.
                </p>
              ) : (
                <div className="space-y-1.5">
                  <Label>Service</Label>
                  <Select
                    value={String(selectedService?.id ?? "")}
                    onValueChange={(v) => {
                      const svc =
                        allServices.find((s) => String(s.id) === v) ?? null;
                      setSelectedService(svc);
                    }}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Choose a service…" />
                    </SelectTrigger>
                    <SelectContent>
                      {groups
                        .filter((g) => g.status === "active")
                        .map((g) => (
                          <React.Fragment key={g.id}>
                            {/* Group label */}
                            <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                              {g.name}
                            </div>
                            {g.services
                              .filter((s) => s.status !== "inactive")
                              .map((s) => (
                                <SelectItem key={s.id} value={String(s.id)}>
                                  <span className="flex items-center justify-between gap-8 w-full">
                                    <span>{s.title}</span>
                                    <span className="text-muted-foreground text-xs">
                                      ₦
                                      {parseFloat(
                                        s.discount_price || s.price,
                                      ).toLocaleString()}
                                      {" · "}
                                      {s.duration} min
                                    </span>
                                  </span>
                                </SelectItem>
                              ))}
                          </React.Fragment>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Selected service preview */}
              {selectedService && (
                <div className="rounded-lg border bg-muted/30 px-4 py-3 space-y-1 text-sm">
                  <p className="font-semibold">{selectedService.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {selectedService.description}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      ₦{price.toLocaleString()}
                    </span>
                    <Separator orientation="vertical" className="h-3" />
                    <Clock className="size-3" />
                    <span>{duration} min</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── Step 1: Date & Time ── */}
          {step === 1 && (
            <>
              <DialogHeader className="space-y-0.5">
                <DialogTitle className="text-base">Date & Time</DialogTitle>
                <DialogDescription>
                  Choose when to schedule{" "}
                  <span className="font-medium text-foreground">
                    {selectedService?.title}
                  </span>
                  .
                </DialogDescription>
              </DialogHeader>

              <DatePicker
                value={date}
                onChange={(d) => {
                  setDate(d);
                  setTimeSlot(undefined);
                }}
                businessHours={businessHours}
              />

              <TimeScale
                date={date}
                value={timeSlot}
                serviceDuration={duration}
                onChange={setTimeSlot}
                existingBookings={existingBookings}
                businessHours={businessHours}
              />

              {canProceedStep1 && (
                <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm">
                  <CalendarDays className="size-4 text-muted-foreground shrink-0" />
                  <span>{dateLabel}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <Clock className="size-4 text-muted-foreground shrink-0" />
                  <span>{endTimeLabel}</span>
                </div>
              )}
            </>
          )}

          {/* ── Step 2: Client details ── */}
          {step === 2 && (
            <>
              <DialogHeader className="space-y-0.5">
                <DialogTitle className="text-base">Client Details</DialogTitle>
                <DialogDescription>
                  Enter the client&apos;s information.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label>
                    Full name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>
                    Phone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="+234 000 0000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>
                    Password{" "}
                    <span className="text-muted-foreground text-xs font-normal">
                      (client uses to access booking)
                    </span>
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Booking recap */}
              <div className="rounded-lg border bg-muted/30 px-4 py-3 space-y-1.5 text-sm">
                <p className="font-semibold">{selectedService?.title}</p>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  <span>{dateLabel}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{endTimeLabel}</span>
                </div>
              </div>

              {submitError && (
                <p className="text-xs text-destructive text-center">
                  {submitError}
                </p>
              )}
            </>
          )}

          {/* ── Step 3: Confirmed ── */}
          {step === 3 && (
            <div className="flex flex-col items-center gap-5 py-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-8 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold">Booking Created!</p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {selectedService?.title}
                  </span>{" "}
                  has been booked for{" "}
                  <span className="font-medium text-foreground">
                    {dateLabel}
                  </span>{" "}
                  at{" "}
                  <span className="font-medium text-foreground">
                    {endTimeLabel}
                  </span>
                  .
                </p>
              </div>
              <div className="w-full rounded-lg border bg-muted/20 px-4 py-3 flex items-start gap-3 text-left">
                <Mail className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A confirmation has been sent to{" "}
                  <span className="font-medium text-foreground">{email}</span>.
                </p>
              </div>
              <div className="w-full rounded-lg border bg-muted/30 px-4 py-3 flex justify-between text-sm">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold">₦{price.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* ── Footer ── */}
          <div className="pt-1">
            {step === 0 && (
              <Button
                className="w-full"
                disabled={!canProceedStep0 || servicesLoading}
                onClick={() => setStep(1)}
              >
                Continue
              </Button>
            )}

            {step === 1 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(0)}
                >
                  Back
                </Button>
                <Button
                  className="flex-1"
                  disabled={!canProceedStep1}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                  disabled={submitting}
                >
                  Back
                </Button>
                <Button
                  className="flex-1"
                  disabled={!canProceedStep2 || submitting}
                  onClick={handleConfirm}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-3.5 mr-2 animate-spin" />
                      Confirming…
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </div>
            )}

            {step === 3 && (
              <Button className="w-full" onClick={handleDone}>
                Done
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
