import { ItemType } from "@/app/dashboard/checkout/page";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export function ListSection({
  data,
  onItemClick,
  onCreate,
  createLabel = "Create New",
}: {
  data: ItemType[];
  onItemClick: (item: ItemType) => void;
  onCreate?: () => void;
  createLabel?: string;
}) {
  const statusStyles: Record<string, string> = {
    success: "bg-green-500",
    pending: "bg-yellow-500",
    failed: "bg-red-500",
    active: "bg-blue-500",
    default: "bg-[#003225]",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      {onCreate && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Manage Items
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              View and update records below.
            </p>
          </div>

          <Button onClick={onCreate}>
            <Plus className="w-4 h-4 mr-2" />
            {createLabel}
          </Button>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {data.map((item) => {
          const statusColor =
            statusStyles[item.status as keyof typeof statusStyles] ||
            statusStyles.default;
          return (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              className="group relative flex items-center justify-between 
                       bg-background border rounded-xl p-5
                       transition-all duration-200
                       hover:shadow-md hover:border-primary/40
                       cursor-pointer"
            >
              {/* Left Status Indicator */}
              <div
                className={`absolute left-0 top-[15%] h-[70%] w-1 rounded-3xl ${
                  statusColor
                }`}
              />

              {/* Content */}
              <div className="flex-1 min-w-0 pl-2 space-y-1">
                <h3
                  className="text-base font-semibold leading-tight 
                             group-hover:text-primary transition-colors"
                >
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground truncate max-w-lg">
                  {item.description}
                </p>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-6 ml-6">
                {item.price && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-semibold">{item.price}</p>
                  </div>
                )}

                {item.status && <StatusBadge status={item.status} />}

                <Pencil
                  className="w-4 h-4 text-muted-foreground 
                           opacity-0 group-hover:opacity-100 
                           transition-opacity"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
