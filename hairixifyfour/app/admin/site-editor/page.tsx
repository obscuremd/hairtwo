"use client";

// ─────────────────────────────────────────────
// app/admin/site-editor/page.tsx
//   OR
// components/screenComponents/Admin/site-editor/SiteEditorPage.tsx
//
// Two-panel CMS editor:
//   Desktop — left sidebar nav + right field editor
//   Mobile  — full-screen editor with a slide-over drawer for section nav
//
// API integration points are marked with TODO comments.
// ─────────────────────────────────────────────

import { useCallback, useState } from "react";
import {
  AlertCircle,
  LayoutTemplate,
  Menu,
  Save,
  X,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_SITE_DATA } from "@/components/screenComponents/Admin/site-editor/mockSiteData";
import {
  EditorSectionStates,
  FieldValue,
  SiteEditorData,
} from "@/components/screenComponents/Admin/site-editor/types";
import {
  SECTION_BY_ID,
  SITE_SECTIONS,
} from "@/components/screenComponents/Admin/site-editor/sections";
import { SectionNav } from "@/components/screenComponents/Admin/site-editor/SectionNav";
import {
  SectionEditor,
  SectionEditorSkeleton,
} from "@/components/screenComponents/Admin/site-editor/SectionEditor";

function buildInitialStates(): EditorSectionStates {
  return Object.fromEntries(
    SITE_SECTIONS.map((s) => [
      s.id,
      {
        status: "published" as const,
        isDirty: false,
        lastSaved: new Date().toISOString(),
      },
    ]),
  );
}

export default function SiteEditorPage() {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    SITE_SECTIONS[0].id,
  );
  const [siteData, setSiteData] = useState<SiteEditorData>(MOCK_SITE_DATA);
  const [sectionStates, setSectionStates] =
    useState<EditorSectionStates>(buildInitialStates);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dirtyIds = new Set(
    Object.entries(sectionStates)
      .filter(([, s]) => s.isDirty)
      .map(([id]) => id),
  );

  const totalDirty = dirtyIds.size;

  // ── Load data ─────────────────────────────
  // TODO: Replace with real API call
  // const loadSiteData = useCallback(async () => {
  //   setLoading(true);
  //   const res = await fetch("/api/admin/site-content");
  //   const json = await res.json();
  //   setSiteData(json.data);
  //   setLoading(false);
  // }, []);
  // useEffect(() => { loadSiteData(); }, [loadSiteData]);

  const handleDataChange = useCallback(
    (sectionId: string, newData: Record<string, FieldValue>) => {
      setSiteData((prev) => ({ ...prev, [sectionId]: newData }));
      setSectionStates((prev) => ({
        ...prev,
        [sectionId]: { ...prev[sectionId], isDirty: true, status: "modified" },
      }));
    },
    [],
  );

  const handleSave = useCallback(
    async (sectionId: string, data: Record<string, FieldValue>) => {
      // TODO: Replace with real API call
      // await fetch(`/api/admin/site-content/${sectionId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ data }),
      // });
      await new Promise((r) => setTimeout(r, 800));
      setSectionStates((prev) => ({
        ...prev,
        [sectionId]: {
          status: "published",
          isDirty: false,
          lastSaved: new Date().toISOString(),
        },
      }));
    },
    [],
  );

  const handleSaveAll = async () => {
    for (const id of [...dirtyIds]) {
      await handleSave(id, siteData[id] ?? {});
    }
  };

  const handleSelectSection = (id: string) => {
    setActiveSectionId(id);
    setDrawerOpen(false);
  };

  const activeSection = SECTION_BY_ID[activeSectionId];
  const activeSectionData = siteData[activeSectionId] ?? {};
  const activeSectionState = sectionStates[activeSectionId] ?? {
    status: "published",
    isDirty: false,
  };

  return (
    <div className="w-full space-y-5 min-h-screen">
      {/* ── Page header ────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="flex size-12 items-center justify-center rounded-full border p-3 shrink-0">
              <LayoutTemplate className="size-6 text-t-secondary" />
            </div>
            <p className="text-3xl font-semibold tracking-tight">Site Editor</p>
          </div>

          {totalDirty > 0 && (
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-sky-50 border border-sky-200 flex-wrap">
              <AlertCircle size={14} className="text-sky-600 shrink-0" />
              <p className="text-sm text-sky-700">
                <span className="font-semibold">{totalDirty}</span> unsaved
                section{totalDirty > 1 ? "s" : ""}
              </p>
              <Button
                size="sm"
                onClick={handleSaveAll}
                className="bg-primary-c hover:bg-primary-c/90 text-white"
              >
                <Save size={13} className="mr-1.5" />
                Save All
              </Button>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-500 max-w-2xl">
          Edit content, images and settings for every section of the site.
          Changes are saved per section and published immediately.
        </p>
      </div>

      {/* ── Mobile: section picker bar ──────────── */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-t-primary font-medium shadow-sm hover:bg-gray-50 transition-colors"
        >
          <Menu size={16} className="text-t-secondary shrink-0" />
          <span className="flex-1 text-left truncate">
            {activeSection?.label ?? "Select section"}
          </span>
          {totalDirty > 0 && (
            <Badge
              variant="outline"
              className="text-[10px] bg-sky-50 text-sky-700 border-sky-200 shrink-0"
            >
              {totalDirty}
            </Badge>
          )}
        </button>
      </div>

      {/* ── Mobile drawer overlay ───────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-t-secondary" />
                <span className="text-xs font-semibold text-t-secondary uppercase tracking-wider">
                  Sections
                </span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={15} className="text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <SectionNav
                activeSectionId={activeSectionId}
                onSelect={handleSelectSection}
                sectionStates={sectionStates}
                dirtyIds={dirtyIds}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── Two-panel editor ─────────────────────
          Desktop: left sidebar (fixed 256px) + right editor
          Mobile:  full-width editor only (nav lives in the drawer above)
      ─────────────────────────────────────────── */}
      <div className="flex rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[600px] md:min-h-[700px]">
        {/* Left sidebar — desktop only */}
        <div className="hidden md:flex w-64 shrink-0 border-r border-gray-100 bg-gray-50/40 flex-col">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 shrink-0">
            <Globe size={14} className="text-t-secondary" />
            <span className="text-xs font-semibold text-t-secondary uppercase tracking-wider">
              Sections
            </span>
            {totalDirty > 0 && (
              <Badge
                variant="outline"
                className="ml-auto text-[10px] bg-sky-50 text-sky-700 border-sky-200"
              >
                {totalDirty} unsaved
              </Badge>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <SectionNav
              activeSectionId={activeSectionId}
              onSelect={setActiveSectionId}
              sectionStates={sectionStates}
              dirtyIds={dirtyIds}
            />
          </div>
        </div>

        {/* Right: Section editor */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {loading ? (
            <SectionEditorSkeleton />
          ) : activeSection ? (
            <SectionEditor
              key={activeSectionId}
              section={activeSection}
              data={activeSectionData}
              sectionState={activeSectionState}
              onSave={handleSave}
              onDataChange={handleDataChange}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm p-8 text-center">
              Select a section to start editing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
