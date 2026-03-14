import { create } from "zustand";
import type { AssemblyPart, Vector3Tuple, EulerTuple } from "@/types/assembly";

interface TransformUpdate {
  position?: Vector3Tuple;
  rotation?: EulerTuple;
  scale?: Vector3Tuple;
}

interface AssemblyState {
  parts: AssemblyPart[];
  selectedPartId: string | null;
  addPart: (part: AssemblyPart) => void;
  removePart: (id: string) => void;
  selectPart: (id: string | null) => void;
  updatePartTransform: (id: string, transform: TransformUpdate) => void;
}

export const useAssemblyStore = create<AssemblyState>((set) => ({
  parts: [],
  selectedPartId: null,

  addPart: (part) =>
    set((state) => ({
      parts: [...state.parts, part],
    })),

  removePart: (id) =>
    set((state) => ({
      parts: state.parts.filter((p) => p.id !== id),
      selectedPartId: state.selectedPartId === id ? null : state.selectedPartId,
    })),

  selectPart: (id) =>
    set(() => ({
      selectedPartId: id,
    })),

  updatePartTransform: (id, transform) =>
    set((state) => ({
      parts: state.parts.map((p) =>
        p.id === id
          ? {
              ...p,
              ...(transform.position !== undefined && { position: transform.position }),
              ...(transform.rotation !== undefined && { rotation: transform.rotation }),
              ...(transform.scale !== undefined && { scale: transform.scale }),
            }
          : p,
      ),
    })),
}));
