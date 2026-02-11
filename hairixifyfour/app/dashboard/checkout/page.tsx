"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { ListSection } from "@/components/screenComponents/Dashboard/checkout/ListSection";

export type ItemType = {
  id: number;
  title: string;
  description: string;
  status?: "success" | "pending" | "failed" | "active";
  price?: string;
};

export default function CheckoutPage() {
  const [activeItem, setActiveItem] = useState<ItemType | null>(null);
  const [open, setOpen] = useState(false);

  const services: ItemType[] = [
    {
      id: 1,
      title: "Haircut",
      description: "Professional haircut service",
      price: "$40",
    },
    {
      id: 2,
      title: "Hair Coloring",
      description: "Premium coloring treatment",
      price: "$85",
    },
  ];

  const transactions: ItemType[] = [
    {
      id: 1,
      title: "Order #1023",
      description: "Haircut payment",
      status: "success",
    },
    {
      id: 2,
      title: "Order #1024",
      description: "Hair Coloring",
      status: "pending",
    },
    { id: 3, title: "Order #1025", description: "Haircut", status: "failed" },
  ];

  const sales: ItemType[] = [
    {
      id: 1,
      title: "Booking #302",
      description: "Haircut appointment",
      status: "active",
    },
    {
      id: 2,
      title: "Booking #303",
      description: "Hair Coloring",
      status: "success",
    },
    { id: 3, title: "Booking #304", description: "Haircut", status: "failed" },
  ];

  function openSheet(item: ItemType) {
    setActiveItem(item);
    setOpen(true);
  }

  return (
    <div className="w-full p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Checkout</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage services, monitor transactions, and track sales activity.
        </p>
      </div>

      <Tabs defaultValue="services" className="w-full">
        {/* ---------- TABS HEADER ---------- */}
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 gap-8">
          <TabsTrigger value="services" className="pb-3">
            Services
          </TabsTrigger>
          <TabsTrigger value="transactions" className="pb-3">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="sales" className="pb-3">
            Sales
          </TabsTrigger>
        </TabsList>

        {/* ---------- SERVICES ---------- */}
        <TabsContent value="services" className="pt-6">
          <ListSection
            data={services}
            onItemClick={openSheet}
            onCreate={() => console.log("Create service")}
            createLabel="New Service"
          />
        </TabsContent>

        {/* ---------- TRANSACTIONS ---------- */}
        <TabsContent value="transactions" className="pt-6">
          <ListSection data={transactions} onItemClick={openSheet} />
        </TabsContent>

        {/* ---------- SALES ---------- */}
        <TabsContent value="sales" className="pt-6">
          <ListSection data={sales} onItemClick={openSheet} />
        </TabsContent>
      </Tabs>

      {/* ---------- RIGHT SHEET ---------- */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="space-y-1">
            <SheetTitle className="text-xl font-semibold">
              {activeItem?.title}
            </SheetTitle>
            <p className="text-sm text-muted-foreground">
              Make changes to your item here. Click save when you&apos;re done.
            </p>
          </SheetHeader>

          <SheetDescription className="px-5">
            {activeItem && (
              <form className="space-y-6 mt-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Title
                    </label>
                    <Input
                      id="title"
                      defaultValue={activeItem.title}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      defaultValue={activeItem.description}
                      className="min-h-[120px] resize-none"
                      placeholder="Enter a description..."
                    />
                  </div>

                  {activeItem.price && (
                    <div className="space-y-2">
                      <label
                        htmlFor="price"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="price"
                          defaultValue={activeItem.price}
                          className="h-10 pl-7"
                          type="number"
                          step="0.01"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Save Changes
                  </Button>
                </div>
              </form>
            )}
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
}
