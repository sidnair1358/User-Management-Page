import { useState, useEffect } from "react";

export const useWindowResize = () => {
  const [chunkSize, setChunkSize] = useState(4);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const updateChunkSize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setChunkSize(isDesktop ? 8 : 4);
      setIsMobile(!isDesktop);
    };

    updateChunkSize();
    window.addEventListener("resize", updateChunkSize);

    return () => {
      window.removeEventListener("resize", updateChunkSize);
    };
  }, []);

  return { chunkSize, isMobile };
};
