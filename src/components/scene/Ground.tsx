"use client";

import { Grid } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { GRID_SIZE, GRID_DIVISIONS, GROUND_SIZE, GROUND_COLOR } from "@/lib/constants";

export function Ground() {
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
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
          <meshStandardMaterial color={GROUND_COLOR} transparent opacity={0.5} />
        </mesh>
      </RigidBody>
    </group>
  );
}
