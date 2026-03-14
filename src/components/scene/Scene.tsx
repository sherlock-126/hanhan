"use client";

import { useRef } from "react";
import { OrbitControls, Environment, Bvh } from "@react-three/drei";
import type { DirectionalLight as DirectionalLightType } from "three";
import { Ground } from "./Ground";
import { AssemblyScene } from "./AssemblyScene";
import {
  SHADOW_MAP_SIZE,
  SHADOW_CAMERA_BOUNDS,
  SHADOW_CAMERA_NEAR,
  SHADOW_CAMERA_FAR,
  SHADOW_BIAS,
  ORBIT_MIN_DISTANCE,
  ORBIT_MAX_DISTANCE,
  ORBIT_MAX_POLAR_ANGLE,
  ORBIT_ENABLE_DAMPING,
  ORBIT_DAMPING_FACTOR,
} from "@/lib/constants";

export function Scene() {
  const directionalLightRef = useRef<DirectionalLightType>(null);

  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={0.4} />

      {/* Hemisphere for sky/ground color bleed */}
      <hemisphereLight args={["#b1e1ff", "#b97a20", 0.3]} />

      {/* Main directional light with shadows */}
      <directionalLight
        ref={directionalLightRef}
        position={[10, 15, 8]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={SHADOW_MAP_SIZE}
        shadow-mapSize-height={SHADOW_MAP_SIZE}
        shadow-camera-left={-SHADOW_CAMERA_BOUNDS}
        shadow-camera-right={SHADOW_CAMERA_BOUNDS}
        shadow-camera-top={SHADOW_CAMERA_BOUNDS}
        shadow-camera-bottom={-SHADOW_CAMERA_BOUNDS}
        shadow-camera-near={SHADOW_CAMERA_NEAR}
        shadow-camera-far={SHADOW_CAMERA_FAR}
        shadow-bias={SHADOW_BIAS}
      />

      {/* Environment for PBR reflections */}
      <Environment preset="city" />

      {/* Camera controls */}
      <OrbitControls
        makeDefault
        minDistance={ORBIT_MIN_DISTANCE}
        maxDistance={ORBIT_MAX_DISTANCE}
        maxPolarAngle={ORBIT_MAX_POLAR_ANGLE}
        enableDamping={ORBIT_ENABLE_DAMPING}
        dampingFactor={ORBIT_DAMPING_FACTOR}
      />

      {/* Scene content wrapped in Bvh for raycast performance */}
      <Bvh firstHitOnly>
        <Ground />
        <AssemblyScene />
      </Bvh>
    </>
  );
}
