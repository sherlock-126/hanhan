"use client";

import { useAssemblyStore } from "@/store/useAssemblyStore";
import { PART_TEMPLATES } from "@/lib/partTemplates";
import type { PartType } from "@/types/assembly";

const PART_TYPE_ENTRIES = Object.entries(PART_TEMPLATES) as [
  PartType,
  (typeof PART_TEMPLATES)[PartType],
][];

export function ComponentPanel() {
  const activePartType = useAssemblyStore((s) => s.activePartType);
  const setActivePartType = useAssemblyStore((s) => s.setActivePartType);
  const parts = useAssemblyStore((s) => s.parts);
  const selectedPartId = useAssemblyStore((s) => s.selectedPartId);
  const removePart = useAssemblyStore((s) => s.removePart);
  const clearParts = useAssemblyStore((s) => s.clearParts);

  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-56 flex-col bg-white/95 shadow-lg backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-800">Components</h2>
        <p className="text-xs text-gray-500">Click to select, then click ground to place</p>
      </div>

      {/* Part type buttons */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="flex flex-col gap-1">
          {PART_TYPE_ENTRIES.map(([type, template]) => (
            <button
              key={type}
              onClick={() =>
                setActivePartType(activePartType === type ? null : type)
              }
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                activePartType === type
                  ? "bg-blue-100 text-blue-800 ring-1 ring-blue-300"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span
                className="inline-block h-4 w-4 rounded-sm"
                style={{ backgroundColor: template.defaultMaterial.color }}
              />
              <span className="font-medium">{template.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scene info & actions */}
      <div className="border-t border-gray-200 px-4 py-3">
        <p className="mb-2 text-xs text-gray-500">
          {parts.length} part{parts.length !== 1 ? "s" : ""} in scene
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => removePart(selectedPartId ?? "")}
            disabled={!selectedPartId}
            className="flex-1 rounded-md bg-red-50 px-2 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Remove
          </button>
          <button
            onClick={clearParts}
            disabled={parts.length === 0}
            className="flex-1 rounded-md bg-gray-100 px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
