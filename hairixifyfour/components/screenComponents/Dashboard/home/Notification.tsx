import { Bell, Package, Clock, User } from "iconoir-react";
import { AlertTriangle, TrendingUp } from "lucide-react";

export default function Notification() {
  const notifications = [
    {
      id: 1,
      primary_text: "Low Stock Alert",
      secondary_text: "3 products are running low on inventory",
      number: 3,
      icon: Package,
      variant: "warning" as const,
    },
    {
      id: 2,
      primary_text: "Pending Orders",
      secondary_text: "12 orders awaiting processing",
      number: 12,
      icon: Clock,
      variant: "info" as const,
    },
    {
      id: 3,
      primary_text: "Critical Issues",
      secondary_text: "2 urgent items require immediate action",
      number: 2,
      icon: AlertTriangle,
      variant: "error" as const,
    },
    {
      id: 4,
      primary_text: "New Customers",
      secondary_text: "8 new customer registrations today",
      number: 8,
      icon: User,
      variant: "success" as const,
    },
    {
      id: 5,
      primary_text: "Sales Growth",
      secondary_text: "Revenue increased by 15% this week",
      number: 15,
      icon: TrendingUp,
      variant: "success" as const,
    },
  ];

  return (
    <div className="flex flex-col bg-white border border-[#e6e3d6] p-6 rounded-xl shadow-sm h-[40vh]">
      {/* Header - Fixed */}
      <div className="flex items-start justify-between mb-5 pb-4 border-b border-[#e6e3d6] shrink-0">
        <div>
          <h1 className="text-xl font-bold text-[#003225] mb-1">
            Good Afternoon, User
          </h1>
          <p className="text-gray-500 text-xs">
            {notifications.length} items need attention
          </p>
        </div>
        <div className="bg-[#e6e3d6]/50 p-2 rounded-lg">
          <Bell className="w-5 h-5 text-[#003225]" strokeWidth={2} />
        </div>
      </div>

      {/* Notifications List - Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-[#e6e3d6] scrollbar-track-transparent">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            primary_text={notification.primary_text}
            secondary_text={notification.secondary_text}
            number={notification.number}
            icon={notification.icon}
            variant={notification.variant}
          />
        ))}
      </div>
    </div>
  );
}

function NotificationCard({
  primary_text,
  secondary_text,
  number,
  icon: Icon,
  variant = "info",
}: {
  primary_text: string;
  secondary_text: string;
  number: number;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  variant?: "info" | "warning" | "error" | "success";
}) {
  const variantStyles = {
    info: "border-l-[#003225]",
    warning: "border-l-amber-500",
    error: "border-l-red-500",
    success: "border-l-[#3ad688]",
  };

  const iconBgStyles = {
    info: "bg-[#003225]/5",
    warning: "bg-amber-50",
    error: "bg-red-50",
    success: "bg-[#3ad688]/10",
  };

  const iconStyles = {
    info: "text-[#003225]",
    warning: "text-amber-600",
    error: "text-red-600",
    success: "text-[#3ad688]",
  };

  return (
    <div
      className={`border-l-2 ${variantStyles[variant]} rounded-md p-3 transition-all shadow-sm hover:shadow-md cursor-pointer group`}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div
            className={`${iconBgStyles[variant]} ${iconStyles[variant]} p-2 rounded-md shrink-0`}
          >
            <Icon className="w-4 h-4" strokeWidth={2} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-sm text-[#003225] leading-tight">
              {primary_text}
            </h3>
            <span className="text-[#003225] text-xs font-semibold bg-white px-2 py-0.5 rounded-full shrink-0 border border-[#e6e3d6]">
              {number}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
            {secondary_text}
          </p>
        </div>
      </div>
    </div>
  );
}
