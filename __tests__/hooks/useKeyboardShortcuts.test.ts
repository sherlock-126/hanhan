import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAssemblyStore } from "@/store/useAssemblyStore";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import type { AssemblyPart } from "@/types/assembly";

function createMockPart(id: string): AssemblyPart {
  return {
    id,
    name: `Part ${id}`,
    type: "podium",
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    meshUrl: null,
    material: { color: "#888", roughness: 0.5, metalness: 0, opacity: 1 },
  };
}

function pressKey(key: string, target?: EventTarget) {
  const event = new KeyboardEvent("keydown", { key, bubbles: true });
  if (target) {
    Object.defineProperty(event, "target", { value: target });
  }
  document.dispatchEvent(event);
}

describe("useKeyboardShortcuts", () => {
  let hookResult: ReturnType<typeof renderHook> | null = null;

  beforeEach(() => {
    useAssemblyStore.setState({
      parts: [],
      selectedPartId: null,
      activePartType: null,
      explodeMode: false,
    });
  });

  afterEach(() => {
    hookResult?.unmount();
    hookResult = null;
  });

  it("Delete key removes selected part", () => {
    const part1 = createMockPart("p1");
    const part2 = createMockPart("p2");
    useAssemblyStore.setState({
      parts: [part1, part2],
      selectedPartId: "p1",
    });

    hookResult = renderHook(() => useKeyboardShortcuts());
    pressKey("Delete");

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(1);
    expect(state.parts[0].id).toBe("p2");
    expect(state.selectedPartId).toBeNull();
  });

  it("Backspace key removes selected part", () => {
    const part = createMockPart("p1");
    useAssemblyStore.setState({
      parts: [part],
      selectedPartId: "p1",
    });

    hookResult = renderHook(() => useKeyboardShortcuts());
    pressKey("Backspace");

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(0);
    expect(state.selectedPartId).toBeNull();
  });

  it("Delete with no selection is no-op", () => {
    const part = createMockPart("p1");
    useAssemblyStore.setState({
      parts: [part],
      selectedPartId: null,
    });

    hookResult = renderHook(() => useKeyboardShortcuts());
    pressKey("Delete");

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(1);
  });

  it("Escape clears activePartType first", () => {
    useAssemblyStore.setState({
      activePartType: "podium",
      selectedPartId: null,
    });

    hookResult = renderHook(() => useKeyboardShortcuts());
    pressKey("Escape");

    const state = useAssemblyStore.getState();
    expect(state.activePartType).toBeNull();
  });

  it("Escape deselects part when no activePartType", () => {
    const part = createMockPart("p1");
    useAssemblyStore.setState({
      parts: [part],
      selectedPartId: "p1",
      activePartType: null,
    });

    hookResult = renderHook(() => useKeyboardShortcuts());
    pressKey("Escape");

    const state = useAssemblyStore.getState();
    expect(state.selectedPartId).toBeNull();
    expect(state.parts).toHaveLength(1);
  });

  it("Escape clears activePartType before selectedPartId", () => {
    const part = createMockPart("p1");
    useAssemblyStore.setState({
      parts: [part],
      selectedPartId: "p1",
      activePartType: "pillar",
    });

    hookResult = renderHook(() => useKeyboardShortcuts());
    pressKey("Escape");

    const state = useAssemblyStore.getState();
    // activePartType cleared first, selectedPartId also cleared by setActivePartType(null)
    expect(state.activePartType).toBeNull();
  });

  it("ignores keys when target is input element", () => {
    const part = createMockPart("p1");
    useAssemblyStore.setState({
      parts: [part],
      selectedPartId: "p1",
    });

    hookResult = renderHook(() => useKeyboardShortcuts());

    const input = document.createElement("input");
    pressKey("Delete", input);

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(1);
    expect(state.selectedPartId).toBe("p1");
  });

  it("ignores keys when target is textarea", () => {
    const part = createMockPart("p1");
    useAssemblyStore.setState({
      parts: [part],
      selectedPartId: "p1",
    });

    hookResult = renderHook(() => useKeyboardShortcuts());

    const textarea = document.createElement("textarea");
    pressKey("Delete", textarea);

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(1);
  });

  it("cleanup removes listener on unmount", () => {
    const part = createMockPart("p1");
    useAssemblyStore.setState({
      parts: [part],
      selectedPartId: "p1",
    });

    const { unmount } = renderHook(() => useKeyboardShortcuts());
    unmount();

    pressKey("Delete");

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(1);
    expect(state.selectedPartId).toBe("p1");
  });
});
