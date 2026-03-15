import type { AssemblyPart, PartType, Vector3Tuple } from "@/types/assembly";
import { getPartTemplate } from "@/config/partTemplates";

export function createPartFromTemplate(
  type: PartType,
  position: Vector3Tuple,
): AssemblyPart {
  const template = getPartTemplate(type);

  return {
    id: crypto.randomUUID(),
    name: template.name,
    type: template.type,
    position,
    rotation: { x: 0, y: 0, z: 0 },
    scale: { ...template.defaultScale },
    meshUrl: null,
    material: { ...template.material },
  };
}
