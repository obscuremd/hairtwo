"use client";

import React, { useEffect, useState } from "react";
import { format, addMinutes, parse } from "date-fns";
import {
  CheckCircle2,
  Clock,
  CalendarDays,
  Loader2,
  Mail,
  LogIn,
} from "lucide-react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "./datePicker";
import { TimeScale } from "./timeScale";
import {
  CreateBooking,
  GetProviderBookedSlots,
  splitName,
  toBookingDate,
} from "@/utils/booking";
import { getStoredCredentials } from "@/utils/user";
import { UseGen } from "@/context/GeneralContext";
import Link from "next/link";

// ─── Steps — differ based on auth state ───────────────────────────────────────

const GUEST_STEPS = [
  { label: "Date & Time" },
  { label: "Your Details" },
  { label: "Confirmed" },
];
const AUTH_STEPS = [{ label: "Date & Time" }, { label: "Confirmed" }];

function Stepper({ step, authed }: { step: number; authed: boolean }) {
  const steps = authed ? AUTH_STEPS : GUEST_STEPS;
  return (
    <div className="flex items-center px-6 pt-5 pb-1">
      {steps.map((s, i) => (
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
          {i < steps.length - 1 && (
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

// ─── Props ────────────────────────────────────────────────────────────────────

interface BookingModalProps {
  serviceId: number;
  providerId: string;
  title: string;
  description: string;
  price: number;
  duration: number; // minutes
  closeModal: () => void;
  businessHours: IBusinessHours[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function BookingModal({
  serviceId,
  providerId,
  title,
  description,
  price,
  duration,
  closeModal,
  businessHours,
}: BookingModalProps) {
  const { isAuthenticated, authUser } = UseGen();
  const { token } = getStoredCredentials();
  const isAuthed = isAuthenticated && !!token;

  // Authed flow: steps 0 (datetime) → 1 (confirmed)
  // Guest flow:  steps 0 (datetime) → 1 (details)  → 2 (confirmed)
  const CONFIRMED_STEP = isAuthed ? 1 : 2;

  const [step, setStep] = useState(0);
  const [date, setDate] = useState<Date | undefined>();
  const [timeSlot, setTimeSlot] = useState<string | undefined>();

  // Guest-only fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [existingBookings, setExistingBookings] = useState<NormalisedBooking[]>(
    [],
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch provider's booked slots for timescale blocking (no auth needed)
  useEffect(() => {
    async function fetchSlots() {
      const result = await GetProviderBookedSlots(providerId);
      if (result.success && result.data) setExistingBookings(result.data);
    }
    fetchSlots();
  }, [providerId]);

  const canProceedStep0 = !!date && !!timeSlot;
  const canProceedStep1 =
    !!name.trim() && !!email.trim() && !!phone.trim() && !!password.trim();

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
  // For the confirmation screen: use authUser email if authed
  const confirmEmail = isAuthed ? (authUser?.email ?? "") : email;

  async function handleConfirm() {
    if (!date || !timeSlot) return;
    setSubmitting(true);
    setSubmitError(null);

    const base = {
      service: serviceId,
      booking_start: timeSlot,
      booking_date: toBookingDate(date),
    };

    const payload = isAuthed
      ? base
      : (() => {
          const { first_name, last_name } = splitName(name);
          return {
            ...base,
            first_name,
            last_name,
            phone_number: phone,
            email,
            password,
            password_confirmation: password,
          };
        })();

    const result = await CreateBooking(payload);
    setSubmitting(false);
    if (result.success) setStep(CONFIRMED_STEP);
    else setSubmitError(result.message);
  }

  function handleClose() {
    setStep(0);
    setDate(undefined);
    setTimeSlot(undefined);
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setSubmitError(null);
    closeModal();
  }

  // Resolve visual step index for the confirmation screen
  const isConfirmStep = step === CONFIRMED_STEP;

  return (
    <DialogContent className="max-w-md gap-0 p-0 overflow-hidden">
      <Stepper step={step} authed={isAuthed} />

      <div className="px-6 pb-6 pt-3 space-y-5">
        {/* ── Step 0: Date & Time ── */}
        {step === 0 && (
          <>
            <DialogHeader className="space-y-0.5">
              <DialogTitle className="text-base">
                Schedule appointment
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                Choose a date and time for your{" "}
                <span className="font-medium text-foreground">{title}</span>.
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

            {canProceedStep0 && (
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

        {/* ── Step 1 (guest only): Client details ── */}
        {!isAuthed && step === 1 && (
          <>
            <DialogHeader className="space-y-0.5">
              <DialogTitle className="text-base">Your details</DialogTitle>
              <DialogDescription>
                Fill in your details to confirm the booking.
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
                  placeholder="+234 900 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label>
                  Password{" "}
                  <span className="text-muted-foreground text-xs font-normal">
                    (to access your booking)
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

            {/* Login hint */}
            <div className="flex items-center gap-2 rounded-lg border border-dashed bg-muted/20 px-3 py-2.5 text-xs text-muted-foreground">
              <LogIn className="size-3.5 shrink-0" />
              <span>
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-foreground underline underline-offset-2"
                >
                  Log in
                </Link>{" "}
                to book faster without filling this form.
              </span>
            </div>

            {/* Booking summary */}
            <div className="rounded-lg border bg-muted/30 px-4 py-3 space-y-1.5 text-sm">
              <p className="font-semibold">{title}</p>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-3.5" /> <span>{dateLabel}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="size-3.5" /> <span>{endTimeLabel}</span>
              </div>
            </div>

            {submitError && (
              <p className="text-xs text-destructive text-center">
                {submitError}
              </p>
            )}
          </>
        )}

        {/* ── Step 1 (authed) or Step 2 (guest): Confirmation ── */}
        {isConfirmStep && (
          <div className="flex flex-col items-center gap-5 py-4 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-8 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold">Appointment Confirmed!</p>
              <p className="text-sm text-muted-foreground">
                Your{" "}
                <span className="font-medium text-foreground">{title}</span> is
                booked for{" "}
                <span className="font-medium text-foreground">{dateLabel}</span>{" "}
                at{" "}
                <span className="font-medium text-foreground">
                  {endTimeLabel}
                </span>
                .
              </p>
            </div>
            {confirmEmail && (
              <div className="w-full rounded-lg border bg-muted/20 px-4 py-3 flex items-start gap-3 text-left">
                <Mail className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A confirmation has been sent to{" "}
                  <span className="font-medium text-foreground">
                    {confirmEmail}
                  </span>
                  .
                </p>
              </div>
            )}
            <div className="w-full rounded-lg border bg-muted/30 px-4 py-3 flex justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold">₦{price.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* ── Footer buttons ── */}
        <div className="pt-1">
          {step === 0 && (
            <>
              <Button
                className="w-full"
                disabled={!canProceedStep0}
                onClick={() => {
                  if (isAuthed) {
                    // Skip details step — confirm directly
                    handleConfirm();
                  } else {
                    setStep(1);
                  }
                }}
              >
                {isAuthed && submitting ? (
                  <>
                    <Loader2 className="size-3.5 mr-2 animate-spin" />
                    Confirming…
                  </>
                ) : isAuthed ? (
                  "Confirm booking"
                ) : (
                  "Continue"
                )}
              </Button>
              <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                <span>{duration} min session</span>
                <span className="font-medium text-foreground">
                  ₦{price.toFixed(2)}
                </span>
              </div>
            </>
          )}

          {!isAuthed && step === 1 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(0)}
                disabled={submitting}
              >
                Back
              </Button>
              <Button
                className="flex-1"
                disabled={!canProceedStep1 || submitting}
                onClick={handleConfirm}
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-3.5 mr-2 animate-spin" />
                    Confirming…
                  </>
                ) : (
                  "Confirm booking"
                )}
              </Button>
            </div>
          )}

          {isConfirmStep && (
            <Button className="w-full" onClick={handleClose}>
              Done
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );
}
