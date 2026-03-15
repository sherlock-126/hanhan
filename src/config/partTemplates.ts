import type { PartType, PartTemplate } from "@/types/assembly";

export const PART_TEMPLATES: Record<PartType, PartTemplate> = {
  podium: {
    type: "podium",
    name: "Podium",
    category: "imperial-city",
    defaultScale: { x: 4, y: 0.5, z: 4 },
    material: { color: "#8B8682", roughness: 0.9, metalness: 0.1, opacity: 1 },
    snapPoints: [
      {
        id: "podium-top",
        position: { x: 0, y: 0.25, z: 0 },
        direction: "up",
        compatibleTypes: ["pillar", "wall", "gate"],
      },
    ],
    explodeOrder: 0,
  },
  pillar: {
    type: "pillar",
    name: "Pillar",
    category: "imperial-city",
    defaultScale: { x: 0.3, y: 3, z: 0.3 },
    material: { color: "#8B0000", roughness: 0.6, metalness: 0.1, opacity: 1 },
    snapPoints: [
      {
        id: "pillar-bottom",
        position: { x: 0, y: -1.5, z: 0 },
        direction: "down",
        compatibleTypes: ["podium"],
      },
      {
        id: "pillar-top",
        position: { x: 0, y: 1.5, z: 0 },
        direction: "up",
        compatibleTypes: ["dougong"],
      },
    ],
    explodeOrder: 1,
  },
  dougong: {
    type: "dougong",
    name: "Dougong",
    category: "imperial-city",
    defaultScale: { x: 1.2, y: 0.6, z: 1.2 },
    material: { color: "#6B3A2A", roughness: 0.7, metalness: 0.1, opacity: 1 },
    snapPoints: [
      {
        id: "dougong-bottom",
        position: { x: 0, y: -0.3, z: 0 },
        direction: "down",
        compatibleTypes: ["pillar"],
      },
      {
        id: "dougong-top",
        position: { x: 0, y: 0.3, z: 0 },
        direction: "up",
        compatibleTypes: ["roof"],
      },
    ],
    explodeOrder: 2,
  },
  roof: {
    type: "roof",
    name: "Roof",
    category: "imperial-city",
    defaultScale: { x: 5, y: 1.2, z: 5 },
    material: { color: "#DAA520", roughness: 0.4, metalness: 0.3, opacity: 1 },
    snapPoints: [
      {
        id: "roof-bottom",
        position: { x: 0, y: -0.6, z: 0 },
        direction: "down",
        compatibleTypes: ["dougong"],
      },
    ],
    explodeOrder: 3,
  },
  wall: {
    type: "wall",
    name: "Wall",
    category: "imperial-city",
    defaultScale: { x: 2, y: 2.5, z: 0.3 },
    material: { color: "#8B0000", roughness: 0.7, metalness: 0.1, opacity: 1 },
    snapPoints: [
      {
        id: "wall-bottom",
        position: { x: 0, y: -1.25, z: 0 },
        direction: "down",
        compatibleTypes: ["podium"],
      },
    ],
    explodeOrder: 1,
  },
  gate: {
    type: "gate",
    name: "Gate",
    category: "imperial-city",
    defaultScale: { x: 3, y: 3.5, z: 0.5 },
    material: { color: "#722F37", roughness: 0.6, metalness: 0.2, opacity: 1 },
    snapPoints: [
      {
        id: "gate-bottom",
        position: { x: 0, y: -1.75, z: 0 },
        direction: "down",
        compatibleTypes: ["podium"],
      },
    ],
    explodeOrder: 1,
  },
};

export const ALL_PART_TYPES: PartType[] = [
  "podium",
  "pillar",
  "dougong",
  "roof",
  "wall",
  "gate",
];

export function getPartTemplate(type: PartType): PartTemplate {
  return PART_TEMPLATES[type];
}
