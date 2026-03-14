"use client";

import dynamic from "next/dynamic";
import { ComponentPanel } from "@/components/ui/ComponentPanel";
import { Toolbar } from "@/components/ui/Toolbar";

const Canvas3D = dynamic(
  () => import("@/components/scene/Canvas3D").then((mod) => ({ default: mod.Canvas3D })),
  { ssr: false },
);

export default function Home() {
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
