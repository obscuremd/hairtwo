import { ItemType } from "@/app/dashboard/transactions/page";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Clock, Calendar } from "lucide-react";
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
    success: "border-l-green-500 bg-green-500/10 text-green-600",
    pending: "border-l-yellow-500 bg-yellow-500/10 text-yellow-600",
    failed: "border-l-red-500 bg-red-500/10 text-red-600",
    active: "border-l-blue-500 bg-blue-500/10 text-blue-600",
    default: "border-l-[#003225] bg-[#003225]/10 text-[#003225]",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      {onCreate && (
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#003225]">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((item) => {
          const statusClass =
            statusStyles[item.status as keyof typeof statusStyles] ||
            statusStyles.default;

          return (
            <div
              key={item.id}
              onClick={() => onItemClick(item)}
              className={`group border-l-2 ${statusClass.split(" ")[0]} 
                         rounded-md p-4 shadow-sm hover:shadow-md
                         transition-all duration-200 cursor-pointer bg-white`}
            >
              <div className="flex items-start gap-4">
                {/* Left Icon Indicator */}
                <div
                  className={`p-2 rounded-md shrink-0 ${
                    statusClass.split(" ")[1]
                  }`}
                >
                  <Clock className="w-4 h-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm text-[#003225] leading-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {item.description}
                      </p>
                    </div>

                    {item.status && <StatusBadge status={item.status} />}
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    {item.price && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-700">
                          {item.price}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Updated Recently</span>
                    </div>
                  </div>
                </div>

                {/* Edit Icon */}
                <Pencil
                  className="w-4 h-4 text-muted-foreground 
                             opacity-0 group-hover:opacity-100 
                             transition-opacity shrink-0 mt-1"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
