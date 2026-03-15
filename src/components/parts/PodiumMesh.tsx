"use client";

import type { MaterialConfig } from "@/types/assembly";

interface PodiumMeshProps {
  material: MaterialConfig;
  scale: [number, number, number];
}

export function PodiumMesh({ material, scale }: PodiumMeshProps) {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[scale[0], scale[1], scale[2]]} />
        <meshStandardMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
      {/* Front step */}
      <mesh
        position={[0, -scale[1] * 0.3, scale[2] * 0.55]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[scale[0] * 0.8, scale[1] * 0.4, scale[2] * 0.15]}
        />
        <meshStandardMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
    </group>
  );
}
