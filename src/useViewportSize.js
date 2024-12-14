import { useState } from "react";

import { useWindowEvent } from "./useWindowEvent";

export function useViewportSize(initialUrl) {
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setViewportSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useWindowEvent("resize", handleResize);
  return viewportSize;
}
