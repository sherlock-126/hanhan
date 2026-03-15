import { describe, it, expect } from "vitest";
import { createPartFromTemplate } from "@/lib/partFactory";
import { ALL_PART_TYPES, PART_TEMPLATES } from "@/config/partTemplates";

describe("createPartFromTemplate", () => {
  it("creates a podium part with correct type and template defaults", () => {
    const part = createPartFromTemplate("podium", { x: 0, y: 0.25, z: 0 });
    expect(part.type).toBe("podium");
    expect(part.name).toBe("Podium");
    expect(part.position).toEqual({ x: 0, y: 0.25, z: 0 });
    expect(part.scale).toEqual(PART_TEMPLATES.podium.defaultScale);
    expect(part.material.color).toBe(PART_TEMPLATES.podium.material.color);
  });

  it("creates a pillar part with red material", () => {
    const part = createPartFromTemplate("pillar", { x: 1, y: 1.5, z: 1 });
    expect(part.type).toBe("pillar");
    expect(part.material.color).toBe("#8B0000");
  });

  it("generates unique IDs for each call", () => {
    const part1 = createPartFromTemplate("podium", { x: 0, y: 0, z: 0 });
    const part2 = createPartFromTemplate("podium", { x: 0, y: 0, z: 0 });
    expect(part1.id).not.toBe(part2.id);
  });

  it("applies provided position correctly", () => {
    const part = createPartFromTemplate("wall", { x: 5, y: 0, z: 3 });
    expect(part.position).toEqual({ x: 5, y: 0, z: 3 });
  });

  it("sets name from template", () => {
    const part = createPartFromTemplate("dougong", { x: 0, y: 0, z: 0 });
    expect(part.name).toBe("Dougong");
  });

  it("all 6 types produce valid parts", () => {
    for (const type of ALL_PART_TYPES) {
      const part = createPartFromTemplate(type, { x: 0, y: 0, z: 0 });
      expect(part).toBeDefined();
      expect(part.id).toBeTruthy();
      expect(part.type).toBe(type);
      expect(part.meshUrl).toBeNull();
      expect(part.rotation).toEqual({ x: 0, y: 0, z: 0 });
    }
  });
});
