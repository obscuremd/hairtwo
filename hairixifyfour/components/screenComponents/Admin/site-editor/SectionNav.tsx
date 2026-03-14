"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/site-editor/components/sections/SectionNav.tsx
//
// Left-panel navigation. Shows sections grouped by page/area.
// Each section shows a dirty indicator and publish status.
// ─────────────────────────────────────────────

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Circle,
  LayoutTemplate,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { EditorSectionStates, SectionDef } from "./types";
import { GROUP_ORDER, SECTIONS_BY_GROUP } from "./sections";

interface SectionNavProps {
  activeSectionId: string;
  onSelect: (sectionId: string) => void;
  sectionStates: EditorSectionStates;
  dirtyIds: Set<string>;
}

// Safely get a Lucide icon by name
function SectionIcon({ name, size = 15 }: { name: string; size?: number }) {
  const Icon = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ size?: number; className?: string }>
    >
  )[name];
  if (!Icon) return <LayoutTemplate size={size} className="text-t-secondary" />;
  return <Icon size={size} className="text-t-secondary" />;
}

export function SectionNav({
  activeSectionId,
  onSelect,
  sectionStates,
  dirtyIds,
}: SectionNavProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set(),
  );

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  // All groups including any not in GROUP_ORDER
  const allGroups = [
    ...GROUP_ORDER,
    ...Object.keys(SECTIONS_BY_GROUP).filter((g) => !GROUP_ORDER.includes(g)),
  ];

  return (
    <nav className="h-full overflow-y-auto px-3 py-4 space-y-1">
      {allGroups.map((group) => {
        const sections = SECTIONS_BY_GROUP[group];
        if (!sections?.length) return null;
        const isCollapsed = collapsedGroups.has(group);

        return (
          <div key={group} className="space-y-0.5">
            {/* Group header */}
            <button
              onClick={() => toggleGroup(group)}
              className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-100 transition-colors text-left group"
            >
              <span className="flex-1 text-[11px] font-semibold uppercase tracking-widest text-gray-400 group-hover:text-gray-500">
                {group}
              </span>
              {isCollapsed ? (
                <ChevronRight size={13} className="text-gray-300" />
              ) : (
                <ChevronDown size={13} className="text-gray-300" />
              )}
            </button>

            {/* Section rows */}
            {!isCollapsed && (
              <div className="space-y-0.5 pl-1">
                {sections.map((section) => (
                  <SectionNavItem
                    key={section.id}
                    section={section}
                    isActive={activeSectionId === section.id}
                    isDirty={dirtyIds.has(section.id)}
                    status={sectionStates[section.id]?.status ?? "published"}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ─── Individual section row ───────────────────

interface SectionNavItemProps {
  section: SectionDef;
  isActive: boolean;
  isDirty: boolean;
  status: "published" | "draft" | "modified";
  onSelect: (id: string) => void;
}

function SectionNavItem({
  section,
  isActive,
  isDirty,
  status,
  onSelect,
}: SectionNavItemProps) {
  return (
    <button
      onClick={() => onSelect(section.id)}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all",
        isActive
          ? "bg-primary-c/8 border border-primary-c/15"
          : "hover:bg-gray-50 border border-transparent",
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors",
          isActive ? "bg-primary-c/15" : "bg-gray-100",
        )}
      >
        <SectionIcon name={section.icon} size={14} />
      </div>

      {/* Label */}
      <span
        className={cn(
          "flex-1 text-sm truncate transition-colors",
          isActive ? "font-medium text-primary-c" : "text-t-primary",
        )}
      >
        {section.label}
      </span>

      {/* Dirty indicator */}
      {isDirty && (
        <Circle size={7} className="fill-sky-500 text-sky-500 shrink-0" />
      )}

      {/* Draft badge */}
      {!isDirty && status === "draft" && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-medium shrink-0">
          Draft
        </span>
      )}
    </button>
  );
}
