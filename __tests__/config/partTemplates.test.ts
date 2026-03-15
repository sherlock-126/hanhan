import { describe, it, expect } from "vitest";
import {
  PART_TEMPLATES,
  ALL_PART_TYPES,
  getPartTemplate,
} from "@/config/partTemplates";

describe("PART_TEMPLATES", () => {
  it("has all 6 part types defined", () => {
    const expectedTypes = ["podium", "pillar", "dougong", "roof", "wall", "gate"];
    for (const type of expectedTypes) {
      expect(PART_TEMPLATES[type as keyof typeof PART_TEMPLATES]).toBeDefined();
    }
  });

  it("each template has valid defaultScale (all > 0)", () => {
    for (const type of ALL_PART_TYPES) {
      const template = PART_TEMPLATES[type];
      expect(template.defaultScale.x).toBeGreaterThan(0);
      expect(template.defaultScale.y).toBeGreaterThan(0);
      expect(template.defaultScale.z).toBeGreaterThan(0);
    }
  });

  it("each template has valid material with color string", () => {
    for (const type of ALL_PART_TYPES) {
      const template = PART_TEMPLATES[type];
      expect(typeof template.material.color).toBe("string");
      expect(template.material.color.length).toBeGreaterThan(0);
    }
  });

  it("each template has at least one snap point", () => {
    for (const type of ALL_PART_TYPES) {
      const template = PART_TEMPLATES[type];
      expect(template.snapPoints.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("snap points have valid directions", () => {
    for (const type of ALL_PART_TYPES) {
      const template = PART_TEMPLATES[type];
      for (const sp of template.snapPoints) {
        expect(["up", "down"]).toContain(sp.direction);
      }
    }
  });

  it("explode orders follow expected hierarchy", () => {
    expect(PART_TEMPLATES.podium.explodeOrder).toBe(0);
    expect(PART_TEMPLATES.pillar.explodeOrder).toBe(1);
    expect(PART_TEMPLATES.wall.explodeOrder).toBe(1);
    expect(PART_TEMPLATES.gate.explodeOrder).toBe(1);
    expect(PART_TEMPLATES.dougong.explodeOrder).toBe(2);
    expect(PART_TEMPLATES.roof.explodeOrder).toBe(3);
  });

  it("getPartTemplate returns correct template for each type", () => {
    for (const type of ALL_PART_TYPES) {
      const template = getPartTemplate(type);
      expect(template.type).toBe(type);
    }
  });

  it("all templates have category imperial-city", () => {
    for (const type of ALL_PART_TYPES) {
      expect(PART_TEMPLATES[type].category).toBe("imperial-city");
    }
  });
});
