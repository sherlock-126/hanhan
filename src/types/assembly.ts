export interface Vector3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface EulerTuple {
  x: number;
  y: number;
  z: number;
}

export interface MaterialConfig {
  color: string;
  roughness: number;
  metalness: number;
  opacity: number;
}

export interface AssemblyPart {
  id: string;
  name: string;
  type: string;
  position: Vector3Tuple;
  rotation: EulerTuple;
  scale: Vector3Tuple;
  meshUrl: string | null;
  material: MaterialConfig;
}

export type ConnectionType = "snap" | "weld" | "hinge";

export interface AssemblyConnection {
  partAId: string;
  partBId: string;
  type: ConnectionType;
  anchorA: Vector3Tuple;
  anchorB: Vector3Tuple;
}

export interface AssemblyModelMetadata {
  createdAt: string;
  updatedAt: string;
  author: string;
}

export interface AssemblyModel {
  id: string;
  name: string;
  parts: AssemblyPart[];
  connections: AssemblyConnection[];
  metadata: AssemblyModelMetadata;
}
