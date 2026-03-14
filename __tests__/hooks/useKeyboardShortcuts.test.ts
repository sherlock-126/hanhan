import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAssemblyStore } from "@/store/useAssemblyStore";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import type { AssemblyPart } from "@/types/assembly";

function createTestPart(overrides: Partial<AssemblyPart> = {}): AssemblyPart {
  return {
    id: "part-1",
    name: "Test Part",
    type: "wall",
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    meshUrl: null,
    material: { color: "#ffffff", roughness: 0.5, metalness: 0.5, opacity: 1 },
    ...overrides,
  };
}

function fireKey(key: string, target?: EventTarget) {
  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    cancelable: true,
  });
  if (target) {
    Object.defineProperty(event, "target", { value: target });
  }
  document.dispatchEvent(event);
}

describe("useKeyboardShortcuts", () => {
  beforeEach(() => {
    useAssemblyStore.setState({
      parts: [],
      selectedPartId: null,
      activePartType: null,
    });
  });

  it("Delete key removes selected part", () => {
    const part = createTestPart();
    const store = useAssemblyStore.getState();
    store.addPart(part);
    store.selectPart("part-1");

    const { unmount } = renderHook(() => useKeyboardShortcuts());
    fireKey("Delete");

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(0);
    expect(state.selectedPartId).toBeNull();
    unmount();
  });

  it("Backspace key removes selected part (macOS)", () => {
    const part = createTestPart();
    const store = useAssemblyStore.getState();
    store.addPart(part);
    store.selectPart("part-1");

    const { unmount } = renderHook(() => useKeyboardShortcuts());
    fireKey("Backspace");

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(0);
    expect(state.selectedPartId).toBeNull();
    unmount();
  });

  it("Delete key no-op when no part selected", () => {
    const part = createTestPart();
    useAssemblyStore.getState().addPart(part);

    const { unmount } = renderHook(() => useKeyboardShortcuts());
    fireKey("Delete");

    expect(useAssemblyStore.getState().parts).toHaveLength(1);
    unmount();
  });

  it("Escape key deselects active part type", () => {
    useAssemblyStore.getState().setActivePartType("wall");

    const { unmount } = renderHook(() => useKeyboardShortcuts());
    fireKey("Escape");

    expect(useAssemblyStore.getState().activePartType).toBeNull();
    unmount();
  });

  it("Escape key deselects selected part when no active tool", () => {
    const part = createTestPart();
    const store = useAssemblyStore.getState();
    store.addPart(part);
    store.selectPart("part-1");

    const { unmount } = renderHook(() => useKeyboardShortcuts());
    fireKey("Escape");

    expect(useAssemblyStore.getState().selectedPartId).toBeNull();
    unmount();
  });

  it("Escape key no-op when nothing active", () => {
    const { unmount } = renderHook(() => useKeyboardShortcuts());
    fireKey("Escape");

    const state = useAssemblyStore.getState();
    expect(state.selectedPartId).toBeNull();
    expect(state.activePartType).toBeNull();
    unmount();
  });

  it("Delete key ignored when target is input element", () => {
    const part = createTestPart();
    const store = useAssemblyStore.getState();
    store.addPart(part);
    store.selectPart("part-1");

    const input = document.createElement("input");
    const { unmount } = renderHook(() => useKeyboardShortcuts());
    fireKey("Delete", input);

    expect(useAssemblyStore.getState().parts).toHaveLength(1);
    expect(useAssemblyStore.getState().selectedPartId).toBe("part-1");
    unmount();
  });

  it("Escape key ignored when target is textarea element", () => {
    useAssemblyStore.getState().setActivePartType("wall");

    const textarea = document.createElement("textarea");
    const { unmount } = renderHook(() => useKeyboardShortcuts());
    fireKey("Escape", textarea);

    expect(useAssemblyStore.getState().activePartType).toBe("wall");
    unmount();
  });

  it("cleanup removes event listener on unmount", () => {
    const part = createTestPart();
    const store = useAssemblyStore.getState();
    store.addPart(part);
    store.selectPart("part-1");

    const { unmount } = renderHook(() => useKeyboardShortcuts());
    unmount();

    fireKey("Delete");

    expect(useAssemblyStore.getState().parts).toHaveLength(1);
    expect(useAssemblyStore.getState().selectedPartId).toBe("part-1");
  });
});
