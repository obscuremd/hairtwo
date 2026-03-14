"use client";

// ─────────────────────────────────────────────
// components/screenComponents/Admin/site-editor/components/fields/ListField.tsx
//
// Renders a "list" type field — an ordered array of
// repeated items, each with its own sub-fields.
// Supports nested lists (e.g. categories with sub-categories).
// ─────────────────────────────────────────────

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldRenderer } from "./FieldRenderer";
import { cn } from "@/lib/utils";
import { FieldDef, FieldValue, ListItemValue } from "./types";

interface ListFieldProps {
  field: FieldDef;
  value: ListItemValue[];
  onChange: (value: ListItemValue[]) => void;
  depth?: number; // for nested lists
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function getItemSummary(item: ListItemValue, subFields: FieldDef[]): string {
  // Try to find a "name" or "label" or "title" field to use as summary
  const summaryKey = ["name", "label", "title", "headline"].find(
    (k) => subFields.some((f) => f.key === k) && item[k],
  );
  return summaryKey ? String(item[summaryKey]) : "Untitled item";
}

export function ListField({
  field,
  value = [],
  onChange,
  depth = 0,
}: ListFieldProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const subFields = field.itemFields ?? [];
  const itemLabel = field.itemLabel ?? "Item";

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addItem = () => {
    const newItem: ListItemValue = { id: generateId() };
    // Default booleans to false
    subFields.forEach((f) => {
      if (f.type === "boolean") newItem[f.key] = true;
      if (f.type === "list") newItem[f.key] = [];
    });
    const updated = [...value, newItem];
    onChange(updated);
    setExpandedIds((prev) => new Set([...prev, newItem.id]));
  };

  const removeItem = (id: string) => {
    onChange(value.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, key: string, val: FieldValue) => {
    onChange(
      value.map((item) => (item.id === id ? { ...item, [key]: val } : item)),
    );
  };

  const isNested = depth > 0;

  return (
    <div className={cn("space-y-2", isNested && "pl-1")}>
      {value.length === 0 && (
        <div className="py-6 text-center rounded-lg border-2 border-dashed border-gray-100 text-gray-400 text-sm">
          No {itemLabel.toLowerCase()}s yet. Add one below.
        </div>
      )}

      {value.map((item, index) => {
        const isOpen = expandedIds.has(item.id);
        const summary = getItemSummary(item, subFields);

        return (
          <div
            key={item.id}
            className={cn(
              "rounded-lg border transition-all",
              isOpen
                ? "border-primary-c/20 bg-primary-c/2"
                : "border-gray-100 bg-gray-50/50 hover:border-gray-200",
            )}
          >
            {/* Item header */}
            <div
              className="flex items-center gap-2 px-3 py-2.5 cursor-pointer select-none"
              onClick={() => toggleExpanded(item.id)}
            >
              <GripVertical size={14} className="text-gray-300 shrink-0" />
              <span className="text-xs font-medium text-gray-400 w-5 shrink-0">
                {index + 1}
              </span>
              <span className="flex-1 text-sm text-t-primary truncate">
                {summary}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.id);
                }}
                className="p-1 rounded hover:bg-rose-50 text-gray-300 hover:text-rose-500 transition-colors shrink-0"
                aria-label={`Remove ${itemLabel}`}
              >
                <Trash2 size={13} />
              </button>
              {isOpen ? (
                <ChevronDown size={14} className="text-gray-400 shrink-0" />
              ) : (
                <ChevronRight size={14} className="text-gray-400 shrink-0" />
              )}
            </div>

            {/* Item sub-fields */}
            {isOpen && (
              <div className="px-4 pb-4 pt-1 space-y-4 border-t border-gray-100">
                {subFields.map((subField) => {
                  const subVal =
                    item[subField.key] ??
                    (subField.type === "boolean"
                      ? false
                      : subField.type === "list"
                        ? []
                        : "");

                  if (subField.type === "list") {
                    return (
                      <div key={subField.key} className="space-y-2">
                        <p className="text-sm font-medium text-t-primary">
                          {subField.label}
                          {subField.required && (
                            <span className="text-rose-500 ml-0.5">*</span>
                          )}
                        </p>
                        {subField.hint && (
                          <p className="text-xs text-t-secondary">
                            {subField.hint}
                          </p>
                        )}
                        <ListField
                          field={subField}
                          value={(subVal as ListItemValue[]) ?? []}
                          onChange={(v) => updateItem(item.id, subField.key, v)}
                          depth={depth + 1}
                        />
                      </div>
                    );
                  }

                  return (
                    <FieldRenderer
                      key={subField.key}
                      field={subField}
                      value={subVal as FieldValue}
                      onChange={(v) => updateItem(item.id, subField.key, v)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addItem}
        className="w-full border-dashed border-gray-200 text-gray-500 hover:text-primary-c hover:border-primary-c/40 hover:bg-primary-c/3 transition-all"
      >
        <Plus size={14} className="mr-1.5" />
        Add {itemLabel}
      </Button>
    </div>
  );
}
