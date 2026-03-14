import type { Vector3Tuple } from "@/types/assembly";

export function snapToGrid(position: Vector3Tuple, gridSize: number): Vector3Tuple {
  if (gridSize <= 0) {
    return { ...position };
  }

  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize,
    z: Math.round(position.z / gridSize) * gridSize,
  };
}
