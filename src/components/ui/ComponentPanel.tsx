"use client";

import type { PartType } from "@/types/assembly";
import { ALL_PART_TYPES, PART_TEMPLATES } from "@/config/partTemplates";
import { useAssemblyStore } from "@/store/useAssemblyStore";

const TYPE_ICONS: Record<PartType, string> = {
  podium: "▬",
  pillar: "▮",
  dougong: "⊞",
  roof: "⌂",
  wall: "▭",
  gate: "⊓",
};

export function ComponentPanel() {
  const activePartType = useAssemblyStore((s) => s.activePartType);
  const setActivePartType = useAssemblyStore((s) => s.setActivePartType);
  const clearParts = useAssemblyStore((s) => s.clearParts);
  const partsCount = useAssemblyStore((s) => s.parts.length);

  const handleSelect = (type: PartType) => {
    if (activePartType === type) {
      setActivePartType(null);
    } else {
      setActivePartType(type);
    }
  };

  return (
    <div className="absolute top-20 left-4 z-10 w-48 rounded-lg bg-white/90 shadow-md backdrop-blur-sm">
      <div className="border-b border-gray-200 px-3 py-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Imperial City
        </h3>
      </div>
      <div className="space-y-1 p-2">
        {ALL_PART_TYPES.map((type) => {
          const template = PART_TEMPLATES[type];
          const isActive = activePartType === type;
          return (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{TYPE_ICONS[type]}</span>
              <span>{template.name}</span>
            </button>
          );
        })}
      </div>
      {partsCount > 0 && (
        <div className="border-t border-gray-200 p-2">
          <button
            onClick={clearParts}
            className="w-full rounded-md px-3 py-1.5 text-xs text-red-600 transition-colors hover:bg-red-50"
          >
            Clear All ({partsCount})
          </button>
        </div>
      )}
    </div>
  );
}
