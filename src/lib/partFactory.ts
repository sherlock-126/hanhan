import type { AssemblyPart, PartType, Vector3Tuple } from "@/types/assembly";
import { getPartTemplate } from "@/lib/partTemplates";
import { DEFAULT_PART_Y } from "@/lib/constants";

export function createPartFromTemplate(
  type: PartType,
  position?: Vector3Tuple,
): AssemblyPart {
  const template = getPartTemplate(type);

  return {
    id: crypto.randomUUID(),
    name: template.name,
    type: template.type,
    position: position ?? { x: 0, y: DEFAULT_PART_Y, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { ...template.defaultScale },
    meshUrl: null,
    material: { ...template.defaultMaterial },
  };
}
