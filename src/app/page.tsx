"use client";

import dynamic from "next/dynamic";
import { Toolbar } from "@/components/ui/Toolbar";

const Canvas3D = dynamic(
  () => import("@/components/scene/Canvas3D").then((mod) => ({ default: mod.Canvas3D })),
  { ssr: false },
);

export default function Home() {
  return (
    <main className="relative h-dvh w-full">
      <Toolbar />
      <Canvas3D />
    </main>
  );
}
