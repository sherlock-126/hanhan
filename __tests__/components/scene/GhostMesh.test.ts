import { describe, it, expect } from "vitest";
import { getGhostConfig, getGhostYPosition } from "@/components/scene/GhostMesh";
import { PART_TEMPLATES } from "@/lib/partTemplates";
import type { PartType } from "@/types/assembly";

const ALL_PART_TYPES: PartType[] = [
  "box",
  "wall",
  "floor",
  "column",
  "beam",
  "slab",
  "stair",
];

describe("getGhostConfig", () => {
  it.each(ALL_PART_TYPES)(
    "returns correct geometry type and scale for %s",
    (partType) => {
      const config = getGhostConfig(partType);
      const template = PART_TEMPLATES[partType];

      expect(config.geometryType).toBe(template.geometryType);
      expect(config.scale).toEqual([
        template.defaultScale.x,
        template.defaultScale.y,
        template.defaultScale.z,
      ]);
    },
  );

  it("returns box geometry for box type", () => {
    expect(getGhostConfig("box").geometryType).toBe("box");
  });

  it("returns box geometry for wall type", () => {
    expect(getGhostConfig("wall").geometryType).toBe("box");
  });

  it("returns cylinder geometry for column type", () => {
    expect(getGhostConfig("column").geometryType).toBe("cylinder");
  });

  it("returns correct scale for box (1x1x1)", () => {
    expect(getGhostConfig("box").scale).toEqual([1, 1, 1]);
  });

  it("returns correct scale for wall (4x3x0.2)", () => {
    expect(getGhostConfig("wall").scale).toEqual([4, 3, 0.2]);
  });

  it("returns correct scale for column (0.4x3x0.4)", () => {
    expect(getGhostConfig("column").scale).toEqual([0.4, 3, 0.4]);
  });

  it("all part types produce valid configs with positive scale", () => {
    for (const partType of ALL_PART_TYPES) {
      const config = getGhostConfig(partType);
      expect(["box", "cylinder"]).toContain(config.geometryType);
      expect(config.scale[0]).toBeGreaterThan(0);
      expect(config.scale[1]).toBeGreaterThan(0);
      expect(config.scale[2]).toBeGreaterThan(0);
    }
  });
});

describe("getGhostYPosition", () => {
  it.each(ALL_PART_TYPES)(
    "returns half the template height for %s",
    (partType) => {
      const template = PART_TEMPLATES[partType];
      const expected = template.defaultScale.y / 2;
      expect(getGhostYPosition(partType)).toBe(expected);
    },
  );

  it("returns 0.5 for box (height 1)", () => {
    expect(getGhostYPosition("box")).toBe(0.5);
  });

  it("returns 1.5 for wall (height 3)", () => {
    expect(getGhostYPosition("wall")).toBe(1.5);
  });

  it("returns 0.1 for floor (height 0.2)", () => {
    expect(getGhostYPosition("floor")).toBeCloseTo(0.1);
  });

  it("returns 1.5 for column (height 3)", () => {
    expect(getGhostYPosition("column")).toBe(1.5);
  });

  it("always returns a positive value", () => {
    for (const partType of ALL_PART_TYPES) {
      expect(getGhostYPosition(partType)).toBeGreaterThan(0);
    }
  });
});
