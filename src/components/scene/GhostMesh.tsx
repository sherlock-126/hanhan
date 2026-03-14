"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import type { PartType, Vector3Tuple } from "@/types/assembly";
import { PART_TEMPLATES } from "@/lib/partTemplates";
import { GHOST_MESH_OPACITY, GHOST_MESH_COLOR } from "@/lib/constants";

interface GhostMeshProps {
  activePartType: PartType;
  ghostPositionRef: React.RefObject<Vector3Tuple>;
  ghostVisibleRef: React.RefObject<boolean>;
}

export function getGhostConfig(partType: PartType) {
  const template = PART_TEMPLATES[partType];
  return {
    geometryType: template.geometryType,
    scale: [
      template.defaultScale.x,
      template.defaultScale.y,
      template.defaultScale.z,
    ] as [number, number, number],
  };
}

export function getGhostYPosition(partType: PartType): number {
  const template = PART_TEMPLATES[partType];
  return template.defaultScale.y / 2;
}

export function GhostMesh({
  activePartType,
  ghostPositionRef,
  ghostVisibleRef,
}: GhostMeshProps) {
  const meshRef = useRef<Mesh>(null);

  const config = useMemo(
    () => getGhostConfig(activePartType),
    [activePartType],
  );

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = ghostPositionRef.current;
    if (pos) {
      meshRef.current.position.set(pos.x, pos.y, pos.z);
    }
    meshRef.current.visible = ghostVisibleRef.current ?? false;
  });

  return (
    <mesh ref={meshRef} scale={config.scale} visible={false}>
      {config.geometryType === "cylinder" ? (
        <cylinderGeometry args={[0.5, 0.5, 1, 16]} />
      ) : (
        <boxGeometry args={[1, 1, 1]} />
      )}
      <meshStandardMaterial
        color={GHOST_MESH_COLOR}
        transparent
        opacity={GHOST_MESH_OPACITY}
        depthWrite={false}
      />
    </mesh>
  );
}
