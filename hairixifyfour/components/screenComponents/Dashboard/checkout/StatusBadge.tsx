import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StatusBadge({
  status,
}: {
  status: "success" | "pending" | "failed" | "active";
}) {
  const styles = {
    success: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    active: "bg-blue-100 text-blue-700",
  };

  return (
    <Badge variant="secondary" className={cn("capitalize", styles[status])}>
      {status}
    </Badge>
  );
}
