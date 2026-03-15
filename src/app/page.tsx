"use client";

import dynamic from "next/dynamic";
import { Toolbar } from "@/components/ui/Toolbar";
import { ComponentPanel } from "@/components/ui/ComponentPanel";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

const Canvas3D = dynamic(() => import("@/components/scene/Canvas3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gray-100">
      <span className="text-sm text-gray-500">Loading 3D scene...</span>
    </div>
  ),
});

export default function Home() {
  useKeyboardShortcuts();

  return (
    <main className="relative h-dvh w-full">
      <Toolbar />
      <ComponentPanel />
      <Canvas3D />
    </main>
  );
}
