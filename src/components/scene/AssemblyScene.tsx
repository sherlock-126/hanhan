"use client";

import { useAssemblyStore } from "@/store/useAssemblyStore";
import { PartMesh } from "./PartMesh";

export function AssemblyScene() {
  const parts = useAssemblyStore((state) => state.parts);
  const selectedPartId = useAssemblyStore((state) => state.selectedPartId);

  return (
    <group>
      {parts.map((part) => (
        <PartMesh
          key={part.id}
          part={part}
          isSelected={part.id === selectedPartId}
        />
      ))}
    </group>
  );
}
