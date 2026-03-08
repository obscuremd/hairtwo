export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function Avatar({
  name,
  size = "sm",
}: {
  name: string;
  size?: "sm" | "md";
}) {
  const initials = getInitials(name);
  const dim = size === "sm" ? "size-8 text-xs" : "size-12 text-base";
  return (
    <div
      className={`${dim} rounded-full bg-[#3ad688] text-[#003226] font-bold flex items-center justify-center shrink-0`}
    >
      {initials}
    </div>
  );
}
