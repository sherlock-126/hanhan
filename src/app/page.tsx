"use client";

import dynamic from "next/dynamic";
import { Toolbar } from "@/components/ui/Toolbar";
import { ComponentPanel } from "@/components/ui/ComponentPanel";

const Canvas3D = dynamic(
  () => import("@/components/scene/Canvas3D").then((mod) => ({ default: mod.Canvas3D })),
  { ssr: false },
);

export default function Home() {
  return (
    <main className="relative h-dvh w-full">
      <Toolbar />
      <ComponentPanel />
      <Canvas3D />
    </main>
  );
}
