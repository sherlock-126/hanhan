import { ACESFilmicToneMapping, SRGBColorSpace, PCFSoftShadowMap } from "three";

// Camera
export const DEFAULT_CAMERA_POSITION: [number, number, number] = [10, 10, 10];
export const DEFAULT_CAMERA_FOV = 50;
export const DEFAULT_CAMERA_NEAR = 0.1;
export const DEFAULT_CAMERA_FAR = 200;

// Grid & Ground
export const GRID_SIZE = 20;
export const GRID_DIVISIONS = 20;
export const GROUND_SIZE = 50;
export const GROUND_COLOR = "#e0e0e0";

// Physics
export const PHYSICS_CONFIG = {
  gravity: [0, -9.81, 0] as [number, number, number],
  timeStep: "vary" as const,
};

// Renderer
export const MAX_PIXEL_RATIO = 2;
export const TONE_MAPPING = ACESFilmicToneMapping;
export const OUTPUT_COLOR_SPACE = SRGBColorSpace;
export const SHADOW_MAP_TYPE = PCFSoftShadowMap;

// Shadows
export const SHADOW_MAP_SIZE = 2048;
export const SHADOW_CAMERA_BOUNDS = 20;
export const SHADOW_CAMERA_NEAR = 0.5;
export const SHADOW_CAMERA_FAR = 50;
export const SHADOW_BIAS = -0.0001;

// OrbitControls
export const ORBIT_MIN_DISTANCE = 2;
export const ORBIT_MAX_DISTANCE = 80;
export const ORBIT_MAX_POLAR_ANGLE = Math.PI / 2 - 0.05; // Prevent going below ground
export const ORBIT_ENABLE_DAMPING = true;
export const ORBIT_DAMPING_FACTOR = 0.05;

// Parts
export const SNAP_GRID_SIZE = 0.5;
export const DEFAULT_PART_Y = 0.5;
