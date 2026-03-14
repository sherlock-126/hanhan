"use client";

import { OrbitControls, Environment } from "@react-three/drei";
import { Ground } from "./Ground";
import { AssemblyScene } from "./AssemblyScene";

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <OrbitControls makeDefault />
      <Ground />
      <AssemblyScene />
    </>
  );
}
