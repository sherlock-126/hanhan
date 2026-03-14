import type { PartType, PartTemplate } from "@/types/assembly";

export const PART_TEMPLATES: Record<PartType, PartTemplate> = {
  wall: {
    type: "wall",
    name: "Wall",
    geometryType: "box",
    defaultScale: { x: 4, y: 3, z: 0.2 },
    defaultMaterial: { color: "#d4c4a8", roughness: 0.8, metalness: 0.1, opacity: 1 },
  },
  floor: {
    type: "floor",
    name: "Floor",
    geometryType: "box",
    defaultScale: { x: 4, y: 0.2, z: 4 },
    defaultMaterial: { color: "#a0896e", roughness: 0.7, metalness: 0.1, opacity: 1 },
  },
  column: {
    type: "column",
    name: "Column",
    geometryType: "cylinder",
    defaultScale: { x: 0.4, y: 3, z: 0.4 },
    defaultMaterial: { color: "#b0b0b0", roughness: 0.5, metalness: 0.3, opacity: 1 },
  },
  beam: {
    type: "beam",
    name: "Beam",
    geometryType: "box",
    defaultScale: { x: 4, y: 0.4, z: 0.3 },
    defaultMaterial: { color: "#8a8a8a", roughness: 0.6, metalness: 0.4, opacity: 1 },
  },
  slab: {
    type: "slab",
    name: "Slab",
    geometryType: "box",
    defaultScale: { x: 6, y: 0.3, z: 6 },
    defaultMaterial: { color: "#c0c0c0", roughness: 0.6, metalness: 0.2, opacity: 1 },
  },
  stair: {
    type: "stair",
    name: "Stair",
    geometryType: "box",
    defaultScale: { x: 1.2, y: 2, z: 3 },
    defaultMaterial: { color: "#9e8c78", roughness: 0.7, metalness: 0.1, opacity: 1 },
  },
};

export function getPartTemplate(type: PartType): PartTemplate {
  const template = PART_TEMPLATES[type];
  if (!template) {
    const validTypes = Object.keys(PART_TEMPLATES).join(", ");
    throw new Error(`Invalid part type "${type}". Valid types: ${validTypes}`);
  }
  return template;
}
