"use client";

import type { MaterialConfig } from "@/types/assembly";

interface PillarMeshProps {
  material: MaterialConfig;
  scale: [number, number, number];
}

export function PillarMesh({ material, scale }: PillarMeshProps) {
  const radius = scale[0] / 2;
  const height = scale[1];

  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 16]} />
        <meshStandardMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
      {/* Base cap */}
      <mesh position={[0, -height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.3, radius * 1.3, 0.1, 16]} />
        <meshStandardMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
    </group>
  );
}
