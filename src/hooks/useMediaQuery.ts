"use client";

import { useEffect, useState } from "react";

export default function useMediaQuery(mediaQueryString: string) {
  const [match, setMatch] = useState<boolean>(() => {
    const media = window.matchMedia(mediaQueryString);
    return media.matches;
  });

  useEffect(() => {
    const media = window.matchMedia(mediaQueryString);

    if (media.matches !== match) {
      setMatch(media.matches);
    }

    const listener = () => setMatch(media.matches);
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [match, mediaQueryString]);

  return match;
}
