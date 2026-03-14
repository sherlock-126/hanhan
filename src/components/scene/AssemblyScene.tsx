"use client";

import { useCallback } from "react";
import { useAssemblyStore } from "@/store/useAssemblyStore";
import { PartMesh } from "./PartMesh";

export function AssemblyScene() {
  const parts = useAssemblyStore((state) => state.parts);
  const selectedPartId = useAssemblyStore((state) => state.selectedPartId);
  const selectPart = useAssemblyStore((state) => state.selectPart);

  const handleSelect = useCallback(
    (id: string) => {
      selectPart(id);
    },
    [selectPart],
  );

  return (
    <group>
      {parts.map((part) => (
        <PartMesh
          key={part.id}
          part={part}
          isSelected={part.id === selectedPartId}
          onSelect={handleSelect}
        />
      ))}
    </group>
  );
}
