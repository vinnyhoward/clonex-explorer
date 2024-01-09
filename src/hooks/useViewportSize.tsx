import { useState, useEffect } from "react";

interface ViewportSize {
  width: number | undefined;
  height: number | undefined;
}

export const useViewportSize = (): ViewportSize => {
  // Initialize with undefined or null values
  const [size, setSize] = useState<ViewportSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};