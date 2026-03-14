import { describe, it, expect } from "vitest";
import { snapToGrid } from "@/lib/snapUtils";

describe("snapToGrid", () => {
  it("snaps to nearest grid unit with gridSize=1", () => {
    expect(snapToGrid({ x: 1.3, y: 2.7, z: 0.1 }, 1)).toEqual({
      x: 1,
      y: 3,
      z: 0,
    });
  });

  it("rounds 0.5 up", () => {
    expect(snapToGrid({ x: 0.5, y: 0.5, z: 0.5 }, 1)).toEqual({
      x: 1,
      y: 1,
      z: 1,
    });
  });

  it("handles negative coordinates", () => {
    const result = snapToGrid({ x: -1.3, y: -2.7, z: -0.1 }, 1);
    expect(result.x).toBe(-1);
    expect(result.y).toBe(-3);
    expect(Math.abs(result.z)).toBe(0);
  });

  it("snaps to 0.5 grid size", () => {
    expect(snapToGrid({ x: 2.3, y: 4.7, z: 1.1 }, 0.5)).toEqual({
      x: 2.5,
      y: 4.5,
      z: 1,
    });
  });

  it("returns position unchanged when gridSize is 0", () => {
    const position = { x: 1.3, y: 2.7, z: 0.1 };
    expect(snapToGrid(position, 0)).toEqual(position);
  });

  it("returns position unchanged when gridSize is negative", () => {
    const position = { x: 1.3, y: 2.7, z: 0.1 };
    expect(snapToGrid(position, -1)).toEqual(position);
  });
});
