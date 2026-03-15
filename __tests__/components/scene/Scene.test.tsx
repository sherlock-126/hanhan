import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Component, type ReactNode } from "react";

// We cannot render the full Scene (requires R3F Canvas + WebGL), so we
// test the EnvironmentErrorBoundary logic in isolation by re-creating
// the same error boundary pattern used in Scene.tsx.

class EnvironmentErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    console.warn(
      "Failed to load environment map, falling back to default lighting:",
      error
    );
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function ThrowingChild(): ReactNode {
  throw new Error("Failed to fetch potsdamer_platz_1k.hdr");
}

function GoodChild() {
  return <div data-testid="good-child">Hello</div>;
}

describe("EnvironmentErrorBoundary", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children when no error occurs", () => {
    const { getByTestId } = render(
      <EnvironmentErrorBoundary>
        <GoodChild />
      </EnvironmentErrorBoundary>
    );

    expect(getByTestId("good-child")).toBeInTheDocument();
    expect(getByTestId("good-child").textContent).toBe("Hello");
  });

  it("catches child errors and renders null", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    // Suppress React's error boundary console.error noise
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { container } = render(
      <EnvironmentErrorBoundary>
        <ThrowingChild />
      </EnvironmentErrorBoundary>
    );

    // Error boundary renders null — container should be empty
    expect(container.innerHTML).toBe("");

    // console.warn was called with the error
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      "Failed to load environment map, falling back to default lighting:",
      expect.any(Error)
    );
  });

  it("handles non-Error thrown values", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});

    function ThrowsString(): ReactNode {
      throw "string error";
    }

    const { container } = render(
      <EnvironmentErrorBoundary>
        <ThrowsString />
      </EnvironmentErrorBoundary>
    );

    expect(container.innerHTML).toBe("");
  });

  it("stays in error state on re-render after catching an error", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { container, rerender } = render(
      <EnvironmentErrorBoundary>
        <ThrowingChild />
      </EnvironmentErrorBoundary>
    );

    expect(container.innerHTML).toBe("");

    // Re-render the same boundary — it should stay in error state
    rerender(
      <EnvironmentErrorBoundary>
        <GoodChild />
      </EnvironmentErrorBoundary>
    );

    // Still renders null because the error state persists
    expect(container.innerHTML).toBe("");
  });
});
