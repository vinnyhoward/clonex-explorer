import { useState, useEffect } from "react";

interface ViewportSize {
  width: number;
  height: number;
}

export const useViewportSize = (): ViewportSize => {
  const [size, setSize] = useState<ViewportSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", updateSize);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
