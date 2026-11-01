import { Component, useEffect, useState } from "react";

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}

/**
 * Preserve the existing 3D scene on capable devices while avoiding a
 * page-level crash in browsers with unavailable or disabled WebGL.
 */
export default function WebGLGuard({ children, fallback = null }) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });

      setSupported(Boolean(context));
    } catch {
      setSupported(false);
    }
  }, []);

  if (!supported) return fallback;

  return (
    <CanvasErrorBoundary fallback={fallback}>
      {children}
    </CanvasErrorBoundary>
  );
}
