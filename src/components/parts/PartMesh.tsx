"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { AssemblyPart, PartType } from "@/types/assembly";
import { PART_TEMPLATES } from "@/config/partTemplates";
import { EXPLODE_OFFSET } from "@/lib/constants";
import { useAssemblyStore } from "@/store/useAssemblyStore";
import { PodiumMesh } from "./PodiumMesh";
import { PillarMesh } from "./PillarMesh";
import { DougongMesh } from "./DougongMesh";
import { RoofMesh } from "./RoofMesh";
import { WallMesh } from "./WallMesh";
import { GateMesh } from "./GateMesh";

interface PartMeshProps {
  part: AssemblyPart;
  explodeMode: boolean;
}

export function PartMesh({ part, explodeMode }: PartMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const selectedPartId = useAssemblyStore((s) => s.selectedPartId);
  const selectPart = useAssemblyStore((s) => s.selectPart);
  const isSelected = selectedPartId === part.id;

  const template = PART_TEMPLATES[part.type as PartType];
  const explodeOrder = template?.explodeOrder ?? 0;
  const targetY =
    part.position.y + (explodeMode ? explodeOrder * EXPLODE_OFFSET : 0);

  useFrame(() => {
    if (!groupRef.current) return;
    const currentY = groupRef.current.position.y;
    const newY = THREE.MathUtils.lerp(currentY, targetY, 0.1);
    groupRef.current.position.y = newY;
  });

  const scale: [number, number, number] = [
    part.scale.x,
    part.scale.y,
    part.scale.z,
  ];
  const material = part.material;

  const handleClick = (e: THREE.Event) => {
    (e as { stopPropagation?: () => void }).stopPropagation?.();
    selectPart(part.id);
  };

  const meshComponent = (() => {
    switch (part.type) {
      case "podium":
        return <PodiumMesh material={material} scale={scale} />;
      case "pillar":
        return <PillarMesh material={material} scale={scale} />;
      case "dougong":
        return <DougongMesh material={material} scale={scale} />;
      case "roof":
        return <RoofMesh material={material} scale={scale} />;
      case "wall":
        return <WallMesh material={material} scale={scale} />;
      case "gate":
        return <GateMesh material={material} scale={scale} />;
      default:
        return (
          <mesh>
            <boxGeometry args={scale} />
            <meshStandardMaterial color="#888" />
          </mesh>
        );
    }
  })();

  return (
    <group
      ref={groupRef}
      position={[part.position.x, part.position.y, part.position.z]}
      rotation={[part.rotation.x, part.rotation.y, part.rotation.z]}
      onClick={handleClick}
    >
      {meshComponent}
      {isSelected && (
        <mesh>
          <boxGeometry
            args={[scale[0] * 1.05, scale[1] * 1.05, scale[2] * 1.05]}
          />
          <meshBasicMaterial
            color="#4fc3f7"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  );
}
