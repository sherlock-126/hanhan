"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Preload } from "@react-three/drei";
import { Scene } from "./Scene";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";
import {
  DEFAULT_CAMERA_POSITION,
  DEFAULT_CAMERA_FOV,
  DEFAULT_CAMERA_NEAR,
  DEFAULT_CAMERA_FAR,
  PHYSICS_CONFIG,
  MAX_PIXEL_RATIO,
  TONE_MAPPING,
  OUTPUT_COLOR_SPACE,
  SHADOW_MAP_TYPE,
} from "@/lib/constants";

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  );
}

function WebGLErrorFallback() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-4 bg-gray-50">
      <h2 className="text-xl font-semibold text-gray-800">3D rendering unavailable</h2>
      <p className="max-w-md text-center text-gray-600">
        Your browser or device does not support WebGL. Please try a different browser or enable
        hardware acceleration.
      </p>
    </div>
  );
}

export default function Canvas3D() {
  return (
    <WebGLErrorBoundary fallback={<WebGLErrorFallback />}>
      <Canvas
        camera={{
          position: DEFAULT_CAMERA_POSITION,
          fov: DEFAULT_CAMERA_FOV,
          near: DEFAULT_CAMERA_NEAR,
          far: DEFAULT_CAMERA_FAR,
        }}
        dpr={[1, MAX_PIXEL_RATIO]}
        shadows={{ type: SHADOW_MAP_TYPE }}
        gl={{
          antialias: true,
          toneMapping: TONE_MAPPING,
          outputColorSpace: OUTPUT_COLOR_SPACE,
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Physics gravity={PHYSICS_CONFIG.gravity} timeStep={PHYSICS_CONFIG.timeStep}>
            <Scene />
          </Physics>
          <Preload all />
        </Suspense>
      </Canvas>
    </WebGLErrorBoundary>
  );
}
