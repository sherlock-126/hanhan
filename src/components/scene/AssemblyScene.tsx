"use client";

import { useCallback, useRef } from "react";
import { TransformControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import type { Group } from "three";
import { useAssemblyStore } from "@/store/useAssemblyStore";
import { PartMesh, getGeometryType } from "./PartMesh";
import { SNAP_GRID_SIZE } from "@/lib/constants";

export function AssemblyScene() {
  const parts = useAssemblyStore((state) => state.parts);
  const selectedPartId = useAssemblyStore((state) => state.selectedPartId);
  const selectPart = useAssemblyStore((state) => state.selectPart);
  const updatePartTransform = useAssemblyStore(
    (state) => state.updatePartTransform,
  );
  const transformTargetRef = useRef<Group>(null);

  const handleSelect = useCallback(
    (id: string) => {
      selectPart(id);
    },
    [selectPart],
  );

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
        const isSelected = part.id === selectedPartId;
        const geometryType = getGeometryType(part);
        const isFixed = part.type === "floor";

        if (isSelected) {
          return (
            <TransformControls
              key={part.id}
              mode="translate"
              translationSnap={SNAP_GRID_SIZE}
              onMouseUp={handleDragEnd}
            >
              <group
                ref={transformTargetRef}
                position={[
                  part.position.x,
                  part.position.y,
                  part.position.z,
                ]}
              >
                <PartMesh
                  part={part}
                  isSelected={true}
                  onSelect={handleSelect}
                />
              </group>
            </TransformControls>
          );
        }

        return (
          <RigidBody
            key={part.id}
            type={isFixed ? "fixed" : "dynamic"}
            position={[part.position.x, part.position.y, part.position.z]}
            rotation={[part.rotation.x, part.rotation.y, part.rotation.z]}
            colliders={geometryType === "cylinder" ? "hull" : "cuboid"}
          >
            <PartMesh
              part={part}
              isSelected={false}
              onSelect={handleSelect}
            />
          </RigidBody>
        );
      })}
    </group>
  );
}
