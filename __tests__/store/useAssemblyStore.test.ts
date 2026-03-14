import { describe, it, expect, beforeEach } from "vitest";
import { useAssemblyStore } from "@/store/useAssemblyStore";
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

describe("useAssemblyStore", () => {
  beforeEach(() => {
    useAssemblyStore.setState({ parts: [], selectedPartId: null });
  });

  it("has correct initial state", () => {
    const state = useAssemblyStore.getState();
    expect(state.parts).toEqual([]);
    expect(state.selectedPartId).toBeNull();
  });

  it("addPart: adds a part to empty store", () => {
    const part = createTestPart();
    useAssemblyStore.getState().addPart(part);

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(1);
    expect(state.parts[0]).toEqual(part);
  });

  it("addPart: adds multiple parts", () => {
    const part1 = createTestPart({ id: "part-1" });
    const part2 = createTestPart({ id: "part-2" });
    const part3 = createTestPart({ id: "part-3" });

    const store = useAssemblyStore.getState();
    store.addPart(part1);
    store.addPart(part2);
    store.addPart(part3);

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(3);
    expect(state.parts.map((p) => p.id)).toEqual(["part-1", "part-2", "part-3"]);
  });

  it("removePart: removes existing part", () => {
    const part1 = createTestPart({ id: "part-1" });
    const part2 = createTestPart({ id: "part-2" });

    const store = useAssemblyStore.getState();
    store.addPart(part1);
    store.addPart(part2);
    store.removePart("part-1");

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(1);
    expect(state.parts[0].id).toBe("part-2");
  });

  it("removePart: no-op for nonexistent ID", () => {
    const part = createTestPart();
    useAssemblyStore.getState().addPart(part);
    useAssemblyStore.getState().removePart("nonexistent");

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(1);
  });

  it("removePart: clears selection if removed part was selected", () => {
    const part = createTestPart({ id: "part-1" });
    const store = useAssemblyStore.getState();
    store.addPart(part);
    store.selectPart("part-1");
    store.removePart("part-1");

    expect(useAssemblyStore.getState().selectedPartId).toBeNull();
  });

  it("selectPart: selects a part by ID", () => {
    useAssemblyStore.getState().selectPart("part-1");
    expect(useAssemblyStore.getState().selectedPartId).toBe("part-1");
  });

  it("selectPart: deselects with null", () => {
    useAssemblyStore.getState().selectPart("part-1");
    useAssemblyStore.getState().selectPart(null);
    expect(useAssemblyStore.getState().selectedPartId).toBeNull();
  });

  it("updatePartTransform: updates position only", () => {
    const part = createTestPart({ id: "part-1" });
    const store = useAssemblyStore.getState();
    store.addPart(part);
    store.updatePartTransform("part-1", { position: { x: 5, y: 10, z: 15 } });

    const updated = useAssemblyStore.getState().parts[0];
    expect(updated.position).toEqual({ x: 5, y: 10, z: 15 });
    expect(updated.rotation).toEqual({ x: 0, y: 0, z: 0 });
    expect(updated.scale).toEqual({ x: 1, y: 1, z: 1 });
  });

  it("updatePartTransform: no-op for nonexistent part", () => {
    const part = createTestPart({ id: "part-1" });
    useAssemblyStore.getState().addPart(part);
    useAssemblyStore.getState().updatePartTransform("nonexistent", {
      position: { x: 99, y: 99, z: 99 },
    });

    const state = useAssemblyStore.getState();
    expect(state.parts[0].position).toEqual({ x: 0, y: 0, z: 0 });
  });

  it("updatePartTransform: partial update preserves other transforms", () => {
    const part = createTestPart({
      id: "part-1",
      position: { x: 1, y: 2, z: 3 },
      rotation: { x: 0.5, y: 1.0, z: 1.5 },
      scale: { x: 2, y: 2, z: 2 },
    });
    useAssemblyStore.getState().addPart(part);
    useAssemblyStore.getState().updatePartTransform("part-1", {
      rotation: { x: 0, y: 0, z: 0 },
    });

    const updated = useAssemblyStore.getState().parts[0];
    expect(updated.position).toEqual({ x: 1, y: 2, z: 3 });
    expect(updated.rotation).toEqual({ x: 0, y: 0, z: 0 });
    expect(updated.scale).toEqual({ x: 2, y: 2, z: 2 });
  });

  it("duplicatePart: duplicates existing part with new ID", () => {
    const part = createTestPart({ id: "part-1", name: "Wall A" });
    const store = useAssemblyStore.getState();
    store.addPart(part);
    store.duplicatePart("part-1");

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(2);
    expect(state.parts[1].id).not.toBe("part-1");
    expect(state.parts[1].name).toBe("Wall A (copy)");
    expect(state.parts[1].type).toBe(part.type);
    expect(state.parts[1].position).toEqual(part.position);
    expect(state.parts[1].material).toEqual(part.material);
  });

  it("duplicatePart: no-op for nonexistent ID", () => {
    const part = createTestPart({ id: "part-1" });
    useAssemblyStore.getState().addPart(part);
    useAssemblyStore.getState().duplicatePart("nonexistent");

    expect(useAssemblyStore.getState().parts).toHaveLength(1);
  });

  it("clearParts: removes all parts and clears selection", () => {
    const part1 = createTestPart({ id: "part-1" });
    const part2 = createTestPart({ id: "part-2" });
    const store = useAssemblyStore.getState();
    store.addPart(part1);
    store.addPart(part2);
    store.selectPart("part-1");
    store.clearParts();

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(0);
    expect(state.selectedPartId).toBeNull();
  });

  it("clearParts: no-op on empty store", () => {
    useAssemblyStore.getState().clearParts();

    const state = useAssemblyStore.getState();
    expect(state.parts).toHaveLength(0);
    expect(state.selectedPartId).toBeNull();
  });
});
