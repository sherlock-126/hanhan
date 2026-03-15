"use client";

import { useCallback, useRef } from "react";
import { TransformControls } from "@react-three/drei";
import type { Group } from "three";
import { useAssemblyStore } from "@/store/useAssemblyStore";
import { PartMesh } from "@/components/parts/PartMesh";
import { GRID_SNAP_SIZE } from "@/lib/constants";

export function AssemblyScene() {
  const parts = useAssemblyStore((s) => s.parts);
  const explodeMode = useAssemblyStore((s) => s.explodeMode);
  const selectedPartId = useAssemblyStore((s) => s.selectedPartId);
  const updatePartTransform = useAssemblyStore((s) => s.updatePartTransform);
  const transformTargetRef = useRef<Group>(null);

  const handleDragEnd = useCallback(() => {
    if (!transformTargetRef.current || !selectedPartId) return;
    const pos = transformTargetRef.current.position;
    updatePartTransform(selectedPartId, {
      position: { x: pos.x, y: pos.y, z: pos.z },
    });
  }, [selectedPartId, updatePartTransform]);

  return (
    <group>
      {parts.map((part) => {
        const isSelected = part.id === selectedPartId && !explodeMode;

        if (isSelected) {
          return (
            <TransformControls
              key={part.id}
              mode="translate"
              translationSnap={GRID_SNAP_SIZE}
              onMouseUp={handleDragEnd}
            >
              <group
                ref={transformTargetRef}
                position={[part.position.x, part.position.y, part.position.z]}
              >
                <PartMesh part={part} explodeMode={false} />
              </group>
            </TransformControls>
          );
        }

        return (
          <PartMesh key={part.id} part={part} explodeMode={explodeMode} />
        );
      })}
    </group>
  );
}
