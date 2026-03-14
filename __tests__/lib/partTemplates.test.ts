import { describe, it, expect } from "vitest";
import { PART_TEMPLATES, getPartTemplate } from "@/lib/partTemplates";
import type { PartType } from "@/types/assembly";

describe("PART_TEMPLATES", () => {
  it("has exactly 6 entries", () => {
    expect(Object.keys(PART_TEMPLATES)).toHaveLength(6);
  });

  it("all templates have positive defaultScale values", () => {
    for (const template of Object.values(PART_TEMPLATES)) {
      expect(template.defaultScale.x).toBeGreaterThan(0);
      expect(template.defaultScale.y).toBeGreaterThan(0);
      expect(template.defaultScale.z).toBeGreaterThan(0);
    }
  });

  it("all templates have valid defaultMaterial", () => {
    for (const template of Object.values(PART_TEMPLATES)) {
      expect(template.defaultMaterial.color).toBeTruthy();
      expect(template.defaultMaterial.roughness).toBeGreaterThanOrEqual(0);
      expect(template.defaultMaterial.roughness).toBeLessThanOrEqual(1);
      expect(template.defaultMaterial.metalness).toBeGreaterThanOrEqual(0);
      expect(template.defaultMaterial.metalness).toBeLessThanOrEqual(1);
      expect(template.defaultMaterial.opacity).toBeGreaterThan(0);
      expect(template.defaultMaterial.opacity).toBeLessThanOrEqual(1);
    }
  });
});

describe("getPartTemplate", () => {
  it("returns wall template with box geometry", () => {
    const template = getPartTemplate("wall");
    expect(template.type).toBe("wall");
    expect(template.name).toBe("Wall");
    expect(template.geometryType).toBe("box");
  });

  it("returns floor template with box geometry", () => {
    const template = getPartTemplate("floor");
    expect(template.type).toBe("floor");
    expect(template.geometryType).toBe("box");
  });

  it("returns column template with cylinder geometry", () => {
    const template = getPartTemplate("column");
    expect(template.type).toBe("column");
    expect(template.geometryType).toBe("cylinder");
  });

  it("returns beam template with box geometry", () => {
    const template = getPartTemplate("beam");
    expect(template.type).toBe("beam");
    expect(template.geometryType).toBe("box");
  });

  it("returns slab template with box geometry", () => {
    const template = getPartTemplate("slab");
    expect(template.type).toBe("slab");
    expect(template.geometryType).toBe("box");
  });

  it("returns stair template with box geometry", () => {
    const template = getPartTemplate("stair");
    expect(template.type).toBe("stair");
    expect(template.geometryType).toBe("box");
  });

  it("throws for invalid part type", () => {
    expect(() => getPartTemplate("invalid" as PartType)).toThrow(
      /Invalid part type "invalid"/,
    );
  });
});
