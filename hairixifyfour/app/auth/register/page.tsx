"use client";
import { Button } from "@/components/ui/button";

import React, { Dispatch, useState } from "react";

export default function Page() {
  const [step, setStep] = useState(0);
  return (
    <div className="py-[40px]">
      {step === 0 && <StageZero setStep={setStep} />}
      {step === 1 && <StageOne setStep={setStep} />}
    </div>
  );
}

function StageZero({
  setStep,
}: {
  setStep: Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">
          Easy Way to Promote Your Business
        </h1>
        <p className="text-gray-600">
          Are you a stylist or beautician looking for a convenient way to
          connect with a vast customer base? Look no further than{" "}
          <strong>Hairxify</strong>.
        </p>
        <p className="text-gray-600">
          By registering with us, you can effortlessly reach thousands of
          potential customers who visit our platform every month.
        </p>
      </section>

      {/* Why Hairxify */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">
          Why Hairxify Is Perfect for You
        </h2>

        {/* Marketplace */}
        <div className="space-y-2">
          <h3 className="text-xl font-medium">1. Marketplace Section</h3>
          <p className="text-gray-600">
            Showcase and sell your beautician and stylist products effortlessly.
            Hairxify provides a dedicated marketplace where you can reach
            interested buyers and grow your business with ease.
          </p>
        </div>

        {/* Stylist Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">2. Stylist Section</h3>
          <p className="text-gray-600">
            A powerful platform connecting beauty and wellness professionals
            with new clients — including stylists, hairdressers, barbers, makeup
            artists, and wellness experts.
          </p>

          <ul className="list-disc pl-6 space-y-3 text-gray-600">
            <li>
              <strong>Discover New Clients:</strong> Connect with users actively
              searching for beauty and wellness services like yours.
            </li>
            <li>
              <strong>Simplified Scheduling & Booking:</strong> Manage your
              availability, appointments, and bookings seamlessly in one place.
            </li>
            <li>
              <strong>Professional Networking:</strong> Collaborate, learn, and
              grow with a community of like-minded professionals in your field.
            </li>
          </ul>
        </div>

        {/* Jobs */}
        <div className="space-y-2">
          <h3 className="text-xl font-medium">3. Find Jobs Section</h3>
          <p className="text-gray-600">
            Post job vacancies and recruit talent instantly. Save time and find
            the perfect candidates quickly and efficiently.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-6 border-t">
        <p className="text-lg font-medium mb-4">
          Ready to take your business to new heights?
        </p>
        <Button onClick={() => setStep(1)}>
          Let’s Get You Started on Hairxify
        </Button>
      </section>
    </div>
  );
}

function StageOne({
  setStep,
}: {
  setStep: Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">
          Tell Us More About Your Business
        </h1>
        <p className="text-gray-600">
          This helps us personalize your experience on Hairxify.
        </p>
      </section>

      {/* Form */}
      <section className="space-y-6">
        {/* Business Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Business Name</label>
          <input
            type="text"
            placeholder="e.g. Glow Touch Salon"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* First Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <input
            type="text"
            placeholder="Your first name"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <input
            type="text"
            placeholder="Your last name"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </section>

      {/* Actions */}
      <section className="flex items-center justify-between pt-6 border-t">
        <Button variant="ghost" onClick={() => setStep(0)}>
          Previous Step
        </Button>

        <Button onClick={() => setStep(2)}>Next</Button>
      </section>
    </div>
  );
}
