"use client";

import { useMemo } from "react";
import * as THREE from "three";
import type { MaterialConfig } from "@/types/assembly";

interface RoofMeshProps {
  material: MaterialConfig;
  scale: [number, number, number];
}

export function RoofMesh({ material, scale }: RoofMeshProps) {
  const geometry = useMemo(() => {
    const hw = scale[0] / 2;
    const hh = scale[1] / 2;
    const hd = scale[2] / 2;
    const overhang = 0.3;

    const vertices = new Float32Array([
      // Bottom face (wider, with overhang)
      -(hw + overhang), -hh, -(hd + overhang),
      (hw + overhang), -hh, -(hd + overhang),
      (hw + overhang), -hh, (hd + overhang),
      -(hw + overhang), -hh, (hd + overhang),
      // Top face (narrower, ridge)
      -hw * 0.4, hh, -hd * 0.4,
      hw * 0.4, hh, -hd * 0.4,
      hw * 0.4, hh, hd * 0.4,
      -hw * 0.4, hh, hd * 0.4,
    ]);

    const indices = [
      // Bottom
      0, 2, 1, 0, 3, 2,
      // Front
      0, 1, 5, 0, 5, 4,
      // Back
      2, 3, 7, 2, 7, 6,
      // Left
      3, 0, 4, 3, 4, 7,
      // Right
      1, 2, 6, 1, 6, 5,
      // Top
      4, 5, 6, 4, 6, 7,
    ];

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, [scale]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={material.color}
        roughness={material.roughness}
        metalness={material.metalness}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
