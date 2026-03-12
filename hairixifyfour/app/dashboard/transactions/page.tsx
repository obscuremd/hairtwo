"use client";

import { useCallback, useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { DollarSign, RefreshCw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ServiceListSection } from "@/components/screenComponents/Dashboard/checkout/ServiceListSection";
import { GetProviderServices } from "@/utils/services";
import { GetBookedSlots } from "@/utils/booking";
import { UseGen } from "@/context/GeneralContext";

const TRANSACTION_STATUS: Record<string, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending: "bg-sky-50 text-sky-700 border-sky-200",
  cancelled: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function CheckoutPage() {
  const { authProvider } = UseGen();
  const providerId = String(authProvider?.id ?? "");

  const [groups, setGroups] = useState<ServiceGroup[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);

  const loadServices = useCallback(async () => {
    setServicesLoading(true);
    setServicesError(null);
    const result = await GetProviderServices();
    if (result.success && result.groups) {
      setGroups(result.groups);
    } else {
      setServicesError(result.message);
    }
    setServicesLoading(false);
  }, []);

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null,
  );

  const loadTransactions = useCallback(async () => {
    if (!providerId) return;
    setTransactionsLoading(true);
    setTransactionsError(null);
    const result = await GetBookedSlots(new Date());
    if (result.success && result.bookings) {
      setBookings(
        [...result.bookings].sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        ),
      );
    } else {
      setTransactionsError(result.message);
    }
    setTransactionsLoading(false);
  }, [providerId]);

  useEffect(() => {
    loadServices();
    loadTransactions();
  }, [loadServices, loadTransactions]);

  const allServices = groups.flatMap((g) => g.services);
  const activeServices = allServices.filter((s) => s.status !== "inactive");

  return (
    <div className="w-full space-y-10 min-h-screen">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex size-12 items-center justify-center rounded-full border p-3">
            <DollarSign className="size-6 text-t-secondary" />
          </div>
          <p className="text-3xl font-semibold tracking-tight">Transactions</p>
        </div>
        <p className="text-sm text-gray-500 max-w-2xl">
          Manage your salon operations in one place. Track services offered and
          monitor transaction history.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <StatItem
          label="Services"
          value={servicesLoading ? "—" : String(activeServices.length)}
          subtext="Active offerings"
        />
        <StatItem
          label="Transactions"
          value={transactionsLoading ? "—" : String(bookings.length)}
          subtext="This month"
        />
        <StatItem
          label="Confirmed"
          value={
            transactionsLoading
              ? "—"
              : String(
                  bookings.filter(
                    (b) =>
                      b.status === "upcoming" ||
                      b.status === "success" ||
                      b.status === "ongoing",
                  ).length,
                )
          }
          subtext="Bookings"
        />
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="inline-flex bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm">
          <TabsTrigger
            value="services"
            className="px-5 py-2 text-sm font-medium rounded-lg text-gray-600 data-[state=active]:bg-[#003225] data-[state=active]:text-white transition-all"
          >
            Services
          </TabsTrigger>
          <TabsTrigger
            value="transactions"
            className="px-5 py-2 text-sm font-medium rounded-lg text-gray-600 data-[state=active]:bg-[#003225] data-[state=active]:text-white transition-all"
          >
            Transactions
          </TabsTrigger>
        </TabsList>

        {/* Services tab */}
        <TabsContent value="services" className="pt-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#003225]">
              Available Services
            </h2>
            <p className="text-sm text-gray-500">
              Create and manage the services your salon offers, including
              pricing and descriptions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            {servicesLoading ? (
              <ServicesSkeleton />
            ) : servicesError ? (
              <ErrorState message={servicesError} onRetry={loadServices} />
            ) : allServices.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No services configured yet.
              </p>
            ) : (
              <ServiceListSection
                data={allServices}
                onCreate={() => console.log("Create service")}
                createLabel="New Service"
              />
            )}
          </div>
        </TabsContent>

        {/* Transactions tab */}
        <TabsContent value="transactions" className="pt-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#003225]">
              Transaction History
            </h2>
            <p className="text-sm text-gray-500">
              Monitor booking activity, review confirmed appointments, and track
              pending or cancelled bookings.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            {transactionsLoading ? (
              <TransactionsSkeleton />
            ) : transactionsError ? (
              <ErrorState
                message={transactionsError}
                onRetry={loadTransactions}
              />
            ) : bookings.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No transactions yet.
              </p>
            ) : (
              <ScrollArea className="h-[480px] pr-2">
                <div className="space-y-2">
                  {bookings.map((b) => {
                    // b.service is IService — access what we stored on it during normalisation
                    // We only have id, name, href from IService. Price lives on the raw BookedSlot
                    // which we don't carry through, so we omit price here to avoid the type error.
                    const rawStatus = b.status as string;
                    return (
                      <div
                        key={b.id}
                        className="flex items-center justify-between gap-4 rounded-lg border px-4 py-3 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="font-medium truncate">{b.title}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {b.user.name}
                            {b.user.email ? ` · ${b.user.email}` : ""}
                          </p>
                          <p className="text-xs text-muted-foreground tabular-nums mt-0.5">
                            {format(
                              parseISO(b.startDate),
                              "MMM d, yyyy · HH:mm",
                            )}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <Badge
                            variant="outline"
                            className={`text-[10px] capitalize ${TRANSACTION_STATUS[rawStatus] ?? ""}`}
                          >
                            {rawStatus}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatItem({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string;
  subtext: string;
}) {
  return (
    <div className="shadow-sm py-2 px-4 rounded-md flex items-center gap-4">
      <div className="h-9 w-9 rounded-md bg-[#3ad688]/10 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-[#3ad688]" />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#003225]">{value}</p>
        <p className="text-xs text-gray-500">
          {label} · {subtext}
        </p>
      </div>
    </div>
  );
}

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-muted-foreground text-sm">
      <p>{message}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        <RefreshCw className="size-3.5 mr-1.5" /> Retry
      </Button>
    </div>
  );
}

function ServicesSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-4 border-b last:border-0"
        >
          <div className="space-y-2 w-2/3">
            <Skeleton className="h-4 w-48 rounded" />
            <Skeleton className="h-3 w-full rounded" />
          </div>
          <div className="space-y-2 flex flex-col items-end">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-8 w-16 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TransactionsSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border px-4 py-3 gap-4"
        >
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-40 rounded" />
            <Skeleton className="h-3 w-56 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
          <div className="space-y-1.5 flex flex-col items-end">
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
