"use client";

import { useAssemblyStore } from "@/store/useAssemblyStore";
import { PartMesh } from "@/components/parts/PartMesh";

export function AssemblyScene() {
  const parts = useAssemblyStore((s) => s.parts);
  const explodeMode = useAssemblyStore((s) => s.explodeMode);

  return (
    <group>
      {parts.map((part) => (
        <PartMesh key={part.id} part={part} explodeMode={explodeMode} />
      ))}
    </group>
  );
}
