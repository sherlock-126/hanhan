"use client";

import { useRef, useCallback } from "react";
import { Grid } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import type { Vector3Tuple } from "@/types/assembly";
import {
  GRID_SIZE,
  GRID_DIVISIONS,
  GROUND_SIZE,
  GROUND_COLOR,
} from "@/lib/constants";
import { useAssemblyStore } from "@/store/useAssemblyStore";
import { PART_TEMPLATES } from "@/config/partTemplates";
import { createPartFromTemplate } from "@/lib/partFactory";
import { snapToGrid, findBestSnapPoint } from "@/lib/snapUtils";
import { GhostMesh } from "./GhostMesh";

export function Ground() {
  const activePartType = useAssemblyStore((s) => s.activePartType);
  const parts = useAssemblyStore((s) => s.parts);
  const addPart = useAssemblyStore((s) => s.addPart);

  const ghostPositionRef = useRef<Vector3Tuple | null>(null);
  const ghostVisibleRef = useRef<boolean>(false);

  const handlePointerMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!activePartType) return;
      e.stopPropagation();
      const template = PART_TEMPLATES[activePartType];
      const snappedX = snapToGrid(e.point.x);
      const snappedZ = snapToGrid(e.point.z);
      const y = template.defaultScale.y / 2;
      ghostPositionRef.current = { x: snappedX, y, z: snappedZ };
      ghostVisibleRef.current = true;
    },
    [activePartType],
  );

  const handlePointerOut = useCallback(() => {
    ghostVisibleRef.current = false;
  }, []);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (!activePartType) return;
      e.stopPropagation();

      const template = PART_TEMPLATES[activePartType];
      const snappedX = snapToGrid(e.point.x);
      const snappedZ = snapToGrid(e.point.z);
      const defaultY = template.defaultScale.y / 2;

      const cursorPos: Vector3Tuple = { x: snappedX, y: defaultY, z: snappedZ };

      const snapResult = findBestSnapPoint(activePartType, cursorPos, parts);

      const position: Vector3Tuple = snapResult
        ? snapResult.position
        : cursorPos;

      const part = createPartFromTemplate(activePartType, position);
      addPart(part);
    },
    [activePartType, parts, addPart],
  );

  return (
    <group>
      <Grid
        args={[GRID_SIZE, GRID_SIZE]}
        cellSize={GRID_SIZE / GRID_DIVISIONS}
        cellThickness={0.5}
        cellColor="#999999"
        sectionSize={GRID_SIZE / 4}
        sectionThickness={1}
        sectionColor="#666666"
        fadeDistance={50}
        infiniteGrid
      />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <planeGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
        <meshStandardMaterial
          color={GROUND_COLOR}
          transparent
          opacity={0.5}
        />
      </mesh>
      {activePartType && (
        <GhostMesh
          activePartType={activePartType}
          ghostPositionRef={ghostPositionRef}
          ghostVisibleRef={ghostVisibleRef}
        />
      )}
    </group>
  );
}
