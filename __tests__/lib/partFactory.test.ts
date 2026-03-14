import { describe, it, expect } from "vitest";
import { createPartFromTemplate } from "@/lib/partFactory";
import { DEFAULT_PART_Y } from "@/lib/constants";
import type { PartType } from "@/types/assembly";

describe("createPartFromTemplate", () => {
  it("creates a wall part with correct defaults", () => {
    const part = createPartFromTemplate("wall");
    expect(part.type).toBe("wall");
    expect(part.name).toBe("Wall");
    expect(part.id).toBeTruthy();
    expect(part.position).toEqual({ x: 0, y: DEFAULT_PART_Y, z: 0 });
    expect(part.rotation).toEqual({ x: 0, y: 0, z: 0 });
    expect(part.meshUrl).toBeNull();
  });

  it("creates a column part with cylinder-appropriate defaults", () => {
    const part = createPartFromTemplate("column");
    expect(part.type).toBe("column");
    expect(part.name).toBe("Column");
    expect(part.scale).toEqual({ x: 0.4, y: 3, z: 0.4 });
  });

  it("uses provided position when given", () => {
    const position = { x: 5, y: 0.5, z: 3 };
    const part = createPartFromTemplate("wall", position);
    expect(part.position).toEqual(position);
  });

  it("produces different IDs on each call", () => {
    const part1 = createPartFromTemplate("wall");
    const part2 = createPartFromTemplate("wall");
    expect(part1.id).not.toBe(part2.id);
  });

  it("throws for invalid part type", () => {
    expect(() => createPartFromTemplate("invalid" as PartType)).toThrow(
      /Invalid part type/,
    );
  });

  it("has correct material from template defaults", () => {
    const part = createPartFromTemplate("wall");
    expect(part.material.color).toBe("#d4c4a8");
    expect(part.material.roughness).toBe(0.8);
    expect(part.material.metalness).toBe(0.1);
    expect(part.material.opacity).toBe(1);
  });

  it("has scale from template defaults", () => {
    const part = createPartFromTemplate("wall");
    expect(part.scale).toEqual({ x: 4, y: 3, z: 0.2 });
  });
});
