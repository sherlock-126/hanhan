"use client";

import { useAssemblyStore } from "@/store/useAssemblyStore";

export function Toolbar() {
  const explodeMode = useAssemblyStore((s) => s.explodeMode);
  const setExplodeMode = useAssemblyStore((s) => s.setExplodeMode);
  const partsCount = useAssemblyStore((s) => s.parts.length);

  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      <div className="rounded-lg bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
        <span className="text-sm font-medium text-gray-700">
          Hanhan 3D Assembly
        </span>
      </div>
      {partsCount > 0 && (
        <button
          onClick={() => setExplodeMode(!explodeMode)}
          className={`rounded-lg px-4 py-2 text-sm font-medium shadow-md backdrop-blur-sm transition-colors ${
            explodeMode
              ? "bg-orange-500 text-white"
              : "bg-white/90 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {explodeMode ? "Collapse" : "Explode"}
        </button>
      )}
    </div>
  );
}
