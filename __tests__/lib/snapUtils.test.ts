import { describe, it, expect } from "vitest";
import { snapToGrid, findBestSnapPoint } from "@/lib/snapUtils";
import type { AssemblyPart } from "@/types/assembly";
import { PART_TEMPLATES } from "@/config/partTemplates";

function createPlacedPart(
  type: string,
  id: string,
  position: { x: number; y: number; z: number },
): AssemblyPart {
  const template = PART_TEMPLATES[type as keyof typeof PART_TEMPLATES];
  return {
    id,
    name: template.name,
    type,
    position,
    rotation: { x: 0, y: 0, z: 0 },
    scale: { ...template.defaultScale },
    meshUrl: null,
    material: { ...template.material },
  };
}

describe("snapToGrid", () => {
  it("snaps 0.7 to 0.5", () => {
    expect(snapToGrid(0.7)).toBeCloseTo(0.5);
  });

  it("snaps 1.3 to 1.5", () => {
    expect(snapToGrid(1.3)).toBeCloseTo(1.5);
  });

  it("snaps 0.0 to 0.0", () => {
    expect(snapToGrid(0.0)).toBeCloseTo(0.0);
  });

  it("snaps negative values: -0.7 to -0.5", () => {
    expect(snapToGrid(-0.7)).toBeCloseTo(-0.5);
  });

  it("snaps exact grid value to itself: 1.0 to 1.0", () => {
    expect(snapToGrid(1.0)).toBeCloseTo(1.0);
  });
});

describe("findBestSnapPoint", () => {
  it("pillar bottom snaps to podium top", () => {
    const podium = createPlacedPart("podium", "podium-1", {
      x: 0,
      y: 0.25,
      z: 0,
    });

    const result = findBestSnapPoint(
      "pillar",
      { x: 0.2, y: 1.5, z: 0.2 },
      [podium],
    );

    expect(result).not.toBeNull();
    expect(result!.snappedToPartId).toBe("podium-1");
    // Pillar center should be positioned so pillar-bottom aligns with podium-top
    // podium-top world = (0, 0.25 + 0.25, 0) = (0, 0.5, 0)
    // pillar-bottom offset = (0, -1.5, 0)
    // pillar position = (0, 0.5 - (-1.5), 0) = (0, 2.0, 0)
    expect(result!.position.x).toBeCloseTo(0);
    expect(result!.position.y).toBeCloseTo(2.0);
    expect(result!.position.z).toBeCloseTo(0);
  });

  it("dougong bottom snaps to pillar top", () => {
    const pillar = createPlacedPart("pillar", "pillar-1", {
      x: 0,
      y: 2.0,
      z: 0,
    });

    const result = findBestSnapPoint(
      "dougong",
      { x: 0.1, y: 3.5, z: 0.1 },
      [pillar],
    );

    expect(result).not.toBeNull();
    expect(result!.snappedToPartId).toBe("pillar-1");
    // pillar-top world = (0, 2.0 + 1.5, 0) = (0, 3.5, 0)
    // dougong-bottom offset = (0, -0.3, 0)
    // dougong position = (0, 3.5 - (-0.3), 0) = (0, 3.8, 0)
    expect(result!.position.y).toBeCloseTo(3.8);
  });

  it("returns null when no existing parts", () => {
    const result = findBestSnapPoint("pillar", { x: 0, y: 0, z: 0 }, []);
    expect(result).toBeNull();
  });

  it("returns null when existing part is too far away", () => {
    const podium = createPlacedPart("podium", "podium-1", {
      x: 100,
      y: 0.25,
      z: 100,
    });

    const result = findBestSnapPoint(
      "pillar",
      { x: 0, y: 1.5, z: 0 },
      [podium],
    );

    expect(result).toBeNull();
  });

  it("returns null for incompatible types (roof on podium)", () => {
    const podium = createPlacedPart("podium", "podium-1", {
      x: 0,
      y: 0.25,
      z: 0,
    });

    const result = findBestSnapPoint(
      "roof",
      { x: 0, y: 0.6, z: 0 },
      [podium],
    );

    // Podium's up snap only accepts pillar, wall, gate — not roof
    expect(result).toBeNull();
  });

  it("selects closest match when multiple candidates exist", () => {
    const podium1 = createPlacedPart("podium", "podium-1", {
      x: 0,
      y: 0.25,
      z: 0,
    });
    const podium2 = createPlacedPart("podium", "podium-2", {
      x: 1,
      y: 0.25,
      z: 0,
    });

    const result = findBestSnapPoint(
      "pillar",
      { x: 0.8, y: 1.5, z: 0 },
      [podium1, podium2],
    );

    expect(result).not.toBeNull();
    expect(result!.snappedToPartId).toBe("podium-2");
  });
});
