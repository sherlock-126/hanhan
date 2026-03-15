"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Scene } from "./Scene";
import { DEFAULT_CAMERA_POSITION, DEFAULT_CAMERA_FOV, PHYSICS_CONFIG, MAX_PIXEL_RATIO } from "@/lib/constants";

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

export default function Canvas3D() {
  return (
    <Canvas
      camera={{
        position: DEFAULT_CAMERA_POSITION,
        fov: DEFAULT_CAMERA_FOV,
      }}
      dpr={[1, MAX_PIXEL_RATIO]}
      gl={{ antialias: true }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Physics gravity={PHYSICS_CONFIG.gravity}>
          <Scene />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
