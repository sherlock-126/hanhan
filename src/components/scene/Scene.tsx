"use client";

import { Component, type ReactNode } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { Ground } from "./Ground";

class EnvironmentErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    console.warn("Failed to load environment map, falling back to default lighting:", error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <EnvironmentErrorBoundary>
        <Environment preset="city" />
      </EnvironmentErrorBoundary>
      <OrbitControls makeDefault />
      <Ground />
    </>
  );
}
