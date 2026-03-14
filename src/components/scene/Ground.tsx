"use client";

import { useCallback, useRef } from "react";
import { Grid } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import type { ThreeEvent } from "@react-three/fiber";
import { useAssemblyStore } from "@/store/useAssemblyStore";
import { createPartFromTemplate } from "@/lib/partFactory";
import { getPartTemplate } from "@/lib/partTemplates";
import { snapToGrid } from "@/lib/snapUtils";
import {
  GRID_SIZE,
  GRID_DIVISIONS,
  GROUND_SIZE,
  GROUND_COLOR,
  SNAP_GRID_SIZE,
} from "@/lib/constants";
import type { Vector3Tuple } from "@/types/assembly";
import { GhostMesh, getGhostYPosition } from "./GhostMesh";

export function Ground() {
  const activePartType = useAssemblyStore((s) => s.activePartType);
  const selectedPartId = useAssemblyStore((s) => s.selectedPartId);
  const addPart = useAssemblyStore((s) => s.addPart);
  const selectPart = useAssemblyStore((s) => s.selectPart);

  const ghostPositionRef = useRef<Vector3Tuple>({ x: 0, y: 0, z: 0 });
  const ghostVisibleRef = useRef<boolean>(false);

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      if (!activePartType) {
        if (selectedPartId) {
          selectPart(null);
        }
        return;
      }

      event.stopPropagation();

      const point = event.point;
      const template = getPartTemplate(activePartType);
      const halfHeight = template.defaultScale.y / 2;

      const snapped = snapToGrid(
        { x: point.x, y: 0, z: point.z },
        SNAP_GRID_SIZE,
      );

      const part = createPartFromTemplate(activePartType, {
        x: snapped.x,
        y: halfHeight,
        z: snapped.z,
      });

      addPart(part);
    },
    [activePartType, selectedPartId, addPart, selectPart],
  );

  const handlePointerMove = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      if (!activePartType) return;
      const point = event.point;
      const snapped = snapToGrid(
        { x: point.x, y: 0, z: point.z },
        SNAP_GRID_SIZE,
      );
      const halfHeight = getGhostYPosition(activePartType);
      ghostPositionRef.current = { x: snapped.x, y: halfHeight, z: snapped.z };
      ghostVisibleRef.current = true;
    },
    [activePartType],
  );

  const handlePointerOut = useCallback(() => {
    ghostVisibleRef.current = false;
  }, []);

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
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.01, 0]}
          receiveShadow
          onClick={handleClick}
          onPointerMove={handlePointerMove}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
          <meshStandardMaterial
            color={GROUND_COLOR}
            transparent
            opacity={0.5}
          />
        </mesh>
      </RigidBody>
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
