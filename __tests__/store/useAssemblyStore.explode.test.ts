import { describe, it, expect, beforeEach } from "vitest";
import { useAssemblyStore } from "@/store/useAssemblyStore";
import type { AssemblyPart } from "@/types/assembly";

function createTestPart(overrides: Partial<AssemblyPart> = {}): AssemblyPart {
  return {
    id: "part-1",
    name: "Test Part",
    type: "podium",
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    meshUrl: null,
    material: { color: "#ffffff", roughness: 0.5, metalness: 0.5, opacity: 1 },
    ...overrides,
  };
}

describe("useAssemblyStore - extended actions", () => {
  beforeEach(() => {
    useAssemblyStore.setState({
      parts: [],
      selectedPartId: null,
      activePartType: null,
      explodeMode: false,
    });
  });

  it("initial state: activePartType is null and explodeMode is false", () => {
    const state = useAssemblyStore.getState();
    expect(state.activePartType).toBeNull();
    expect(state.explodeMode).toBe(false);
  });

  it("setActivePartType: sets activePartType to a valid PartType", () => {
    useAssemblyStore.getState().setActivePartType("pillar");
    expect(useAssemblyStore.getState().activePartType).toBe("pillar");
  });

  it("setActivePartType: clears selectedPartId", () => {
    useAssemblyStore.setState({ selectedPartId: "some-id" });
    useAssemblyStore.getState().setActivePartType("roof");
    const state = useAssemblyStore.getState();
    expect(state.activePartType).toBe("roof");
    expect(state.selectedPartId).toBeNull();
  });

  it("setActivePartType(null): clears activePartType", () => {
    useAssemblyStore.getState().setActivePartType("wall");
    useAssemblyStore.getState().setActivePartType(null);
    expect(useAssemblyStore.getState().activePartType).toBeNull();
  });

  it("selectPart: clears activePartType when selecting a part", () => {
    useAssemblyStore.getState().setActivePartType("wall");
    useAssemblyStore.getState().selectPart("some-id");
    const state = useAssemblyStore.getState();
    expect(state.selectedPartId).toBe("some-id");
    expect(state.activePartType).toBeNull();
  });

  it("setExplodeMode(true): sets explodeMode to true", () => {
    useAssemblyStore.getState().setExplodeMode(true);
    expect(useAssemblyStore.getState().explodeMode).toBe(true);
  });

  it("setExplodeMode(false): sets explodeMode to false", () => {
    useAssemblyStore.getState().setExplodeMode(true);
    useAssemblyStore.getState().setExplodeMode(false);
    expect(useAssemblyStore.getState().explodeMode).toBe(false);
  });

  it("clearParts: removes all parts and resets selections", () => {
    const store = useAssemblyStore.getState();
    store.addPart(createTestPart({ id: "p1" }));
    store.addPart(createTestPart({ id: "p2" }));
    store.addPart(createTestPart({ id: "p3" }));
    store.selectPart("p1");
    store.setActivePartType("dougong");

    useAssemblyStore.getState().clearParts();

    const state = useAssemblyStore.getState();
    expect(state.parts).toEqual([]);
    expect(state.selectedPartId).toBeNull();
    expect(state.activePartType).toBeNull();
  });
});
