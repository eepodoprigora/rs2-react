import { useState } from "react";

import { useWindowEvent } from "./useWindowEvent";

export function useWindowScroll() {
  const [scroll, setScroll] = useState({
    x: window.scrollX,
    y: window.scrollY,
  });

  const handleScroll = () => {
    setScroll({
      x: window.scrollX,
      y: window.scrollY,
    });
  };

  const scrollTo = ({ x = 0, y = 0 }) => {
    window.scrollTo(x, y);
  };

  useWindowEvent("scroll", handleScroll);
  return [scroll, scrollTo];
}
