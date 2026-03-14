"use client";

import { memo, useMemo } from "react";
import { Edges } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import type { AssemblyPart, GeometryType } from "@/types/assembly";
import { PART_TEMPLATES } from "@/lib/partTemplates";

interface PartMeshProps {
  part: AssemblyPart;
  isSelected: boolean;
}

const GEOMETRY_TYPE_MAP: Record<string, GeometryType> = Object.fromEntries(
  Object.values(PART_TEMPLATES).map((t) => [t.type, t.geometryType]),
);

const MIN_SCALE = 0.01;

function clampScale(value: number): number {
  return Math.max(value, MIN_SCALE);
}

export const PartMesh = memo(function PartMesh({ part, isSelected }: PartMeshProps) {
  const geometryType = GEOMETRY_TYPE_MAP[part.type] ?? "box";

  const scale: [number, number, number] = useMemo(
    () => [
      clampScale(part.scale.x),
      clampScale(part.scale.y),
      clampScale(part.scale.z),
    ],
    [part.scale.x, part.scale.y, part.scale.z],
  );

  return (
    <RigidBody
      type="fixed"
      position={[part.position.x, part.position.y, part.position.z]}
      rotation={[part.rotation.x, part.rotation.y, part.rotation.z]}
      colliders={geometryType === "cylinder" ? "hull" : "cuboid"}
    >
      <mesh scale={scale} castShadow receiveShadow>
        {geometryType === "cylinder" ? (
          <cylinderGeometry args={[0.5, 0.5, 1, 16]} />
        ) : (
          <boxGeometry args={[1, 1, 1]} />
        )}
        <meshStandardMaterial
          color={part.material.color}
          roughness={part.material.roughness}
          metalness={part.material.metalness}
          opacity={part.material.opacity}
          transparent={part.material.opacity < 1}
        />
        {isSelected && <Edges color="#2563eb" lineWidth={2} threshold={15} />}
      </mesh>
    </RigidBody>
  );
});
