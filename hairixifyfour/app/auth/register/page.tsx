/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Check,
  Eye,
  EyeClosed,
  Trash,
  WarningTriangle,
  Xmark,
} from "iconoir-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import {
  getArea,
  getCategory,
  getLocal,
  getRecurrence,
  getService,
  getStates,
  onboardProvider,
} from "@/utils/onboarding";
import { Mail } from "lucide-react";

/* ============================================================
   LOCAL TYPES
   ============================================================ */

/* ============================================================
   CONSTANTS
   ============================================================ */

const TOTAL_STEPS = 8;

const stepsMeta = [
  { label: "Account" },
  { label: "Profile" },
  { label: "Category" },
  { label: "Location" },
  { label: "Team" },
  { label: "Hours" },
  { label: "Services" },
  { label: "Go Live" },
];

/* ============================================================
   VALIDATION
   ============================================================ */

function validateStep(
  step: number,
  payload: RegistrationPayload,
): string | null {
  switch (step) {
    case 0:
      if (!payload.email.trim()) return "Email address is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
        return "Please enter a valid email address.";
      if (!payload.password) return "Password is required.";
      if (payload.password.length < 8)
        return "Password must be at least 8 characters.";
      if (payload.password !== payload.password_confirmation)
        return "Passwords do not match.";
      return null;
    case 1:
      if (!payload.business_name.trim()) return "Business name is required.";
      if (!payload.first_name.trim()) return "First name is required.";
      if (!payload.last_name.trim()) return "Last name is required.";
      if (!payload.phone_number.trim()) return "Phone number is required.";
      return null;
    case 2:
      if (!payload.category) return "Please select a business category.";
      return null;
    case 3:
      if (!payload.service_type)
        return "Please select where you provide your services.";
      if (payload.service_type === 2) {
        if (!payload.address?.trim()) return "Street address is required.";
        if (!payload.state) return "Please select a state.";
        if (!payload.local) return "Please select a local government.";
        if (!payload.area) return "Please select an area.";
      }
      return null;
    case 4:
      if (!payload.team_size) return "Please select your team size.";
      return null;
    case 5:
      if (payload.business_hours.length === 0)
        return "Please set hours for at least one day.";
      return null;
    case 6:
      if (payload.services.length === 0)
        return "Please add at least one service.";
      return null;
    case 7:
      if (!payload.live_at) return "Please select a go-live date.";
      return null;
    default:
      return null;
  }
}

/* ============================================================
   SHARED STEP PROPS
   ============================================================ */

interface StepProps {
  setStep: Dispatch<SetStateAction<number>>;
  payload: RegistrationPayload;
  update: (u: Partial<RegistrationPayload>) => void;
  statesData: stateData[];
  availableLgas: localData[];
  availableAreas: areaData[];
  categories: Category[];
  recurrences: Recurrence[];
  serviceTypes: ServiceType[];
  dataLoading: boolean;
}

/* ============================================================
   ROOT
   ============================================================ */

