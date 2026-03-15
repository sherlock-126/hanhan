"use client";

import type { MaterialConfig } from "@/types/assembly";

interface GateMeshProps {
  material: MaterialConfig;
  scale: [number, number, number];
}

export function GateMesh({ material, scale }: GateMeshProps) {
  const archWidth = scale[0] * 0.35;
  const archHeight = scale[1] * 0.55;

  return (
    <group>
      {/* Main gate body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[scale[0], scale[1], scale[2]]} />
        <meshStandardMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
      {/* Arch opening (darker inset) */}
      <mesh position={[0, -scale[1] * 0.15, scale[2] * 0.45]}>
        <boxGeometry args={[archWidth, archHeight, scale[2] * 0.2]} />
        <meshStandardMaterial color="#1a0a0a" roughness={1} metalness={0} />
      </mesh>
      {/* Brass stud decorations - left */}
      <mesh position={[-scale[0] * 0.25, 0, scale[2] * 0.52]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#B8860B" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Brass stud - right */}
      <mesh position={[scale[0] * 0.25, 0, scale[2] * 0.52]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#B8860B" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}
