// ─────────────────────────────────────────────
// components/screenComponents/Admin/site-editor/types.ts
//
// Config-driven field system. To add a new editable
// section to the CMS, add an entry to SITE_SECTIONS_CONFIG
// with the fields it exposes. No new components needed.
// ─────────────────────────────────────────────

// ─── Field definitions ───────────────────────

export type FieldType =
  | "text"         // single-line input
  | "textarea"     // multi-line
  | "richtext"     // formatted text (rendered as textarea for now)
  | "image"        // image URL + upload
  | "url"          // link input with validation hint
  | "color"        // color picker
  | "boolean"      // toggle switch
  | "select"       // dropdown from options
  | "icon"         // icon picker (Lucide name)
  | "list"         // ordered list of repeated items (each item has its own sub-fields)
  | "number";      // numeric input

export interface SelectOption {
  label: string;
  value: string;
}

// Base field definition
export interface FieldDef {
  key: string;             // unique key within section, used as form field name
  label: string;           // display label
  type: FieldType;
  placeholder?: string;
  hint?: string;           // helper text shown below the field
  required?: boolean;
  options?: SelectOption[]; // for select fields
  itemFields?: FieldDef[];  // for list fields — defines sub-fields per list item
  itemLabel?: string;       // for list fields — label for each item (e.g. "Category")
}

// ─── Section definitions ─────────────────────

export type SectionStatus = "published" | "draft" | "modified";

export interface SectionDef {
  id: string;
  label: string;            // display name, e.g. "Hero Section"
  description: string;      // short description of what this controls
  icon: string;             // Lucide icon name
  group: string;            // grouping in the sidebar (e.g. "Pages", "Global")
  fields: FieldDef[];
}

// ─── Runtime values ───────────────────────────
// The actual stored data. Keyed by section id, then field key.
// List fields store an array of records.

export type FieldValue = string | boolean | number | ListItemValue[];

export interface ListItemValue {
  id: string;   // client-generated uuid
  [key: string]: FieldValue;
}

// Map of sectionId -> { fieldKey -> FieldValue }
export type SiteEditorData = Record<string, Record<string, FieldValue>>;

// ─── Editor state ────────────────────────────

export interface SectionState {
  status: SectionStatus;
  lastSaved?: string; // ISO timestamp
  isDirty: boolean;
}

// Map of sectionId -> SectionState
export type EditorSectionStates = Record<string, SectionState>;

// ─── Save payload — what gets sent to the API ─

export interface SaveSectionPayload {
  sectionId: string;
  data: Record<string, FieldValue>;
}