export default function RegistrationFlow() {
  /* Remote data */
  const [statesData, setStatesData] = useState<stateData[]>([]);
  const [allLocals, setAllLocals] = useState<localData[]>([]);
  const [allAreas, setAllAreas] = useState<areaData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recurrences, setRecurrences] = useState<Recurrence[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  /* Form */
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [payload, setPayload] = useState<RegistrationPayload>({
    email: "",
    password: "",
    password_confirmation: "",
    business_name: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    state: null,
    local: null,
    area: null,
    team_size: "",
    category: 1,
    sub_category: null,
    service_type: null,
    live_at: "",
    services: [],
    business_hours: [],
  });

  const update = (updates: Partial<RegistrationPayload>) =>
    setPayload((prev) => ({ ...prev, ...updates }));

  /* Fetch all lookup data once before showing the form */
  useEffect(() => {
    async function fetchAll() {
      setDataLoading(true);
      try {
        const [s, l, a, c, r, sv] = await Promise.all([
          getStates(),
          getLocal(),
          getArea(),
          getCategory(),
          getRecurrence(),
          getService(),
        ]);
        if (s.success && s.data) setStatesData(s.data);
        if (l.success && l.data) setAllLocals(l.data);
        if (a.success && a.data) setAllAreas(a.data);
        if (c.success && c.data) setCategories(c.data);
        if (r.success && r.data) setRecurrences(r.data);
        if (sv.success && sv.data) setServiceTypes(sv.data);
      } catch {
        toast.error(
          "Failed to load configuration data. Please refresh the page.",
        );
      } finally {
        setDataLoading(false);
      }
    }
    fetchAll();
  }, []);

  /* Derived location lists filtered by current selection */
  const availableLgas = payload.state
    ? allLocals.filter((l) => l.state.id === payload.state)
    : [];

  const availableAreas = payload.local
    ? allAreas.filter((a) => a.local.id === payload.local)
    : [];

  /* Final submit */
  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await onboardProvider(payload);
      if (res.success) {
        toast.success(res.message || "Profile created successfully!");
        setStep(TOTAL_STEPS);
      } else {
        toast.error(res.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const sharedProps: StepProps = {
    payload,
    update,
    statesData,
    availableLgas,
    availableAreas,
    categories,
    recurrences,
    serviceTypes,
    dataLoading,
    setStep,
  };

  /* Loading skeleton */
  if (dataLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-4">
        <Toaster richColors position="top-right" />
        <div className="text-center mb-2">
          <span className="text-2xl font-bold tracking-tight text-secondary-c">
            Hairxify
          </span>
          <span className="text-sm ml-2 text-gray-400 font-normal">
            Business Setup
          </span>
        </div>
        <div className="w-full max-w-2xl space-y-4 animate-pulse">
          <div className="h-6 bg-gray-100 rounded-xl w-48 mx-auto" />
          <div className="h-64 bg-gray-50 rounded-2xl border border-gray-100" />
          <div className="h-9 bg-gray-100 rounded-xl w-32 ml-auto" />
        </div>
        <p className="text-xs text-gray-400 mt-2">Loading your setup wizard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <Toaster richColors position="top-right" />

      {/* Logo */}
      <div className="text-center mb-10">
        <span className="text-2xl font-bold tracking-tight text-secondary-c">
          Hairxify
        </span>
        <span className="text-sm ml-2 text-gray-400 font-normal">
          Business Setup
        </span>
      </div>

      {/* Stepper */}
      {step < TOTAL_STEPS && (
        <div className="max-w-2xl mx-auto mb-8 px-2">
          <div className="flex items-center justify-between">
            {stepsMeta.map((s, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all duration-300 ${
                      i < step
                        ? "bg-primary-c text-white"
                        : i === step
                          ? "bg-secondary-c text-white"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-[10px] font-medium hidden sm:block transition-colors ${
                      i === step ? "text-secondary-c" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < stepsMeta.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-1 transition-all duration-500 ${
                      i < step ? "bg-primary-c" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {step === 0 && <AccountSetup {...sharedProps} />}
      {step === 1 && <AboutYou {...sharedProps} />}
      {step === 2 && <BusinessCategory {...sharedProps} />}
      {step === 3 && <WorkLocation {...sharedProps} />}
      {step === 4 && <TeamSize {...sharedProps} />}
      {step === 5 && <BusinessHours {...sharedProps} />}
      {step === 6 && <Services {...sharedProps} />}
      {step === 7 && (
        <GoLive
          setStep={setStep}
          payload={payload}
          update={update}
          categories={categories}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
      {step === TOTAL_STEPS && <Success />}
    </div>
  );
}

/* ============================================================
   STEP 1 — Account Setup
   ============================================================ */

function AccountSetup({ setStep, payload, update }: StepProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleNext = () => {
    const err = validateStep(0, payload);
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => s + 1);
  };

  const passwordsMatch =
    payload.password_confirmation.length > 0 &&
    payload.password === payload.password_confirmation;

  const passwordsMismatch =
    payload.password_confirmation.length > 0 &&
    payload.password !== payload.password_confirmation;

  return (
    <StepWrapper
      step={1}
      title="Create your account"
      description="Start by setting up your login details. These credentials will be used to manage your Hairxify business profile."
    >
      <div className="grid gap-5">
        <Field label="Email address">
          <Input
            placeholder="you@example.com"
            value={payload.email}
            onChange={(e) => update({ email: e.target.value })}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Password */}
          <Field label="Password">
            <div className="relative">
              <Input
                type={passwordVisible ? "text" : "password"}
                value={payload.password}
                onChange={(e) => update({ password: e.target.value })}
                className="pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setPasswordVisible((v) => !v)}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {passwordVisible ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </Field>

          {/* Confirm password */}
          <Field label="Confirm password">
            <div className="relative">
              <Input
                type={passwordVisible ? "text" : "password"}
                value={payload.password_confirmation}
                onChange={(e) =>
                  update({ password_confirmation: e.target.value })
                }
                className={`pr-10 transition-colors ${
                  passwordsMismatch
                    ? "border-red-300 focus-visible:ring-red-200"
                    : passwordsMatch
                      ? "border-primary-c focus-visible:ring-primary-c/20"
                      : ""
                }`}
              />
              {/* Match / mismatch indicator */}
              {payload.password_confirmation.length > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  {passwordsMatch ? (
                    <Check className="w-4 h-4 text-primary-c" />
                  ) : (
                    <Xmark className="w-4 h-4 text-red-400" />
                  )}
                </span>
              )}
            </div>
            {passwordsMismatch && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <WarningTriangle className="w-3 h-3" />
                Passwords don&apos;t match
              </p>
            )}
          </Field>
        </div>

        {/* Show / hide toggle */}
        <button
          type="button"
          onClick={() => setPasswordVisible((v) => !v)}
          className="flex items-center gap-1.5 w-fit text-xs text-gray-400 hover:text-gray-700 transition-colors select-none -mt-1"
        >
          {passwordVisible ? (
            <>
              <EyeClosed className="w-3.5 h-3.5" /> Hide passwords
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" /> Show passwords
            </>
          )}
        </button>
      </div>

      <Nav onNext={handleNext} hideBack />
    </StepWrapper>
  );
}

/* ============================================================
   STEP 2 — About You
   ============================================================ */

function AboutYou({ setStep, payload, update }: StepProps) {
  const handleNext = () => {
    const err = validateStep(1, payload);
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <StepWrapper
      step={2}
      title="Tell us about you"
      description="This information helps clients recognize and trust your business. It will appear on your public profile."
    >
      <div className="grid gap-5">
        <Field label="Business name">
          <Input
            placeholder="e.g. Glow Touch Salon"
            value={payload.business_name}
            onChange={(e) => update({ business_name: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="First name">
            <Input
              placeholder="Jane"
              value={payload.first_name}
              onChange={(e) => update({ first_name: e.target.value })}
            />
          </Field>
          <Field label="Last name">
            <Input
              placeholder="Doe"
              value={payload.last_name}
              onChange={(e) => update({ last_name: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Phone number">
          <Input
            placeholder="+234 800 000 0000"
            value={payload.phone_number}
            onChange={(e) => update({ phone_number: e.target.value })}
          />
        </Field>
      </div>
      <Nav onNext={handleNext} onBack={() => setStep((s) => s - 1)} />
    </StepWrapper>
  );
}

/* ============================================================
   STEP 3 — Business Category
   ============================================================ */

function BusinessCategory({ setStep, payload, update, categories }: StepProps) {
  const handleNext = () => {
    const err = validateStep(2, payload);
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <StepWrapper
      step={3}
      title="Choose your business category"
      description="Select the category that best represents the services you offer. This helps clients discover you more easily."
    >
      <div className="space-y-4 max-h-[30vh] overflow-y-auto">
        {/* Main Category Select (does nothing for now) */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            Category
          </p>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="provider">Provider</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
              <SelectItem value="employer">Employer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sub Category Select */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
            Sub Category
          </p>

          <Select
            value={payload.sub_category?.toString()}
            onValueChange={(val) => update({ sub_category: Number(val) })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sub category" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Nav onNext={handleNext} onBack={() => setStep((s) => s - 1)} />
    </StepWrapper>
  );
}

/* ============================================================
   STEP 4 — Work Location
   ============================================================ */

function WorkLocation({
  setStep,
  payload,
  update,
  statesData,
  availableLgas,
  availableAreas,
  serviceTypes,
}: StepProps) {
  const handleNext = () => {
    const err = validateStep(3, payload);
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <StepWrapper
      step={4}
      title="Where do you provide your services?"
      description="Let us know how you work so we can tailor the booking experience for your clients."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {serviceTypes.map((opt) => {
          const isSelected = payload.service_type === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => update({ service_type: opt.id })}
              className={`flex items-start gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
                isSelected
                  ? "border-primary-c bg-primary-c/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? "border-primary-c bg-primary-c" : "border-gray-300"}`}
              >
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-semibold ${isSelected ? "text-secondary-c" : "text-gray-800"}`}
                >
                  {opt.name}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <motion.div
        key="address-fields"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pt-5">
          <div className="rounded-xl border border-gray-200 p-5 space-y-4 bg-gray-50">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
              Business Address
            </p>
            <Field label="Street address">
              <Input
                placeholder="e.g. 14 Allen Avenue"
                value={payload.address ?? ""}
                onChange={(e) => update({ address: e.target.value })}
              />
            </Field>
            <div className="grid grid-cols-1  gap-4">
              <Field label="State">
                <Select
                  value={payload.state?.toString() ?? ""}
                  onValueChange={(val) =>
                    update({ state: Number(val), local: null, area: null })
                  }
                >
                  <SelectTrigger className="w-full h-10 bg-white border-gray-200 rounded-lg text-sm">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {statesData.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Local government">
                <Select
                  value={payload.local?.toString() ?? ""}
                  onValueChange={(val) =>
                    update({ local: Number(val), area: null })
                  }
                  disabled={!payload.state || availableLgas.length === 0}
                >
                  <SelectTrigger className="w-full h-10 bg-white border-gray-200 rounded-lg text-sm">
                    <SelectValue
                      placeholder={
                        payload.state ? "Select LGA" : "Choose state first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLgas.map((l) => (
                      <SelectItem key={l.id} value={l.id.toString()}>
                        {l.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Area">
                <Select
                  value={payload.area?.toString() ?? ""}
                  onValueChange={(val) => update({ area: Number(val) })}
                  disabled={!payload.local || availableAreas.length === 0}
                >
                  <SelectTrigger className="w-full h-10 bg-white border-gray-200 rounded-lg text-sm">
                    <SelectValue
                      placeholder={
                        payload.local ? "Select area" : "Choose LGA first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAreas.map((a) => (
                      <SelectItem key={a.id} value={a.id.toString()}>
                        {a.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </div>
        </div>
      </motion.div>

      <Nav onNext={handleNext} onBack={() => setStep((s) => s - 1)} />
    </StepWrapper>
  );
}

/* ============================================================
   STEP 5 — Team Size
   ============================================================ */

function TeamSize({ setStep, payload, update }: StepProps) {
  const options = [
    {
      value: "1",
      label: "Just me",
      description: "Solo operator — you handle everything yourself.",
    },
    {
      value: "3",
      label: "2–3 people",
      description: "A small team with a couple of specialists.",
    },
    {
      value: "6",
      label: "4–6 people",
      description: "Mid-size team with diverse services.",
    },
    {
      value: "15",
      label: "More than 6",
      description: "Large operation with a full staff roster.",
    },
  ];

  const handleNext = () => {
    const err = validateStep(4, payload);
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <StepWrapper
      step={5}
      title="How big is your team?"
      description="This helps us tailor tools, calendar views, and recommendations for your business."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => {
          const isSelected = payload.team_size === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => update({ team_size: opt.value })}
              className={`flex items-start gap-4 rounded-xl border p-5 text-left transition-all duration-200 ${
                isSelected
                  ? "border-primary-c bg-primary-c/5"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? "border-primary-c bg-primary-c" : "border-gray-300"}`}
              >
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <div>
                <p
                  className={`text-sm font-semibold ${isSelected ? "text-secondary-c" : "text-gray-800"}`}
                >
                  {opt.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      <Nav onNext={handleNext} onBack={() => setStep((s) => s - 1)} />
    </StepWrapper>
  );
}

/* ============================================================
   STEP 6 — Business Hours
   ============================================================ */

function BusinessHours({ setStep, payload, update }: StepProps) {
  const days = [
    { full: "Sunday", short: "Sun" },
    { full: "Monday", short: "Mon" },
    { full: "Tuesday", short: "Tue" },
    { full: "Wednesday", short: "Wed" },
    { full: "Thursday", short: "Thu" },
    { full: "Friday", short: "Fri" },
    { full: "Saturday", short: "Sat" },
  ];

  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
  });
  const [times, setTimes] = useState<
    Record<string, { start: string; end: string }>
  >({
    Sun: { start: "09:00", end: "17:00" },
    Mon: { start: "09:00", end: "17:00" },
    Tue: { start: "09:00", end: "17:00" },
    Wed: { start: "09:00", end: "17:00" },
    Thu: { start: "09:00", end: "17:00" },
    Fri: { start: "09:00", end: "17:00" },
    Sat: { start: "09:00", end: "17:00" },
  });

  const syncPayload = (
    nextEnabled: Record<string, boolean>,
    nextTimes: Record<string, { start: string; end: string }>,
  ) => {
    const hours = days
      .filter((d) => nextEnabled[d.short])
      .map((d) => ({
        day: d.short,
        start: nextTimes[d.short].start,
        end: nextTimes[d.short].end,
      }));
    update({ business_hours: hours });
  };

  // Populate payload with defaults on mount
  useEffect(() => {
    syncPayload(enabled, times);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = (short: string) => {
    const next = { ...enabled, [short]: !enabled[short] };
    setEnabled(next);
    syncPayload(next, times);
  };

  const handleTime = (short: string, field: "start" | "end", val: string) => {
    const next = { ...times, [short]: { ...times[short], [field]: val } };
    setTimes(next);
    syncPayload(enabled, next);
  };

  const handleNext = () => {
    const err = validateStep(5, payload);
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <StepWrapper
      step={6}
      title="Set your business hours"
      description="Let clients know when you're available for bookings. Toggle days on or off and set opening and closing times."
    >
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        {days.map((day, i) => {
          const isOn = !!enabled[day.short];
          return (
            <div
              key={day.short}
              className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 transition-colors
  ${isOn ? "bg-white" : "bg-gray-50"} 
  ${i !== 0 ? "border-t border-gray-100" : ""}`}
            >
              <div className="flex items-center gap-3 w-full sm:w-36 shrink-0">
                <Checkbox
                  checked={isOn}
                  onCheckedChange={() => handleToggle(day.short)}
                  className={
                    isOn
                      ? "border-primary-c data-[state=checked]:bg-primary-c data-[state=checked]:border-primary-c"
                      : ""
                  }
                />
                <span
                  className={`text-sm font-medium ${isOn ? "text-gray-800" : "text-gray-400"}`}
                >
                  {day.full}
                </span>
              </div>
              {isOn ? (
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:flex-1">
                  <Input
                    type="time"
                    value={times[day.short].start}
                    onChange={(e) =>
                      handleTime(day.short, "start", e.target.value)
                    }
                    className="h-9 text-sm w-full sm:flex-1 border-gray-200 bg-gray-50"
                  />
                  <span className="text-xs text-gray-400 shrink-0">to</span>
                  <Input
                    type="time"
                    value={times[day.short].end}
                    onChange={(e) =>
                      handleTime(day.short, "end", e.target.value)
                    }
                    className="h-9 text-sm w-full sm:flex-1 border-gray-200 bg-gray-50"
                  />
                </div>
              ) : (
                <span className="text-xs text-gray-400 italic">Closed</span>
              )}
            </div>
          );
        })}
      </div>
      <Nav onNext={handleNext} onBack={() => setStep((s) => s - 1)} />
    </StepWrapper>
  );
}

/* ============================================================
   STEP 7 — Services
   ============================================================ */

export function Services({ setStep, payload, update, recurrences }: StepProps) {
  const services = payload.services;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newService, setNewService] = useState<Service>({
    title: "",
    duration: "",
    price: "",
    description: "",
    recurrence: recurrences[0]?.id ?? 1,
  });

  const handleAdd = () => {
    if (!newService.title.trim()) {
      toast.error("Service title is required.");
      return;
    }
    if (!newService.price.trim()) {
      toast.error("Price is required.");
      return;
    }
    if (!newService.duration.trim()) {
      toast.error("Duration is required.");
      return;
    }
    update({ services: [...services, newService] });
    setNewService({
      title: "",
      duration: "",
      price: "",
      description: "",
      recurrence: recurrences[0]?.id ?? 1,
    });
    setDialogOpen(false);
  };

  const handleDelete = (index: number) =>
    update({ services: services.filter((_, i) => i !== index) });

  const handleNext = () => {
    const err = validateStep(6, payload);
    if (err) {
      toast.error(err);
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <StepWrapper
      step={7}
      title="Add your services"
      description="List every service you offer. Clients will choose from this list when booking."
    >
      <div className="space-y-3">
        {services.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-dashed border-gray-200 bg-gray-50 text-center">
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3 text-lg shadow-sm">
              ✂️
            </div>
            <p className="text-sm font-medium text-gray-700">
              No services added yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Add your first service below
            </p>
          </div>
        )}

        <AnimatePresence>
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-between gap-4 px-4 py-3.5 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {service.title}
                </p>
                {service.description && (
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {service.description}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end text-xs text-gray-500 shrink-0">
                {service.price && (
                  <span className="font-semibold text-gray-800 text-sm">
                    ₦{service.price}
                  </span>
                )}
                {service.duration && (
                  <span className="text-gray-400">{service.duration} min</span>
                )}
              </div>
              <button
                onClick={() => handleDelete(i)}
                className="ml-1 w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-colors shrink-0"
              >
                <Trash className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <button
          onClick={() => setDialogOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-primary-c/40 text-primary-c text-sm font-medium hover:bg-primary-c/5 transition-colors"
        >
          <span className="text-base leading-none">+</span> Add a service
        </button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-gray-900">
              Add a new service
            </DialogTitle>
            <p className="text-xs text-gray-400 mt-1">
              Fill in the details for the service you want to offer.
            </p>
          </DialogHeader>
          <div className="space-y-4 mt-1">
            <Field label="Service title *">
              <Input
                value={newService.title}
                onChange={(e) =>
                  setNewService({ ...newService, title: e.target.value })
                }
                placeholder="e.g. Haircut, Facial, Manicure"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Duration (minutes) *">
                <Input
                  type="number"
                  min="1"
                  value={newService.duration}
                  onChange={(e) =>
                    setNewService({ ...newService, duration: e.target.value })
                  }
                  placeholder="e.g. 30"
                />
              </Field>
              <Field label="Price (₦) *">
                <Input
                  type="number"
                  min="0"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({ ...newService, price: e.target.value })
                  }
                  placeholder="e.g. 5000"
                />
              </Field>
            </div>
            <Field label="Description (optional)">
              <Input
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                placeholder="Brief description of the service"
              />
            </Field>
            {recurrences.length > 0 && (
              <Field label="Recurrence">
                <Select
                  value={newService.recurrence.toString()}
                  onValueChange={(val) =>
                    setNewService({ ...newService, recurrence: Number(val) })
                  }
                >
                  <SelectTrigger className="h-10 bg-white border-gray-200 rounded-lg text-sm">
                    <SelectValue placeholder="Select recurrence" />
                  </SelectTrigger>
                  <SelectContent>
                    {recurrences.map((r) => (
                      <SelectItem key={r.id} value={r.id.toString()}>
                        {r.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </div>
          <DialogFooter className="mt-5 gap-2">
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
              className="text-sm rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              className="text-sm rounded-lg bg-primary-c hover:bg-secondary-c text-white border-0 transition-colors"
            >
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Nav onNext={handleNext} onBack={() => setStep((s) => s - 1)} />
    </StepWrapper>
  );
}

/* ============================================================
   STEP 8 — Go Live
   ============================================================ */

function GoLive({
  setStep,
  payload,
  update,
  categories,
  onSubmit,
  submitting,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  payload: RegistrationPayload;
  update: (u: Partial<RegistrationPayload>) => void;
  categories: Category[];
  onSubmit: () => Promise<void>;
  submitting: boolean;
}) {
  const handleFinish = () => {
    const err = validateStep(7, payload);
    if (err) {
      toast.error(err);
      return;
    }
    onSubmit();
  };

  return (
    <StepWrapper
      step={8}
      title="When do you want to go live?"
      description="Choose the date your Hairxify profile becomes visible to clients. You can always update this from your dashboard."
    >
      <div className="grid gap-5">
        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-c/10 flex items-center justify-center shrink-0">
              <span className="text-sm">📅</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Go-live date</p>
              <p className="text-xs text-gray-400">
                Your profile becomes bookable from this date.
              </p>
            </div>
          </div>
          <Input
            type="date"
            value={payload.live_at ? payload.live_at.split("T")[0] : ""}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) =>
              update({ live_at: new Date(e.target.value).toISOString() })
            }
            className="h-10 border-gray-200 bg-gray-50 text-gray-800"
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Setup Summary
          </p>
          <div className="space-y-2">
            {[
              {
                label: "Category",
                value:
                  categories.find((c) => c.id === payload.category)?.name ??
                  "—",
              },
              { label: "Team size", value: payload.team_size || "—" },
              { label: "Services", value: `${payload.services.length} added` },
              {
                label: "Business hours",
                value: `${payload.business_hours.length} days active`,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-gray-500">{row.label}</span>
                <span className="font-medium text-gray-800">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2 space-y-3">
        <Button
          className="w-full h-11 rounded-lg bg-primary-c hover:bg-secondary-c text-white font-semibold text-sm border-0 transition-colors disabled:opacity-60"
          onClick={handleFinish}
          disabled={submitting}
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Creating your profile…
            </span>
          ) : (
            "Finish setup"
          )}
        </Button>
        <button
          className="w-full text-center text-sm text-gray-400 hover:text-gray-700 transition-colors disabled:opacity-40"
          onClick={() => setStep((s) => s - 1)}
          disabled={submitting}
        >
          ← Back
        </button>
      </div>
    </StepWrapper>
  );
}

/* ============================================================
   SUCCESS
   ============================================================ */

function Success() {
  return (
    <div className="max-w-lg mx-auto text-center py-20 space-y-6 px-4">
      <div className="w-16 h-16 rounded-full bg-primary-c/10 border border-primary-c/20 flex items-center justify-center mx-auto text-2xl">
        🎉
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          You&apos;re all set!
        </h1>
        <p className="text-sm text-gray-500">
          Your Hairxify business profile is ready. Check your inbox for a
          confirmation email to verify your account and go live.
        </p>
      </div>

      {/* Checklist */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 text-left space-y-2.5">
        {[
          "Profile created and live",
          "Services configured",
          "Business hours set",
          "Booking page ready",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 text-sm text-gray-700"
          >
            <div className="w-5 h-5 rounded-full bg-primary-c/10 flex items-center justify-center shrink-0">
              <span className="text-[10px] text-primary-c font-bold">✓</span>
            </div>
            {item}
          </div>
        ))}
      </div>

      {/* Email verification nudge */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 flex items-start gap-3 text-left">
        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
          <Mail className="w-4 h-4 text-primary-c" />
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-700">
            Verify your email
          </p>
          <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
            We&apos;ve sent a confirmation link to your inbox. Click it to
            activate your account — check your spam folder if you don&apos;t see
            it.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SHARED PRIMITIVES
   ============================================================ */

function StepWrapper({
  step,
  title,
  description,
  children,
}: {
  step?: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="max-w-2xl mx-auto shadow-sm border-gray-200 rounded-2xl bg-white">
        <CardContent className="p-7 sm:p-9 space-y-6">
          <div className="space-y-1 pb-5 border-b border-gray-100">
            {step != null && (
              <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-c">
                Step {step} of {TOTAL_STEPS}
              </p>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {title}
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              {description}
            </p>
          </div>
          {children}
        </CardContent>
      </Card>
    </motion.div>
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
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </Label>
      {children}
    </div>
  );
}

function Nav({
  onNext,
  onBack,
  hideBack,
}: {
  onNext: () => void;
  onBack?: () => void;
  hideBack?: boolean;
}) {
  return (
    <div
      className={`flex ${hideBack ? "justify-end" : "justify-between"} pt-2`}
    >
      {!hideBack && (
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          ← Back
        </button>
      )}
      <Button
        onClick={onNext}
        className="px-6 h-9 rounded-lg bg-primary-c hover:bg-secondary-c text-white font-semibold text-sm border-0 transition-colors"
      >
        Continue →
      </Button>
    </div>
  );
}
