"use client";

import type { MaterialConfig } from "@/types/assembly";

interface DougongMeshProps {
  material: MaterialConfig;
  scale: [number, number, number];
}

export function DougongMesh({ material, scale }: DougongMeshProps) {
  const layerHeight = scale[1] / 3;

  return (
    <group>
      {/* Bottom layer - narrowest */}
      <mesh
        position={[0, -layerHeight, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[scale[0] * 0.5, layerHeight, scale[2] * 0.5]}
        />
        <meshStandardMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
      {/* Middle layer */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry
          args={[scale[0] * 0.75, layerHeight, scale[2] * 0.75]}
        />
        <meshStandardMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
      {/* Top layer - widest */}
      <mesh
        position={[0, layerHeight, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[scale[0], layerHeight, scale[2]]} />
        <meshStandardMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
        />
      </mesh>
    </group>
  );
}
