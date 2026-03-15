"use client";

import type { MaterialConfig } from "@/types/assembly";

interface WallMeshProps {
  material: MaterialConfig;
  scale: [number, number, number];
}

export function WallMesh({ material, scale }: WallMeshProps) {
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
      {/* Top decorative ridge */}
      <mesh
        position={[0, scale[1] * 0.52, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[scale[0] * 1.02, scale[1] * 0.06, scale[2] * 1.3]}
        />
        <meshStandardMaterial
          color="#DAA520"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}
