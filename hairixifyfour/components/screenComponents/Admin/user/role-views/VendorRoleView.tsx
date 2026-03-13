"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/user/role-views/VendorRoleView.tsx
// ─────────────────────────────────────────────

import { AlertTriangle, CheckCircle, Package, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InfoCard } from "../InfoCard";
import { ProductStatus, User, UserRole } from "../types";

interface VendorRoleViewProps {
  user: User;
  onAction: (
    userId: string,
    action: "block_role" | "unblock_role",
    role: UserRole,
  ) => void;
}

const PRODUCT_STATUS_CONFIG: Record<
  ProductStatus,
  { style: string; label: string }
> = {
  active: {
    style: "bg-emerald-50 text-emerald-700 border-emerald-200",
    label: "Active",
  },
  out_of_stock: {
    style: "bg-rose-50 text-rose-700 border-rose-200",
    label: "Out of Stock",
  },
  paused: {
    style: "bg-amber-50 text-amber-700 border-amber-200",
    label: "Paused",
  },
};

export function VendorRoleView({ user, onAction }: VendorRoleViewProps) {
  const v = user.vendor;
  if (!v) return null;

  const isBlocked = user.blockedRoles.includes("vendor");

  const BlockBtn = (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        onAction(user.id, isBlocked ? "unblock_role" : "block_role", "vendor")
      }
      className={
        isBlocked
          ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          : "border-rose-200 text-rose-600 hover:bg-rose-50"
      }
    >
      {isBlocked ? (
        <CheckCircle size={13} className="mr-1.5" />
      ) : (
        <ShieldOff size={13} className="mr-1.5" />
      )}
      {isBlocked ? "Restore Role" : "Block Role"}
    </Button>
  );

  const overviewStats = [
    { label: "Store", value: v.storeName },
    { label: "Category", value: v.category },
    { label: "Total Sales", value: v.totalSales.toLocaleString() },
    { label: "Rating", value: `${v.rating} ★` },
  ];

  return (
    <div className="space-y-4">
      {/* Overview */}
      <InfoCard title="Vendor Profile" subtitle={v.category} action={BlockBtn}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {overviewStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-[11px] text-t-secondary mb-1">{stat.label}</p>
              <p className="text-sm font-medium text-t-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Products */}
      <InfoCard title="Products" subtitle={`${v.products.length} listed`}>
        <div className="space-y-2">
          {v.products.map((product) => {
            const config = PRODUCT_STATUS_CONFIG[product.status];
            return (
              <div
                key={product.id}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-50 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <Package size={13} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-t-primary font-medium">
                      {product.name}
                    </p>
                    <p className="text-xs text-t-secondary mt-0.5">
                      {product.stock > 0 ? (
                        `${product.stock} in stock`
                      ) : (
                        <span className="flex items-center gap-1 text-rose-500">
                          <AlertTriangle size={10} />
                          Out of stock
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-t-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[11px] ${config.style}`}
                  >
                    {config.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </InfoCard>
    </div>
  );
}
