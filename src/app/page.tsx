"use client";

import dynamic from "next/dynamic";
import { ComponentPanel } from "@/components/ui/ComponentPanel";
import { Toolbar } from "@/components/ui/Toolbar";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

const Canvas3D = dynamic(() => import("@/components/scene/Canvas3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-gray-50">
      <p className="text-sm text-gray-500">Loading 3D scene...</p>
    </div>
  ),
});

export default function Home() {
  useKeyboardShortcuts();

  return (
    <main className="relative h-dvh w-full">
      <ComponentPanel />
      <div className="absolute top-4 left-60 z-10">
        <Toolbar />
      </div>
      <div className="absolute inset-0 left-56">
        <Canvas3D />
      </div>
    </main>
  );
}
