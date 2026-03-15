"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PartType, Vector3Tuple } from "@/types/assembly";
import { PART_TEMPLATES } from "@/config/partTemplates";
import { GHOST_MESH_OPACITY, GHOST_MESH_COLOR } from "@/lib/constants";

interface GhostMeshProps {
  activePartType: PartType;
  ghostPositionRef: React.RefObject<Vector3Tuple | null>;
  ghostVisibleRef: React.RefObject<boolean>;
}

export function GhostMesh({
  activePartType,
  ghostPositionRef,
  ghostVisibleRef,
}: GhostMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const template = PART_TEMPLATES[activePartType];

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = ghostPositionRef.current;
    const visible = ghostVisibleRef.current;
    meshRef.current.visible = visible ?? false;
    if (pos) {
      meshRef.current.position.set(pos.x, pos.y, pos.z);
    }
  });

  const scale = template.defaultScale;

  return (
    <mesh ref={meshRef} visible={false}>
      {activePartType === "pillar" ? (
        <cylinderGeometry args={[scale.x / 2, scale.x / 2, scale.y, 16]} />
      ) : (
        <boxGeometry args={[scale.x, scale.y, scale.z]} />
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
