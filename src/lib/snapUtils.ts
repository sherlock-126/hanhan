import type { AssemblyPart, PartType, SnapPoint, Vector3Tuple } from "@/types/assembly";
import { PART_TEMPLATES } from "@/config/partTemplates";
import { GRID_SNAP_SIZE, SNAP_DISTANCE } from "@/lib/constants";

export function snapToGrid(value: number): number {
  return Math.round(value / GRID_SNAP_SIZE) * GRID_SNAP_SIZE;
}

interface SnapResult {
  position: Vector3Tuple;
  snappedToPartId: string;
  snapPointId: string;
}

function distance2D(a: Vector3Tuple, b: Vector3Tuple): number {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
}

function getWorldSnapPoint(part: AssemblyPart, snapPoint: SnapPoint): Vector3Tuple {
  return {
    x: part.position.x + snapPoint.position.x,
    y: part.position.y + snapPoint.position.y,
    z: part.position.z + snapPoint.position.z,
  };
}

export function findBestSnapPoint(
  newPartType: PartType,
  cursorPosition: Vector3Tuple,
  existingParts: AssemblyPart[],
): SnapResult | null {
  const newTemplate = PART_TEMPLATES[newPartType];
  if (!newTemplate) return null;

  const newDownSnaps = newTemplate.snapPoints.filter((sp) => sp.direction === "down");
  if (newDownSnaps.length === 0) return null;

  let bestResult: SnapResult | null = null;
  let bestDistance = SNAP_DISTANCE;

  for (const existingPart of existingParts) {
    const existingType = existingPart.type as PartType;
    const existingTemplate = PART_TEMPLATES[existingType];
    if (!existingTemplate) continue;

    const existingUpSnaps = existingTemplate.snapPoints.filter(
      (sp) => sp.direction === "up",
    );

    for (const upSnap of existingUpSnaps) {
      if (!upSnap.compatibleTypes.includes(newPartType)) continue;

      const worldUpSnap = getWorldSnapPoint(existingPart, upSnap);

      for (const downSnap of newDownSnaps) {
        if (!downSnap.compatibleTypes.includes(existingType)) continue;

        const dist = distance2D(cursorPosition, worldUpSnap);

        if (dist < bestDistance) {
          bestDistance = dist;
          bestResult = {
            position: {
              x: worldUpSnap.x - downSnap.position.x,
              y: worldUpSnap.y - downSnap.position.y,
              z: worldUpSnap.z - downSnap.position.z,
            },
            snappedToPartId: existingPart.id,
            snapPointId: upSnap.id,
          };
        }
      }
    }
  }

  return bestResult;
}
