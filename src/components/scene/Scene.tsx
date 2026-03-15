"use client";

import { Component, type ReactNode } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { Ground } from "./Ground";
import { AssemblyScene } from "./AssemblyScene";

class EnvironmentErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("Environment map failed to load:", error.message);
  }

  render() {
    if (this.state.hasError) return null;
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
      <AssemblyScene />
    </>
  );
}
