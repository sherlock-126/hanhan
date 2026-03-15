"use client";

import { useEffect } from "react";
import { useAssemblyStore } from "@/store/useAssemblyStore";

function isEditableTarget(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  if (target instanceof HTMLInputElement) return true;
  if (target instanceof HTMLTextAreaElement) return true;
  if (target.isContentEditable) return true;
  return false;
}

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      const { key } = event;

      if (key === "Delete" || key === "Backspace") {
        const { selectedPartId, removePart } = useAssemblyStore.getState();
        if (selectedPartId) {
          removePart(selectedPartId);
        }
        return;
      }

      if (key === "Escape") {
        const { activePartType, setActivePartType, selectedPartId, selectPart } =
          useAssemblyStore.getState();
        if (activePartType) {
          setActivePartType(null);
        } else if (selectedPartId) {
          selectPart(null);
        }
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
}
