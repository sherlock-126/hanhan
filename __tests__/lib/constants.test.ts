import { describe, it, expect } from "vitest";
import {
  DEFAULT_CAMERA_POSITION,
  DEFAULT_CAMERA_FOV,
  DEFAULT_CAMERA_NEAR,
  DEFAULT_CAMERA_FAR,
  PHYSICS_CONFIG,
  MAX_PIXEL_RATIO,
  SHADOW_MAP_SIZE,
  SHADOW_CAMERA_BOUNDS,
  ORBIT_MIN_DISTANCE,
  ORBIT_MAX_DISTANCE,
  ORBIT_MAX_POLAR_ANGLE,
  ORBIT_DAMPING_FACTOR,
  SNAP_GRID_SIZE,
  DEFAULT_PART_Y,
} from "@/lib/constants";

describe("constants", () => {
  describe("camera", () => {
    it("has valid camera position array", () => {
      expect(DEFAULT_CAMERA_POSITION).toHaveLength(3);
      DEFAULT_CAMERA_POSITION.forEach((v) => expect(typeof v).toBe("number"));
    });

    it("has reasonable FOV", () => {
      expect(DEFAULT_CAMERA_FOV).toBeGreaterThan(10);
      expect(DEFAULT_CAMERA_FOV).toBeLessThan(120);
    });

    it("has valid near/far planes", () => {
      expect(DEFAULT_CAMERA_NEAR).toBeGreaterThan(0);
      expect(DEFAULT_CAMERA_FAR).toBeGreaterThan(DEFAULT_CAMERA_NEAR);
    });
  });

  describe("physics", () => {
    it("has gravity as [x, y, z] tuple", () => {
      expect(PHYSICS_CONFIG.gravity).toHaveLength(3);
      expect(PHYSICS_CONFIG.gravity[1]).toBeLessThan(0); // gravity pulls down
    });

    it("has time step configuration", () => {
      expect(PHYSICS_CONFIG.timeStep).toBe("vary");
    });
  });

  describe("renderer", () => {
    it("max pixel ratio is at least 1", () => {
      expect(MAX_PIXEL_RATIO).toBeGreaterThanOrEqual(1);
    });
  });

  describe("shadows", () => {
    it("shadow map size is power of 2", () => {
      expect(Math.log2(SHADOW_MAP_SIZE) % 1).toBe(0);
    });

    it("shadow camera bounds are positive", () => {
      expect(SHADOW_CAMERA_BOUNDS).toBeGreaterThan(0);
    });
  });

  describe("orbit controls", () => {
    it("min distance is less than max distance", () => {
      expect(ORBIT_MIN_DISTANCE).toBeLessThan(ORBIT_MAX_DISTANCE);
    });

    it("max polar angle prevents going below ground", () => {
      expect(ORBIT_MAX_POLAR_ANGLE).toBeLessThan(Math.PI / 2);
      expect(ORBIT_MAX_POLAR_ANGLE).toBeGreaterThan(0);
    });

    it("damping factor is between 0 and 1", () => {
      expect(ORBIT_DAMPING_FACTOR).toBeGreaterThan(0);
      expect(ORBIT_DAMPING_FACTOR).toBeLessThan(1);
    });
  });

  describe("parts", () => {
    it("snap grid size is positive", () => {
      expect(SNAP_GRID_SIZE).toBeGreaterThan(0);
    });

    it("default part Y is positive", () => {
      expect(DEFAULT_PART_Y).toBeGreaterThan(0);
    });
  });
});
